import expect from 'expect.js';
import * as babel from 'babel-core';

describe('JS Pattern Matching Plugin', function() {

  const transform = (file) => {
    let pluginPath = require.resolve('../src/index.js');
    let options = {
      presets: ["es2015"],
      plugins: [pluginPath]
    };
    return babel.transformFileSync(`${__dirname}/fixtures/${file}`, options);
  }

  const getFileCode = (filename) => eval(transform(filename).code)

  context('Should transform literal value cases', () => {

    let {
      numberCase,
      stringCase,
      nullCase,
      undefinedCase,
      boolCase,
      NaNCase
    } = getFileCode('literalsFixture.js')

    it('should transform a literal number', () => {
      expect(numberCase.function()).to.equal("number");
      expect(numberCase.pattern).to.equal("1");
    });

    it('should transform a literal string', () => {
      expect(stringCase.function()).to.equal("string");
      expect(stringCase.pattern).to.equal("three");
    });

    it('should transform a literal null', () => {
      expect(nullCase.function()).to.equal("null constant");
      expect(nullCase.pattern).to.equal("null");
    });

    it('should transform a literal undefined', () => {
      expect(undefinedCase.function()).to.equal("undefined constant");
      expect(undefinedCase.pattern).to.equal("undefined");
    });

    it('should transform a literal boolean', () => {
      expect(boolCase.function()).to.equal("boolean");
      expect(boolCase.pattern).to.equal("true");
    });

    it('should transform a literal NaN ', () => {
      expect(NaNCase.function()).to.equal("NaN constant");
      expect(NaNCase.pattern).to.equal("NaN");
    });

  });

  context('Should transform variable cases', () => {

    let {
      variableCase,
      annonVariableCase
    } = getFileCode('variablesFixture.js')

    it('should transform a variable case', () => {
      expect(variableCase.function("a")).to.equal("a!");
      expect(variableCase.pattern).to.equal("whatever");
    });

    it('should transform an annonymous variable case', () => {
      expect(annonVariableCase.function("a")).to.equal("anon");
      expect(annonVariableCase.pattern).to.equal("_");
    });

  });

  context('Should transform Class cases', () => {

    let {
      classCase,
      bindingClassCase,
      destructuringClassCase
    } = getFileCode('classesFixture.js')

    it('should transform a simple class case', () => {
      expect(classCase.function()).to.equal("An EvalError");
      expect(classCase.pattern).to.equal("EvalError");
    });

    it('should transform a binding class case', () => {
      expect(bindingClassCase.function(new ReferenceError("msg"))).to.equal("msg");
      expect(bindingClassCase.pattern).to.equal("ReferenceError");
    });

    it('should transform a destructuring class case', () => {
      expect(destructuringClassCase.function(new SyntaxError("msg"))).to.equal("msg!");
      expect(destructuringClassCase.pattern).to.equal("SyntaxError");
    });

  });

  context('Should transform Class cases', () => {

    let {
      emptyArrayCase,
      trivialArrayCase,
      spreadArrayCase
    } = getFileCode('arraysFixture.js')

    it('should transform an empty array case', () => {
      expect(emptyArrayCase.function([])).to.equal(0);
      expect(emptyArrayCase.pattern).to.equal("[]");
    });

    it('should transform a one-element trivial array case', () => {
      expect(trivialArrayCase.function([1])).to.equal(1);
      expect(trivialArrayCase.pattern).to.equal("[x]");
    });

    it('should transform a array with spread case', () => {
      expect(spreadArrayCase.function([1,2,3])).to.equal("head: 1, tail: [2,3]");
      expect(spreadArrayCase.pattern).to.equal("[x,...xs]");
    });

  });


});
