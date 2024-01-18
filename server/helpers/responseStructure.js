const resStr = function (status, message, data, error) {
  let finalResponse = {};
  switch (status) {
    case 200:
      finalResponse = {
        message: message ? message : "success",
        error: error,
        data: data,
        status: status,
      };
      break;
    case 400:
      finalResponse = {
        message: message ? message : "missing params",
        error: error,
        data: data,
        status: status,
      };
      break;
    case 500:
      finalResponse = {
        message: message ? message : "something went wrong",
        error: error,
        data: data,
        status: status,
      };
      break;

    default:
        finalResponse = {
            message: message ? message : "default",
            error: error,
            data: data,
            status: status,
          };
      break;
  }
  return finalResponse;
};

exports.resStr = resStr;


