module.exports = function({ types: t }) {
  return {
    visitor: {
      BinaryExpression(path) {
        console.log("PLUGIN!!!!!!!!!!!!");
        if (path.node.operator !== "===") {
           return;
        }
        path.node.left = t.identifier("roli");
      }
    }
  };
};
