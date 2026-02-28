const fs = require("fs");
const path = require("path");

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(
  "c:/Users/gs766/Desktop/Gabhru_in_uk/website/components",
).concat(walk("c:/Users/gs766/Desktop/Gabhru_in_uk/website/app"));
let count = 0;
files.forEach((f) => {
  let content = fs.readFileSync(f, "utf8");
  let newContent = content
    .replace(/-sand/g, "-black")
    .replace(/-forest/g, "-black");
  if (content !== newContent) {
    fs.writeFileSync(f, newContent);
    count++;
  }
});

console.log(`Successfully updated ${count} files.`);
