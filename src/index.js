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

  getFunction(path){
    return this.t.arrowFunctionExpression(
      [this.t.identifier(this.getParameterNode(path).name)],
      path.node.body
    )
  }

  getWithoutAssignement({ node }, side){
    let firstParamNode = node.params[0];
    return firstParamNode.type === 'AssignmentPattern'? firstParamNode[side]: firstParamNode;
  }

  getParameterNode(path){
    return this.getWithoutAssignement(path, 'left')
  }

  getPatternNode(path){
    return this.getWithoutAssignement(path, 'right')
  }

  getPattern(path){
    let pattern;
    let patternNode = this.getPatternNode(path)

    switch(patternNode.type){
      case 'NumericLiteral': case 'StringLiteral': case 'BooleanLiteral':
        pattern = patternNode.value; break;
      case 'Identifier':
        pattern = patternNode.name; break;
      case 'NullLiteral':
        pattern = null; break;
      default: break;
    }
    return this.t.stringLiteral(String(pattern))
  }

}
