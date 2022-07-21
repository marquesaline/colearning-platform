const fs = require("fs");
const path = require("path");


//helper
const helper = {};

helper.read = (filename) =>
  fs.readFileSync(path.join(__dirname, `../data/${filename}`), "utf-8");

helper.write = (filename, data) =>
  fs.writeFileSync(
    path.join(__dirname, `../data/${filename}`),
    JSON.stringify(data, null, 2),
    "utf-8"
  );

module.exports = helper