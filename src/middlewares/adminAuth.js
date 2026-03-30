export const adminAuth = (req, res, next) => {
  console.log("checking admin authorisation");
  const token = req.headers["authorization"];
  console.log(token);
  console.log(req.headers);
  if (token !== "abc") {
    res.status(401).send("unauthorised access denied");
  } else {
    next();
  }
};
