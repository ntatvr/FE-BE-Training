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
    var status = 'Success', temp = rows;
	if(err) {
        status = 'Fail';
    }

    res.json({
        status: status,
        rows: temp
    });
}

function handleResponse(err, rows) {
	var status = 'Success',
        temp = rows;
	if(err) {
        status = 'Error';
        temp = [];
    }
    return {status: status, rows: temp };
}

function getMessages(req) {
    return {
        failedMessage: req.flash('failedMessage'),
        successfulMessage: req.flash('successfulMessage'),
    }
}