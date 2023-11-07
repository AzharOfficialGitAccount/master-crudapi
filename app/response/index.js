const httpStatus = require('http-status');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const lngMsg = {};
fs.readdirSync(path.join(__dirname, 'lng')).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-5) === '.json');
}).forEach(file => {
  const fileName = file.slice(0, -5);
  const lng = require(path.join(__dirname, 'lng', file));
  lngMsg[fileName] = lng;
});

exports.error = (req, res, error, code) => {
  const lng = req.headers['accept-language'] || 'en';
  const response = {
    success: false,
    message: 'failure',
    result: {
      code: code || 500,
      message: (lngMsg[lng] ? lngMsg[lng][error.msgCode] : lngMsg.en[error.msgCode]) || error.msgCode || httpStatus[code]
    },
    time: Date.now()
  };
  res.status(code || 500).json(response);
};

exports.success = (req, res, result, code) => {
  const lng = req.headers['accept-language'] || 'en';
  const response = {
    success: true,
    message: 'success',
    result: {
      code,
      message: (lngMsg[lng] ? lngMsg[lng][result.msgCode] : lngMsg.en[result.msgCode]) || httpStatus[code],
      data: result.data
    },
    time: Date.now()
  };
  const errorCode = 200;
  return res.status(errorCode || 200).json(response);
};
