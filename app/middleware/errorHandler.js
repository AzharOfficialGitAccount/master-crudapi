const HttpStatus = require('http-status');
const response = require('../response/index');

exports.notFound = (req, res) => {
  return response.error(req, res, {
    msgCode: 'NOT_FOUND'
  }, HttpStatus.NOT_FOUND);
};

exports.methodNotAllowed = (req, res) => {
  return response.error(req, res, {
    msgCode: 'INVALID_ROUTE'
  }, HttpStatus.METHOD_NOT_ALLOWED);
};

exports.genericErrorHandler = (err, req, res, next) => {
  let error;
  console.log(err);
  if (err.isJoi) {
    error = {
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus[HttpStatus.BAD_REQUEST],
      details: err.details
        ? err.details.map((e) => ({
          message: e.message,
          param: e.path.join('.')
        }))
        : err.errors.map((e) => e.messages.join('. ')).join(' and ')
    };
  } else if (err.status === undefined && err.response && err.response.data) {
    ({ error } = err.response.data);
  } else if (err.status < 500) {
    error = {
      code: err.status,
      message: err.message
    };
    if (err.errors) {
      error.errors = err.errors;
    } else if (err.actionCode) {
      error.actionCode = err.actionCode;
    }
  } else {
    error = {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR]
    };
  }
  return response.error(req, res, { msgCode: error.message }, error.code);
};