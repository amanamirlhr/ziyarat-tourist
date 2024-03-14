const { generateToken } = require("../utils/jwt.utils");
const { User } = require("../database/models");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({
    raw: true,
    where: {
      email: email,
      password: password,
    },
  });

  const err = new Error("issue;");
  next(err);
  if (user) {
    let token = generateToken(user);
    user.token = token;
    delete user.password;

    return res.status(200).json({
      data: user,
      message: "user logged in successfully",
      status: "success",
    });
  } else {
    return res.status(404).json({
      data: null,
      message: "email/password is incorrect " + err,
      status: "error",
    });
  }
};

module.exports = {
  login,
};
