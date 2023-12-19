let fs = require("fs");
const input = fs.readFileSync("day19.txt", { encoding: "utf8" });
const [workflowStrs, ratingsStrs] = input.split("\n\n");
const workflowStr = workflowStrs.split("\n");
const ratingsStr = ratingsStrs.split("\n");

let ratingsRegex = /\{x=(?<x>\d+),m=(?<m>\d+),a=(?<a>\d+),s=(?<s>\d+)\}/;
let workflowRegex = /(?<name>\w+)\{(?<workflow>.*)\}/;

let workflows = new Map();
workflowStr.forEach((line) => {
  let match = line.match(workflowRegex);
  let workflow = match.groups.workflow.split(",").map((step) => {
    if (step.includes(":")) {
      let [a, goto] = step.split(":");
      if (a.includes(">")) {
        let [valueId, value] = a.split(">");
        return { valueId, condition: ">", value: parseInt(value), goto };
      } else if (a.includes("<")) {
        let [valueId, value] = a.split("<");
        return { valueId, condition: "<", value: parseInt(value), goto };
      }
    } else return { goto: step };
  });
  workflows.set(match.groups.name, workflow);
});

let ratings = ratingsStr.map((line) => {
  let match = line.match(ratingsRegex);
  return {
    x: parseInt(match.groups.x),
    m: parseInt(match.groups.m),
    a: parseInt(match.groups.a),
    s: parseInt(match.groups.s),
  };
});

console.log(workflows, ratings);

const getStepResult = (step, rating) => {
  if (step.condition == null) return step.goto;
  if (step.condition == ">") {
    if (rating[step.valueId] > step.value) return step.goto;
  } else if (step.condition == "<") {
    if (rating[step.valueId] < step.value) return step.goto;
  }
  return null;
};

const putRatingsThroughWorkflow = (rating) => {
  let workflowId = "in";
  while (workflowId != "R" && workflowId != "A") {
    let stepId = 0;
    let result = null;
    while (result == null) {
      let step = workflows.get(workflowId)[stepId];
      result = getStepResult(step, rating);
      workflowId = result != null ? result : workflowId;
      stepId++;
    }
  }
  return workflowId;
};

let silver = 0;
for (let rating of ratings) {
  if (putRatingsThroughWorkflow(rating) == "A") {
    silver += rating.x + rating.m + rating.a + rating.s;
  }
}
console.log(silver);
