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

makeFixture(
  (EvalError) => "EvalError",
  (e = ReferenceError) => e.message,
  ({ message } = SyntaxError) => message+"!",
) //we force using them as function params to simulate real usage
