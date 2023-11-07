const response = require('../response/index');
const httpStatus = require('http-status');

const reqValidator = (schema, source = 'body') => async (req, res, next) => {
  const data = req[source];
  try {

    const validatedValues = await schema.validate(data, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true
    });
    if (validatedValues.error) {
      const { details } = validatedValues.error;
      const message = details.map((i) => i.message).join(',');
      return response.error(req, res, { msgCode: message, data: message }, httpStatus.BAD_REQUEST);
    }
    req[source] = validatedValues.value;
  } catch (err) {
    console.log(err);
    return response.error(req, res, { msgCode: 'INTERNAL_SERVER_ERROR' }, httpStatus.INTERNAL_SERVER_ERROR);
  }

  return next();
};

module.exports = {
  reqValidator
};
