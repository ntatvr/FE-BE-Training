"user strict";

// Module public methods.
module.exports = {
	renderHomePage : renderHomePage,
	renderUserPage  : renderUser
};

/**
* @name renderHomePage
* @description
* Render homepage.
*
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function renderHomePage(req, res) {
	res.render('homepage', {
	    title : 'HOMEPAGE'
	});
}

/**
* @name renderUser
* @description
* Render user page.
*
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function renderUser(req, res) {
	res.render('user', {
	    title : 'USER',
	    users: [
		    {
		    	username: 'ntatvr',
		    	password: '123456',
		    	isActive: 1
		    },
		    {
		    	username: 'ntatvr',
		    	password: '123456',
		    	isActive: 1
		    }
	    ]
	});
}