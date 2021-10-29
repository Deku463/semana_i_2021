var global = {
    mobileClient: false,
    savePermit: true,
    usd: 0,
    eur: 0
};

/**
 * Oauth2
 */

function requestOauthToken(username, password) {

	var success = true;

	// $.ajax({
	// 	url: 'uaa/oauth/token',
	// 	datatype: 'json',
	// 	type: 'post',
	// 	headers: {'Authorization': 'Basic YnJvd3Nlcjo='},
	// 	async: false,
	// 	data: {
	// 		scope: 'ui',
	// 		username: username,
	// 		password: password,
	// 		grant_type: 'password'
	// 	},
	// 	success: function (data) {
	// 		localStorage.setItem('token', data.access_token);
	// 		success = true;
	// 	},
	// 	error: function () {
	// 		removeOauthTokenFromStorage();
	// 	}
	// });
	return success;
}

function register(username, password) {

	var success = false;

	$.ajax({
		url: 'accounts/',
		datatype: 'json',
		type: 'post',
		contentType: "application/json",
        data: JSON.stringify({
            username: username,
            password: password
        }),		
		success: function (data) {
			success = true;
		},
		error: function () {
			if (xhr.status == 400) {
                alert("Sorry, account with the same name already exists.");
            } else {
                alert("An error during account creation. Please, try again.");
            }
		}
	});

	return success;
}

function hello() {

	var success = false;

	$.ajax({
		url: 'hello/message',
		datatype: 'json',
		type: 'get',
		contentType: "application/json",
        headers: {'Authorization': 'Bearer ' + getOauthTokenFromStorage()},
		success: function (data) {
			success = true;
            alert(data);
		},
		error: function () {
			
		}
	});

	return success;
}

function getOauthTokenFromStorage() {
	return localStorage.getItem('token');
}

function removeOauthTokenFromStorage() {
    return localStorage.removeItem('token');
}

/**
 * Current account
 */

function getCurrentAccount() {

	var token = getOauthTokenFromStorage();
	var account = null;

	if (token) {
		$.ajax({
			url: 'accounts/current',
			datatype: 'json',
			type: 'get',
			headers: {'Authorization': 'Bearer ' + token},
			async: false,
			success: function (data) {
				account = data;
			},
			error: function () {
				removeOauthTokenFromStorage();
			}
		});
	}

	return account;
}
