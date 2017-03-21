function makeFixture (
  variableCase,
  annonVariableCase
){
  return({
    variableCase,
    annonVariableCase
  });
}

makeFixture(
  (whatever) => whatever+"!",
  (_) => "anon",
) //we force using them as function params to simulate real usage
