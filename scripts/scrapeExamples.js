var fs = require("fs");
var fetch = require("node-fetch");
var ping = require("ping");
var urlExists = require("url-exists");
let base64 = require("base-64");
var read = require("read");
global.Headers = fetch.Headers;

read({ prompt: "Username: " }, function(error, username) {
  if (error) {
    console.log("Error: " + error);
    return;
  }

  read({ prompt: "Password: ", silent: true }, function(error, password) {
    if (error) {
      console.log("Error: " + error);
      return;
    }

    var url = "https://api.github.com/users/RhoInc/repos?per_page=1000";
    let headers = new Headers();
    headers.append(
      "Authorization",
      "Basic " + base64.encode(username + ":" + password)
    );

    //get list of repos
    var repos = fetch(url, { headers: headers })
      .then(response => response.json())
      .then(function(repos) {
        console.log("Found " + repos.length + " repos.");
        var ex_urls = repos.map(m => m.url + "/contents/test-page");
        var repos_examples = Promise.all(
          ex_urls.map(u => fetch(u, { headers: headers }))
        )
          .then(responses => Promise.all(responses.map(res => res.json())))
          .then(examples => {
            var example_paths = examples.map(function(ex) {
              return ex.length == undefined
                ? []
                : ex
                    .filter(f => (f.name == "index.html") | (f.type == "dir"))
                    .map(f => (f.type == "dir" ? "/" + f.name : "/"));
            });

            repos.forEach(function(repo, i) {
              repo.examples = example_paths[i].map(function(m, i) {
                const example_url =
                  "https://rhoinc.github.io/" + repo.name + "/test-page" + m;
                const folders = example_url.split("/");
                const folder =
                  m !== "/"
                    ? folders[folders.length - 1]
                    : folders[folders.length - 2];
                console.log(repo.name + ": " + folder);
                const src_url =
                  "https://www.github.com/rhoinc/" +
                  repo.name +
                  "/tree/master/test-page" +
                  m;
                const img_url = "./img/" + repo.name + "-" + i + ".jpg";
                return {
                  repo: repo.name,
                  folder,
                  example_url,
                  src_url,
                  img_url
                };
              });
              console.log(
                "Found " + repo.examples.length + " examples for " + repo.name
              );
            });

            return repos;
          })
          .catch(err => console.log(err));

        return repos_examples;
      })
      .then(function(repo_examples) {
        fs.writeFile(
          "./data/examples.json",
          JSON.stringify(repo_examples, null, 4),
          error => {
            if (error) {
              console.log(error);
            } else {
              console.log(
                "All repos successfully saved to ./data/examples.json!"
              );
            }
          }
        );
      })
      .catch(err => console.log(err));
  });
});
