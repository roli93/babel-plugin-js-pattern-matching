function otherFixtureMaker (
  nonCaseFunction
){
  return({
    nonCaseFunction
  });
}

otherFixtureMaker(
  (whatever) => whatever+"!",
) //we force using them as function params to simulate real usage
