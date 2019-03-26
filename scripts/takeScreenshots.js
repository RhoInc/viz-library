const captureWebsite = require("capture-website");
const options = {
  width: 1920,
  height: 1080,
  overwrite: true,
  delay: 3
};

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
    .reduce((acc, val) => acc.concat(val), []); // flattens repo array to one item per example

  return examples;
}

async function takeScreenshots() {
  const examples = await makeExampleList();

  for (const example of examples) {
    await captureWebsite.file(
      example.url,
      `./img/${example.filename}.png`,
      options
    ); // gotta await each call to captureWebsite.file(); Promise.all() throws some weird Node process errors
    console.log(`Captured ${example.filename}.png in ./img!`);
  }
}

takeScreenshots();
