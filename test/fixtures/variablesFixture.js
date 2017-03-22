function makeFixture (
  variableCase,
  annonVariableCase
){
  return({
    variableCase,
    annonVariableCase
  });
}

function match(){ return makeFixture; }  //We use the name match as transformation is restricted only for it

match () (
  (whatever) => whatever+"!",
  (_) => "anon",
) //we force using them as function params to simulate real usage
