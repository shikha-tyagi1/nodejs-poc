var helper = require('../middleware/responseHelper');

module.exports = {
	editAction: function(req, res, next){
		console.log(" action editeddd");
	    res.json(helper.handleError(404, "Not Found"));
	}


};