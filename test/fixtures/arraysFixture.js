function makeFixture (
  emptyArrayCase,
  trivialArrayCase,
  spreadArrayCase
){
  return({
    emptyArrayCase,
    trivialArrayCase,
    spreadArrayCase
  });
}

function match(){ return makeFixture; }  //We use the name match as transformation is restricted only for it

match () (
  ([]) => 0,
  ([x]) => x,
  ([x,...xs]) => `head: ${x}, tail: ${xs}`,
) //we force using them as function params to simulate real usage
