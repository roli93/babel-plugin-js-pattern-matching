function makeFixture (
  numberCase,
  stringCase,
  nullCase,
  undefinedCase,
  boolCase,
  NaNCase
){
  return({
    numberCase,
    stringCase,
    nullCase,
    undefinedCase,
    boolCase,
    NaNCase
  });
}

makeFixture(
  (v= 1) => "number",
  (v= "three") => "string",
  (v= null) => "null constant",
  (v= undefined) => "undefined constant",
  (v= true) => "boolean",
  (v= NaN) => "NaN constant"
) //we force using them as function params to simulate real usage
