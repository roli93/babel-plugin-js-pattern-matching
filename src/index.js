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
    if(this.isTransformed(path) || !this.isAMatchCase(path)) return;

    let object = this.t.objectExpression([
      this.t.objectProperty(this.t.identifier("function"), this.getFunction(path)),
      this.t.objectProperty(this.t.identifier("pattern"), this.getPattern(path))
    ])

    path.replaceWith(object);
  }

  isTransformed(path){
    return this.t.isObjectProperty(path.parent)
  }

  isAMatchCase({ parent }){
    return parent.type === 'CallExpression' && this.isCallingMatch(parent.callee);
  }

  isCallingMatch(node){
    return this.isMatch(node) || this.isCallingMatch(node.callee);
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
      case 'NumericLiteral': case 'StringLiteral': case 'BooleanLiteral':
        pattern = patternNode.value; break;
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
