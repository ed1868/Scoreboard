require('dotenv');


exports.loginRequired = function (req, res, next) {
  try {
    console.log('THIS IS THE REQ.HEADERS ---',req.headers);
    const token = req.headers.authorization.split(' ')[1];
    console.log('THIS IS THE TOKEN ------',token);

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      console.log(err)
      if (decoded) {
        next();
      } else {
        return next({ status: 401, message: 'You need to log In First : Please Log In First' });
      }
    });
  } catch (e) {
    return next({ status: 401, message: 'Please Log In First' });
  }
};

exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      console.log(decoded,req.params.id)
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({ status: 401, message: "Unauthorized" });
      }
    });
  } catch (e) {
    return next({ status: 401, message: "Unauthorized" });
  }
};