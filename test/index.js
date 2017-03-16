import expect from 'expect.js';
import * as babel from 'babel-core';

describe('JS Pattern Matching Plugin', function() {

  let transform = (file) => {
    let pluginPath = require.resolve('../src');
    console.log(pluginPath);
    let options = {
      presets: ["es2015"],
      plugins: [pluginPath]
    };
    return babel.transformFileSync(`${__dirname}/${file}`, );
  }

  context('Blah', () => {

    let result = transform('fixture.js')

    console.log(result.code);

    it('should bleh', () => {
      expect("X").to.equal("X");
    });

  });


});
