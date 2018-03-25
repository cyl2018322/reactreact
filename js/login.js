$(function(){
	//用户名写的正则  （手机正则）
	$(".user input").blur(function(){
		if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($(this).val()))){
			$(".use").css("color","#f00").html("用户名只能用手机号或邮箱")
		}else{
			$(".use").html("");
		}
	})
	$(".form_main input").val("")
	var ttt = $.cookie("ttt")? $.cookie("ttt") : "";
	$(".user input").val(ttt);
	//登录按钮点击事件
	$("#btn").click(function(){
		
		if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($(".user input").val()))){
			$(".use").css("color","#f00").html("登录名必须是邮件或手机")
		}else{
			var user = $(".user input").val();
			var pwd = $(".pwd input").val();
			var users =  $.cookie("test") ? $.cookie("test") : "";
			users = strToObj(users);
			if(user in users){
				if(users[user] == pwd){
				//登录成功
					users = objToStr(users);
					if($(".reuser").attr("checked")){
						$.cookie("ttt",user,{expires:7,path:"/"});
					}else{
						$.cookie("ttt",user,{expires:-1,path:"/"});
					}
					$.cookie("test1",users,{expries:7,path:"/"});
					
					location.href = "../index.html";
				}else{
					//登录失败
					$(".mm").css("color","#f00").html("您输入的密码不正确");
				}
			}else{
				$(".use").css("color","#f00").html("您输入的用户名不存在，请重新输入");
			}
		}
		
		
	})
	
	
	
	function strToObj(str){
					
		if(!str){
				return {};
			}
			var obj= {};
			var arr = str.split(":");
			for(var i = 0;i < arr.length; i++){
				var arr1 = arr[i].split(",");
				obj[arr1[0]] = arr1[1];
			}
			return obj
		}
		function objToStr(obj){
			var str = "";
			if(!obj){
				return "";
			}
			for(var user in obj){
				if(str){
					str+=":";
				}
				str += user + "," + obj[user];
			}
			return str;
						 
		}
})
