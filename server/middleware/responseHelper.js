responseHelper = {
	handleSuccess : function (req, res, next) {
		res.json(responseHelper.responseObject(200, "ok", req.result, false));
	},
	handleError : function(statusCode, message){
		return	{
			statusCode: statusCode ? statusCode : 500,
			message: message ? message : "error",
			result: {},
			error: true
		}
	},
	responseObject : function(statusCode, message, result ,error){
		return	{
			statusCode: statusCode ? statusCode : 200,
			message: message ? message : "ok",
			result: result ? result : {},
			error: error ? error : false
		}
	}
}

module.exports = responseHelper;


