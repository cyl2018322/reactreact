function setCookie(key,value,expires){
	var cookieText = encodeURIComponent(key) + "="+encodeURIComponent(value)+";path=/";
	if(typeof expires == "number" && expires > 0){
		var date = new Date();
		date.setDate(date.getDate()+expires);
		cookieText += ";expires="+date;
	}
	document.cookie = cookieText;
}
function getCookie(key){
	var arr = document.cookie.split("; ");
	for(var i = 0; i < arr.length; i ++){
		var arr1 = arr[i].split("=");
		if(arr1[0] == encodeURIComponent(key)){
			return decodeURIComponent(arr1[1]);
		}
		
	}
}
function removeCookie(key){
	 document.cookie = encodeURIComponent(key) + "=;expires=" + new Date(0) + ";path=/";
}
