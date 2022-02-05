module.exports = {
    ErrorResponse: function (response, message = 'Invalid data', statusCode = 400) {
        return response.status(statusCode).json(Object.freeze({
            message: message,
            code: statusCode
        }));
    },
    // Message and status code is optional
    SuccessResponse: function (response, data, message = 'Success', statusCode = 200) {
        return response.status(statusCode).json(Object.freeze({
            message: message,
            code: statusCode,
            data: data,
        }));
    }
}