(function(){
		//右边侧边栏事件
	$(".right_side").css("height",$(window).height());
	$(".box_r").css("height",$(window).height());
	var $r_btn = $(".r_btn");
	var $right_side = $(".right_side");
	var $box_r= $(".box_r");
	
	
	$.each($r_btn,function(i){
		var stop = i;
		$(this).click(function(){
			stop++;
			console.log(stop)
			if(stop%2==1){
				$right_side.animate({"right":"0px"},500)
				
			}else{
					$box_r.css("display","none").eq(i).css("display","block")
					$right_side.animate({"right":"270px"},500);
				
			}
		})
	})
	$("#btn").click(function(){
		var user = $(".yonghu input").val();
		var pwd = $(".pwd input").val();
		var users =  getCookie("test") ? getCookie("test") : "";
		users = strToObj(users);
		if(user in users){
			if(users[user] == pwd){
			//登录成功
				if($(".yanzheng input").val() == eval($(".yznum").html())){
					users = objToStr(users);
					setCookie("test1",users,7);
					$(".tishi").html("");
					$(".denglu_p").html("您好！华盛粉丝："+user);
					$(".dl").html("hi"+user);
					$(".zhuxiao ").html("<a href='../html/login.html'>注销</a>").find('a').css({"border-left":"1px solid #ccc","margin-left":"5px"});
					$(".boxr_w").css("display","none");
					$(".boxr_y").css("display","block");
					$(".right_side input").val("")
					$(".zhuxiao a").click(function(){
					removeCookie("test1");
					})
				}else{
					$(".tishi").html("验证码不正确，请重新输入");
				}
			}else{
				//登录失败
			$(".tishi").html("您输入的密码不争取！请重新输入！");
			}
		}else{
			$(".tishi").html("您输入的用户名不存在，请先注册！");
		}
	})

	//算式验证码
	sjss();
	function sjss(){
		var ar = [0,1,2,3,4,5,6,7,8,9];
		var ar1 = ["+","-","*"]
		var num1 = ar[Math.floor(Math.random()*10)];
		var num2 = ar[Math.floor(Math.random()*10)];
		var fuhao = ar1[Math.floor(Math.random()*3)]
		$(".yznum").html( num1 + fuhao + num2);
		var sum = num1 + fuhao + num2;
			//验证码输入框失焦判断是否争取
		$(".yanzheng input").blur(function(){
			if(!($(this).val() == eval(sum))){
				sjss();
			}
		})
	}
	
	//点击验证码框改变算式
	$(".yznum").click(function(){
		sjss();
	})

	//七天免登陆
	var mUsers =  getCookie("test1") ? getCookie("test1") : "";
	mUsers = strToObj(mUsers);
	if(mUsers){
		//判断cookie中是否有东西
		for(var i in mUsers){
			$(".denglu_p").html("您好！华盛粉丝："+i);
			$(".dl").html("hi"+i);
			$(".zhuxiao a").html("<a href='../html/login.html'>注销</a>").find("a").css({"border-left":"1px solid #ccc","margin-left":"5px"});
			//登陆成功    登录页面消失，支付购买框出现
			$(".boxr_w").css("display","none");
			$(".boxr_y").css("display","block");
			//将按钮改成进入会员中心 
			$("#btn").attr("href","#").html("进入会员中心").css("letter-spacing","3px");
			//下面的前往注册按钮也消失
			$(".btn_bot").css("display","none");
			$(".zhuxiao a").click(function(){
				//$(".dl").html("<a href='#'>登录</a>");
				//$(".zhuxiao").html("<a href='../html/zhuce.html'>注册</a>").css({"border-left":"none","margin-left":"0"});
				removeCookie("test1");
				//location.href="../html/denglu.html";
			})
		}
	}
	
	
	
	$(".returntop").click(function(){
		$(document).scrollTop(0)
	})
	$(".closeside").click(function(){
		$(".right_side").animate({"right":"-40px"},500);
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
		
		
		//加载购物车中原有商品
		loadCart();
		function loadCart(){
			var cartStr = getCookie("cart") ? getCookie("cart") : "";
			var cartObj = convertCartStrToObj(cartStr);
			//获取到购物车中所有商品的数量
			var total = 0;
			for(var id in cartObj){
				total += cartObj[id].num;
			}
			if(isNaN(total)){
				total = 0;
			}
			$(".buy").html(total);
			$(".cart .cartNum").html(total);
		}
		
		function jzCart(){
			var topNum = 0;
		//页面右侧简易购物车
		var message = getCookie("cart") ? getCookie("cart") : "";
		if(message){ //如果有   则商品列表出来
			$(".cart_pro_b").css('display',"none")
			$(".cart_pro_b1").css('display',"block")
			//整理cookie中的商品数据
			messageObj = convertCartStrToObj(message); //将cookie数据转换成对向形式
			for(var id in messageObj){
				var name = messageObj[id].name;
				var price = messageObj[id].price;
				var size = messageObj[id].size;
				var color = messageObj[id].color;
				var num = messageObj[id].num;
				var src = messageObj[id].src;
				var youhui = messageObj[id].youhui;
				var remain = messageObj[id].remain;
				var pricenum = price.substring(1);
				$(".cart_pro_mess").append($("<tr id='"+ id+"' name ='"+remain+"' class='cart_list_2 fl'><td class= 'cart_name1 fl'><div class='cart_name1_img fl'><img src='"+src+"'/></div><div class='cart_name1_text fl'><a href='#'><span></span>"+name+"</a><p><span>"+ color+"</span> <span>"+ size+"</span></p></div></td><td class='cart_operate1 fl'><p><span>"+ price+"</span>*<i>1</i></p><p>优惠：<span>"+ youhui+"</span></p><a href='javascript:;' class='cart_remove fr'>删除</a></td></tr>"))
				//商品总数
				topNum += num;
			}
			$(".cart_pro_price p:first-child span").html(topNum);
			$(".cart_pro_price p:nth-child(2) span").html("￥"+pricenum  * num+".00")
		}else{
			$(".cart_pro_b").css('display',"block");
			$(".cart_pro_b1").css('display',"none");
		}
		
		}
		jzCart();
		//删除按钮
		var $cart_remove = $(".cart_remove");
		$cart_remove.click(function(){
			$(this).parent().parent().remove();
			for(var id in messageObj){
				if(($(this).parent().parent().attr("id") == id)){
					delete messageObj[id]
				}
			}
				var messStr = convertObjToCartStr(messageObj)
				setCookie("cart",messStr,7);
				if(messageObj){
					removeCookie("cart")
				}
			jzCart();
			loadCart();
		})
		
		function convertCartStrToObj(cartStr){
		//"sp1,香蕉,30,1,src1:sp2,苹果,40,2,src2:sp3,梨,50,3,str3"
		//如果是空字符串，即没有购物车信息，那么购物车为空，直接返回一个空对象
		if(!cartStr){
			return {};
		}
		var goods = cartStr.split(":");
		var obj = {};
		for(var i = 0; i < goods.length; i ++){
			var data = goods[i].split(",");
			//以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
			obj[data[0]] = {
				name : data[1],
				price : data[2],
				size : data[3],
				color : data[4],
				num : parseInt(data[5]),
				src : data[6],
				youhui : data[7]
			}
		}
		return obj;
	}
	function convertObjToCartStr(obj){
			
			var cartStr = "";
			//遍历对象
			for(var id in obj){
				if(cartStr){
					cartStr += ":";
				}
				cartStr += id + "," + obj[id].name + "," + obj[id].price + ","+obj[id].size+","+obj[id].color+"," + obj[id].num + "," + obj[id].src+","+obj[id].youhui;
			}
			return cartStr;
	}
	
})()
