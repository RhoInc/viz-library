const captureWebsite = require("capture-website");
const fs = require("fs");
const options = {
  width: 1920,
  height: 1080,
  overwrite: true,
  type: "jpeg",
  quality: 0.1,
  delay: 3
};

const overwrite = process.argv[2] == "-o";
console.log("Overwriting?" + overwrite);

async function makeExampleList() {
  const examples = await require("../data/examples.json")
    .filter(repo => repo.examples && repo.examples.length) // keep only those repos with one or more examples
    .map(repo => {
      return repo.examples.map((example, i) => {
        return {
          url: example.example_url,
          filename: `${repo.name}-${i}`
        };
      }); // return's each example's URL and screenshot filename
    }) // returns each repo's example list
    .reduce((acc, val) => acc.concat(val), []) // flattens repo array to one item per example
    .filter(function(example) {
      //overwrite exsiting screenshots if -o flag is set
      var path = `./img/${example.filename}.png`;
      if (fs.existsSync(path)) {
        return overwrite ? true : false;
      } else {
        return true;
      }
    });
  return examples;
}

async function takeScreenshots() {
  const examples = await makeExampleList();

  for (const example of examples) {
    const filename = `./img/${example.filename}.${options.type.replace(
      "peg",
      "pg"
    )}`;
    await captureWebsite.file(example.url, filename, options); // gotta await each call to captureWebsite.file(); Promise.all() throws some weird Node process errors
    console.log(`Captured ${filename}!`);
  }
}

takeScreenshots();
