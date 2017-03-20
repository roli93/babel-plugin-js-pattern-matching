function makeFixture (literalCase){
  return({
    literalCase
  });
}

makeFixture((v= 1) => "one") //we force using them as function params to simulate real usage
