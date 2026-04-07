import validator from "validator";

export const signUpvalidation = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Please enter Name.");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter a valid email.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};
