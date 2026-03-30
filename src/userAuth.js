export const userAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log("checking user auth");
  if (token !== "user") {
    res.status(401).send("unauthorized user access");
  } else {
    next();
  }
};
