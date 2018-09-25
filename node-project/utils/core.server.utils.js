module.exports = {
	renderJSON: renderJSON,
	handleResponse: handleResponse,
    getMessages: getMessages
};

/**
* @name getUserById
* @description
* Get user by ID
*
* @param  {object} err Error
* @param  {object} req HTTP request
* @param  {object} rows JDBC Result
*/
function renderJSON(err, res, rows) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
	if(err) {
        res.json(err);
    } else {
        res.json(rows);
    }
}

function handleResponse(err, rows) {
	var status = 'Success';
	if(err) {
        status = 'Error';
    }
    return {status: status, rows: rows };
}

function getMessages(req) {
    return {
        failedMessage: req.flash('failedMessage'),
        successfulMessage: req.flash('successfulMessage'),
    }
}