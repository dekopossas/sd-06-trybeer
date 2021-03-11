const UNHANDLED_ERROR = 'Internal Error';
const UNHANDLED_ERROR_STATUS = 500;

const handleError = (err, _req, res, _next) => {
  console.log(err.code);
  if (!err.payload) {
    res.status(UNHANDLED_ERROR_STATUS)
      .json({ error: UNHANDLED_ERROR });
  }
};

module.exports = {
  handleError,
};
