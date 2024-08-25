export default{
    BASE_URL: "https://gym.ehostingguru.com/public/api",
	IMG_BASE_URL: 'https://gym.ehostingguru.com/public/'
};

export function ToFormData  (obj) {
	let formdata = new FormData();
	for (let key in obj) {
		formdata.append(key, obj[key]);
	}
	return formdata;
};

export function BuildSeachParams(obj) {
	let searchParams = new URLSearchParams(obj);

	return searchParams.toString();
}