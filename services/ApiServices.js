import Configs from "../configs/Configs";

const getFormData = (obj) => {
	let formdata = new FormData();
	for (let key in obj) {
		formdata.append(key, obj[key]);
	}
	return formdata;
};

// function getAccount(userCode, userId) {
//   let endpoint = `getAccount.php?userCode=${userCode}&userId=${userId}`;
//   //console.log(endpoint);
//   return HttpClient.post(endpoint);
// }

export const retriveAccount = async (id) => {
	let url = Configs.BASE_URL + `get_accounts?id=${id}`;
	let response = await fetch(url);
	return await response.json();
};

export const fetchAccount = async (phoneNumber) => {
	let url = Configs.BASE_URL + `fetch_accounts?mobile=${phoneNumber}`;
	let response = await fetch(url);
	return await response.json();
};

export const fetchUsers = async (id) => {
	let url = Configs.BASE_URL + `fetch_users?company_id=${id}`;
	console.log("url-->>>>>>>>>", url);
	let response = await fetch(url);
	return await response.json();
};

export const fetchUsersByPhone = async (phone) => {
	let url = Configs.BASE_URL + `fetch_users_by_phone?mobile=${phone}`;
	let response = await fetch(url);
	return await response.json();
};

export const transactionDetails = async (id) => {
	let url = Configs.BASE_URL + `transaction_details?user_id=${id}`;
	let response = await fetch(url);
	return await response.json();
};

export const userDetails = async (id) => {
	let url = Configs.BASE_URL + `user_details?user_id=${id}`;
	let response = await fetch(url);
	return await response.json();
};

export const totalGet = async (id) => {
	let url = Configs.BASE_URL + `total_get?company_id=${id}`;
	let response = await fetch(url);
	return await response.json();
};

export const totalGive = async (id) => {
	let url = Configs.BASE_URL + `total_give?company_id=${id}`;
	let response = await fetch(url);
	return await response.json();
};

export const getTrasactions = async (id) => {
	let url = Configs.BASE_URL + `get_transactions?company_id=${id}`;
	let response = await fetch(url);
	return await response.json();
};

export const fetchPartyDeatils = async (id) => {
	let url = Configs.BASE_URL + `fetch_party_deatils?user_id=${id}`;
	let response = await fetch(url);
	return await response.json();
};

export const isMobileExist = async (mobile) => {
	let url = Configs.BASE_URL + `is_mobile_exist?mobile=${mobile}`;
	// console.log(url);
	let response = await fetch(url);
	return await response.json();
};

export const login = async (requestObj) => {

    // console.log('login-->', requestObj);
    // return;
    let url = Configs.BASE_URL + "login";

	let requestOptions = {
		method: "POST",
		body: getFormData(requestObj),
	};

	let response = await fetch(url, requestOptions);
    // console.log('response login-->', await response.text());
    // return;
	return await response.json();
}

export const userCreate = async (requestObj) => {

    // console.log('login-->', requestObj);
    // return;
    let url = Configs.BASE_URL + "user_create";

	let requestOptions = {
		method: "POST",
		body: getFormData(requestObj),
	};

	let response = await fetch(url, requestOptions);
    // console.log('response login-->', await response.text());
    // return;
	return await response.json();
}

export const addPurchase = async (requestObj) => {

    // console.log('login-->', requestObj);
    // return;
    let url = Configs.BASE_URL + "add_purchase";

	let requestOptions = {
		method: "POST",
		body: getFormData(requestObj),
	};

	let response = await fetch(url, requestOptions);
    // console.log('response login-->', await response.text());
    // return;
	return await response.json();
}

export const paymentTake = async (requestObj) => {

    // console.log('login-->', requestObj);
    // return;
    let url = Configs.BASE_URL + "payment_take";

	let requestOptions = {
		method: "POST",
		body: getFormData(requestObj),
	};

	let response = await fetch(url, requestOptions);
    // console.log('response login-->', await response.text());
    // return;
	return await response.json();
}

export const addSale = async (requestObj) => {

    // console.log('login-->', requestObj);
    // return;
    let url = Configs.BASE_URL + "add_sale";

	let requestOptions = {
		method: "POST",
		body: getFormData(requestObj),
	};

	let response = await fetch(url, requestOptions);
    // console.log('response login-->', await response.text());
    // return;
	return await response.json();
}

export const addNewSale = async (requestObj) => {

    // console.log('login-->', requestObj);
    // return;
    let url = Configs.BASE_URL + "add_new_sale";

	let requestOptions = {
		method: "POST",
		body: getFormData(requestObj),
	};

	let response = await fetch(url, requestOptions);
    // console.log('response login-->', await response.text());
    // return;
	return await response.json();
}

export const newParty = async (requestObj) => {

    // console.log('login-->', requestObj);
    // return;
    let url = Configs.BASE_URL + "new_party";

	let requestOptions = {
		method: "POST",
		body: getFormData(requestObj),
	};

	let response = await fetch(url, requestOptions);
    // console.log('response login-->', await response.text());
    // return;
	return await response.json();
}

export const editParty = async (requestObj) => {

    // console.log('login-->', requestObj);
    // return;
    let url = Configs.BASE_URL + "edit_party";

	let requestOptions = {
		method: "POST",
		body: getFormData(requestObj),
	};

	let response = await fetch(url, requestOptions);
    // console.log('response login-->', await response.text());
    // return;
	return await response.json();
}

export const signUp = async (requestObj) => {

    // console.log('login-->', requestObj);
    // return;
    let url = Configs.BASE_URL + "sign_up";

	let requestOptions = {
		method: "POST",
		body: getFormData(requestObj),
	};

	let response = await fetch(url, requestOptions);
    // console.log('response login-->', await response.text());
    // return;
	return await response.json();
}

