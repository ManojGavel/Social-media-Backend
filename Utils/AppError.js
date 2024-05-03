

const AppError = async (err, statusCode) => {
    return {
        status: "fail",
        message: err,
        statusCode,
    };
    }
    module.exports = AppError;