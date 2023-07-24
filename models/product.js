const fs = require("fs");
const path = require("path");

const pathBuild = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (callBackFN) => {
  fs.readFile(pathBuild, (err, fileContent) => {
    if (err) {
      return callBackFN([]);
    }
    callBackFN(JSON.parse(fileContent));
  });
};
module.exports = class Product {
  constructor(incomingTitle) {
    this.title = incomingTitle;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);

      fs.writeFile(pathBuild, JSON.stringify(products), (err) => {
        console.log("err", err);
      });
    });
  }

  static fetchAll(callBackFN) {
    getProductsFromFile(callBackFN);
  }
};
