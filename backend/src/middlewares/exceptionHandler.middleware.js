const errorHandler = async (error, req, res, next) => {
  console.log("middleware exception: ", err);

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res.status(error.statusCode).json({
    data: null,
    message: "Something went wrong from server!",
    status: "error",
  });

  next();
};

module.exports = {
  errorHandler,
};
