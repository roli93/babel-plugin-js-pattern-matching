module.exports = function({ types: t }) {
  return {
    visitor: {
      ArrowFunctionExpression(path) {
        new ArrowFunctionVisitor(t).visit(path)
      }
    }
  };
};

class ArrowFunctionVisitor{
  constructor(t){
    this.t = t
  }

  visit(path){
    if(this.isTransformed(path)) return; //To avoid recursive trasnformation

    let object = this.t.objectExpression([
      this.t.objectProperty(this.t.identifier("function"), this.getFunction(path)),
      this.t.objectProperty(this.t.identifier("pattern"), this.getPattern(path))
    ])

    path.replaceWith(object);
  }

  isTransformed(path){
    return this.t.isObjectProperty(path.parent)
  }

  getFunction({ node }){
    return this.t.arrowFunctionExpression([this.t.identifier("value")], node.body)
  }

  getPattern({ node }){
    let pattern = node.params[0].right.value.toString()
    return this.t.stringLiteral(pattern)
  }

}
