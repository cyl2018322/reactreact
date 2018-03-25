$(function(){
	var flag1 = 0;
	var flag2 = 0;
	var flag3 = 0;
	var flag4 = 0;
	//判断账号框的的得焦与失焦
	$(".form_inp .zhanghao input").focus(function(){
		$(".zh").css("color","rgb(56,195,82)").html("请输入注册的手机号")
	})
	$(".form_inp .zhanghao input").blur(function(){
		if(!$(this).val()){
			$(".zh").html("");
		}else if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($(this).val()))){
			$(".zh").css("color","#f00").html("账号暂时只开放手机号码注册");
		}else{
			$(".zh").html("");
			flag1 = 1;
		}
	})
	
	//判断密码框的得焦与失焦
	$(".form_inp .mima input").focus(function(){
		$(".mm").css("color","rgb(56,195,82)").html("6-20位字符，可使用数字、字母或字符的组合");
	})
	$(".form_inp .mima input").blur(function(){
		if(!$(this).val()){
			$(".mm").html("");
		}else if(/^.{1,5}$/.test($(this).val()) || /^.{20,}$/.test($(this).val())){
			$(".mm").css("color","#f00").html("密码长度只能在6-20位字符之间");
		}else if(/^\d{6,10}$/.test($(this).val())){
			$(".mm").css("color","#f00").html("该密码过于简单，有被盗风险");
		}else{
			$(".mm").html("");
			flag2 = 1;
		}
	})
	
	//判断再次输入密码框的得焦与失焦
	$(".form_inp .mima1 input").focus(function(){
		$(".mm1").css("color","rgb(56,195,82)").html("请再次输入密码");
	})
	$(".form_inp .mima1 input").blur(function(){
		if(!$(this).val()){
			$(".mm1").html("");
		}else if(!($(this).val() == $(".form_inp .mima input").val())){
			$(".mm1").css("color","#f00").html("两次输入密码不一致");
		}else{
			$(".mm1").html("");
			flag3 = 1;
		}
	})
	
	//验证码框
	$.idcode.setCode();
	$(".form_inp .yzm input").focus(function(){
		$(".yzm1").css("color","rgb(56,195,82)").html("请输入验证码");
	})
	$(".form_inp .yzm input").blur(function(){
		var IsBy = $.idcode.validateCode();
		if(!$(this).val()){
			$(".yzm1").css("color","#f00").html("请输入验证码");
		}else if(IsBy){
			$(".yzm1").html("");
			flag4 =1;
		}
	})
	$("#butn").click(function(){
        var IsBy = $.idcode.validateCode();  //调用返回值，返回值结果为true或者false
        if(IsBy){
            $(".yzm1").html("");
           
        }else {
            $(".yzm1").css("color","#f00").html("验证码输入有误");
        }
    })
	
	
	//给注册按钮设置点击事件
	$("#btn").click(function(){
		
		if(flag1==1 && flag2==1 && flag3==1 && flag4==1){
			var user = $(".form_inp .zhanghao input").val();
			var pwd = $(".form_inp .mima input").val();
			var users =  $.cookie("test") ? $.cookie("test") : "";
			users = strToObj(users);
			if(user in users){
				alert("用户名已存在");
				return;
			}else{
				users[user] = pwd;
				users = objToStr(users);
				$.cookie("test",users,{expires:9999,path:"/"});
				console.log(decodeURIComponent(document.cookie));
				alert("注册成功");
				location.href = "login.html";
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
