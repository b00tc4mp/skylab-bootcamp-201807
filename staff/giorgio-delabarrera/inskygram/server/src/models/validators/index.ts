const validate: any = require("mongoose-validator");

const emailValidator = validate({
  validator: "isEmail",
  message: "This value is not a valid email address.",
});

export { emailValidator };
