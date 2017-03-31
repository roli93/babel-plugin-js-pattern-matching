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
    if(this.isTransformed(path) || !this.isAMatchCase(path.parent)) return;

    let object = this.t.objectExpression([
      this.t.objectProperty(this.t.identifier("function"), this.getFunction(path)),
      this.t.objectProperty(this.t.identifier("pattern"), this.getPattern(path))
    ])

    path.replaceWith(object);
  }

  isTransformed(path){
    return this.t.isObjectProperty(path.parent)
  }

  isAMatchCase(node){
    return node.type === 'CallExpression' &&
    (
      this.isMatch(node.callee) ||
      this.isAMatchCase(node.callee)
    );
  }

  isMatch(node){
    return node.type === 'Identifier' && node.name === 'match'
  }

  getFunction(path){
    return this.t.arrowFunctionExpression(
      path.node.params,
      path.node.body
    )
  }

  getPatternNode({ node }){
    let firstParamNode = node.params[0];
    return firstParamNode.type === 'AssignmentPattern'? firstParamNode.right: firstParamNode;
  }

  getArrayPattern(arrayPatternNode){
    return `[${arrayPatternNode.elements.map( element => this.getPatternFor(element) )}]`
  }

  getPatternFor(arrayElementNode){
    let arrayElementPattern
    switch(arrayElementNode.type){
      case 'Identifier':
        arrayElementPattern = arrayElementNode.name; break;
      case 'RestElement':
        arrayElementPattern = `...${arrayElementNode.argument.name}`; break;
      default: break;
    }
    return arrayElementPattern;
  }

  getPattern(path){
    let pattern;
    let patternNode = this.getPatternNode(path)

    switch(patternNode.type){
      case 'NumericLiteral': case 'BooleanLiteral':
        pattern = patternNode.value; break;
      case 'StringLiteral':
        pattern = `"${patternNode.value}"`; break;
      case 'Identifier':
        pattern = patternNode.name; break;
      case 'NullLiteral':
        pattern = null; break;
      case 'ArrayPattern':
        pattern = this.getArrayPattern(patternNode); break;
      default: break;
    }
    return this.t.stringLiteral(String(pattern))
  }

}
