function makeFixture (
  classCase,
  bindingClassCase,
  destructuringClassCase
){
  return({
    classCase,
    bindingClassCase,
    destructuringClassCase
  });
}

function match(){ return makeFixture; }  //We use the name match as transformation is restricted only for it

match () (
  (EvalError) => "An EvalError",
  (e = ReferenceError) => e.message,
  ({ message } = SyntaxError) => message+"!",
) //we force using them as function params to simulate real usage
