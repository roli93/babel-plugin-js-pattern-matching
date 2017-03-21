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

makeFixture(
  ([]) => 0,
  ([x]) => x,
  ([x,...xs]) => `head: ${x}, tail: ${xs}`,
) //we force using them as function params to simulate real usage
