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