import makeControl from "./exampleList/makeControl.js";
import makeList from "./exampleList/makeList.js";

export default function buildExampleList(location, data) {
  var page = {};

  //prep data
  page.location = location;
  page.repo_data = data;
  var all_examples = d3.merge(data.map(m => m.examples));
  page.org_data = [
    {
      name: "Rho Inc",
      description: "Interactive graphics from Rho",
      html_url: "https://www.github.com/rhoinc",
      examples: all_examples
    }
  ];

  //initialize page
  makeControl.call(page);
  makeList.call(page, "orgs");
}
