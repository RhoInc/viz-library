var fs = require("fs");
var fetch = require("node-fetch");
var ping = require("ping");
var urlExists = require("url-exists");
let base64 = require("base-64");
var read = require("read");
global.Headers = fetch.Headers;

read({ prompt: "Username: " }, function(er, username) {
  read({ prompt: "Password: ", silent: true }, function(er, password) {
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
              repo.examples = example_paths[i].map(
                m => "https://rhoinc.github.io/" + repo.name + "/test-page" + m
              );
              console.log(
                "Found " + repo.examples.length + " examples for " + repo.name
              );
            });

            return repos;
          });

        return repos_examples;
      })
      .then(function(repo_examples) {
        fs.writeFile(
          "../data/examples.json",
          JSON.stringify(repo_examples, null, 4),
          error => {
            if (error) console.log(error);
            console.log("All repos successfully saved to .data/examples.json!");
          }
        );
      });
  });
});
