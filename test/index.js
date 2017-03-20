import expect from 'expect.js';
import * as babel from 'babel-core';

describe('JS Pattern Matching Plugin', function() {

  let transform = (file) => {
    let pluginPath = require.resolve('../src/index.js');
    let options = {
      presets: ["es2015"],
      plugins: [pluginPath]
    };
    return babel.transformFileSync(`${__dirname}/${file}`, options);
  }

  let result = eval(transform('fixture.js').code)

  context('Should transform literal value cases', () => {

    let literalCase = result.literalCase

    it('should transform a literal number', () => {
      expect(literalCase.function()).to.equal("one");
      expect(literalCase.pattern).to.equal(1);
    });

  });


});
