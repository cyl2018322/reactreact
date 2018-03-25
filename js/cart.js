require(['../js/jquery','../js/cookie'],function(){
	
	//引入way，list，footer的html
	$(".bott").load("waylistbottom.html");

	
	//判断购物车中是否有商品
	function jzcart(){
		var message = getCookie("cart") ? getCookie("cart") : "";
	var $cart = $(".cart");
	var $pro_list = $(".pro_list");
	var topNum = 0;
	if(message){ //如果有   则商品列表出来
		$cart.css("display","none");
		$pro_list.css("display","block");
		$(".settle").css("display","block");
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
			$(".list_pro").append($("<tr id='"+ id+"' name ='"+remain+"' class='list_2 fl'><td class='check1'><input type='checkbox'  checked='checked' /></td><td class='pro_name1'><div class='name1_img fl'><img src='"+src+"'/></div><div class='name1_text fl'><a href='#'><span></span>"+name+"</a><p><span>"+ color+"</span> <span>"+ size+"</span></p></div></td><td class='pro_price1'><span class='price'>"+price+"</span></td><td class='pro_num1'><a href='javascript:;' class='jian'>-</a><input type='text' value='"+num+"'/><a href='javascript:;' class='jia'>+</a><div class='num1box'><i></i><p>商品数量修改成功</p><p>商品金额为：<span>￥"+pricenum  * num+".00</span>元</p><a href='javascript:;'>关闭</a></div><div class='num2box'><i></i><p>库存不足！</p></div></td><td class='pro_youhui1'><span>"+ youhui+"</span></td><td class='pro_sum1'>￥"+pricenum  * num+".00</td><td class='operate1'><a href='javascript:;' class='move'>移入收藏夹</a><a href='javascript:;' class='remove'>删除</a></td></tr>"))
			//商品总数
			topNum += num;
		}
		$(".list_nav i").html(topNum);
	}else{	//没有让空购物车出来
		$cart.css("display","block");
		$pro_list.css("display","none");
		$(".settle").css("display","none");
	}
		
	}
	var message = getCookie("cart") ? getCookie("cart") : "";
	var $cart = $(".cart");
	var $pro_list = $(".pro_list");
	var topNum = 0;
	if(message){ //如果有   则商品列表出来
		$cart.css("display","none");
		$pro_list.css("display","block");
		$(".settle").css("display","block");
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
			$(".list_pro").append($("<tr id='"+ id+"' name ='"+remain+"' class='list_2 fl'><td class='check1'><input type='checkbox'  checked='checked' /></td><td class='pro_name1'><div class='name1_img fl'><img src='"+src+"'/></div><div class='name1_text fl'><a href='#'><span></span>"+name+"</a><p><span>"+ color+"</span> <span>"+ size+"</span></p></div></td><td class='pro_price1'><span class='price'>"+price+"</span></td><td class='pro_num1'><a href='javascript:;' class='jian'>-</a><input type='text' value='"+num+"'/><a href='javascript:;' class='jia'>+</a><div class='num1box'><i></i><p>商品数量修改成功</p><p>商品金额为：<span>￥"+pricenum  * num+".00</span>元</p><a href='javascript:;'>关闭</a></div><div class='num2box'><i></i><p>库存不足！</p></div></td><td class='pro_youhui1'><span>"+ youhui+"</span></td><td class='pro_sum1'>￥"+pricenum  * num+".00</td><td class='operate1'><a href='javascript:;' class='move'>移入收藏夹</a><a href='javascript:;' class='remove'>删除</a></td></tr>"))
			//商品总数
			topNum += num;
		}
		$(".list_nav i").html(topNum)
		
		//当点击复选框时    总价会发生变化     复选框事件
		var $chose = $(".check1 input");
		
		$chose.click(function(){
			//没有选中的商品不在计算之列      
			//将所有变量清0   从新计算
			
			setPrice();
		})
		//计算当前总价
		setPrice();
		function setPrice(){
			var sum = 0;
			var thisPrice = 0;
			var youhuiPrice= 0;
			var thisNum = 0;
			var youhuiSum = 0;
			var nowPrice = 0;
			var proNum = 0;
			$.each($chose, function() {
				if($(this).attr("checked")){
					 thisPrice = $(this).parent().parent().find(".pro_price1").find(".price").html();
					youhuiPrice =  $(this).parent().parent().find(".pro_youhui1").find("span").html();
					thisPrice = thisPrice.substring(1);
					youhuiPrice = youhuiPrice.substring(1);
					 thisNum = $(this).parent().parent().find(".pro_num1").find("input").val();
					sum += thisPrice * thisNum + youhuiPrice * thisNum;
					proNum += eval(thisNum);
					 youhuiSum += youhuiPrice * thisNum;
					 nowPrice += thisPrice * thisNum
				}
					$(".settle2 .sum").text("￥"+sum+".00");
					$(".set_youhui").text("￥"+youhuiSum+".00");
					$(".set_price").text("￥"+nowPrice+".00");
					$(".settle3_1 p:first-child span").text("￥"+nowPrice+".00");
					$(".settle3_1 p:last-child span:first-child").text(proNum);
			});
		}
		//全选按钮 ，
		$(".settle1 input").click(function(){
			
			if($(this).is(':checked')){
				//让所有的商品都是被选中状态   重新计算
				 $(".check1 input").attr("checked","checked");
				 setPrice();
			}else{
				//让所有商品都不被选中   重新计算
				 $(".check1 input").removeAttr("checked");
				 setPrice();
			}
		})
		
		//数量加减按钮
		var $numJia = $(".jia");
		var $numJian = $(".jian");
		//jia
		var num = 0;
		
		$numJia.click(function(){
			num = $(this).prev("input").val();
			var $that = $(this);  //进入定时器this指向会被改变   先记录一次
			num++;
			//库存数量放在了当前商品所在的tr的name属性
			//如果大于库存  则不能加
			var numRemain = $(this).parent().parent().attr("name");
			if(num > numRemain){
				$(this).prev("input").val(numRemain);
				$(this).parent().find(".num2box").css("display","block");
			
				setTimeout(function(){
					$that.parent().find(".num2box").css("display","none");
				},1000)
			}else{
				//小于库存     
				$(this).prev("input").val(num);
				num1box();
				
				setTimeout(function(){
					$that.parent().find(".num1box").css("display","none");
				},1000)
				
				
			}
			num = $(this).prev("input").val();
			var jiaPrice = $(this).parent().parent().find(".pro_price1 span").text();
				jiaPrice = jiaPrice.substring(1);
				//改变总价
				$(this).parent().parent().find(".pro_sum1").text("￥"+jiaPrice*num+".00");
				setPrice();
		})
		//jian
		$numJian.click(function(){
			num = $(this).next("input").val();
			//数量不能小于1
			var $that = $(this);
			num--;
			if(num <= 1){
				$(this).next("input").val(1);
				
			}else{
				$(this).next("input").val(num);
				num1box();
				
				setTimeout(function(){
					$that.parent().find(".num1box").css("display","none");
				},1000)
			}
			num = $(this).next("input").val();
			var jiaPrice = $(this).parent().parent().find(".pro_price1 span").text();
				jiaPrice = jiaPrice.substring(1);
				$(this).parent().parent().find(".pro_sum1").text("￥"+jiaPrice*num+".00");
				setPrice();
		})
		//在文本框中输入值同样改变价钱
		var $NumInp = $(".pro_num1 input");
		$NumInp.blur(function(){
			num = $(this).val();
			var $that = $(this)
			var numRemain = $(this).parent().parent().attr("name");
			if(eval(num) > numRemain){
				$(this).val(numRemain);
				$(this).parent().find(".num2box").css("display","block");
				
				setTimeout(function(){
					$that.parent().find(".num2box").css("display","none");
				},1000)
				var inpPrice = $(this).parent().parent().find(".pro_price1 span").html();
				inpPrice = inpPrice.substring(1)
				$(this).parent().parent().find(".pro_sum1").text("￥"+inpPrice*numRemain+".00");
				setPrice();
			}else{
				$(this).val(num);
				num1box();
				
				setTimeout(function(){
					$that.parent().find(".num1box").css("display","none");
				},1000)
				var inpPrice = $(this).parent().parent().find(".pro_price1 span").html();
				inpPrice = inpPrice.substring(1)
				$(this).parent().parent().find(".pro_sum1").text("￥"+inpPrice*eval(num)+".00");
				setPrice();
			}
			
		})
		//数量框不能输入非数字
		$.each($NumInp,function(i){
			var a = $(this).val()
			$(this).keyup(function(){
				if(!(/^\d+$/.test($(this).val()))){
					$(this).val(a);
				}
				
			})
			
		})
		//数量改变是提示盒子值改变     
		function num1box(){
			var jiaPrice = $(this).parent().parent().find(".pro_price1 span").text();
			jiaPrice = jiaPrice.substring(1);
			$(this).parent().find(".num1box  span").html("￥"+jiaPrice*num+".00")
			$(this).parent().find(".num1box").css("display","block");
		}
		//商品单个删除按钮
		var $del = $(".remove");
		var $bodyShow = $(".bodyshow");
		var $delBox = $(".delbox");
		$del.click(function(){
			$bodyShow.css("display","block");
			$delBox.css("display","block");
			var that = $(this);
			$(".qd").click(function(){
				that.parent().parent().remove();
				$bodyShow.css("display","none");
				$delBox.css("display","none");
				for(var id in messageObj){
					
					if((that.parent().parent().attr("id") == id)){
						delete messageObj[id]
						
					}
				}
				var messStr = convertObjToCartStr(messageObj)
				setCookie("cart",messStr,7);
				if(messageObj){
					removeCookie("cart")
				}
				jzcart();
				console.log(decodeURIComponent(document.cookie))
			})
			$(".qx").click(function(){
				$bodyShow.css("display","none");
				$delBox.css("display","none");
			})
		})
		
		//全选删除按钮
		var $allDel = $(".alldel");
		$allDel.click(function(){
			$bodyShow.css("display","block");
			$delBox.css("display","block");
			var $that = $(this);
			$(".qd").click(function(){
				//遍历商品前面的复选框     如果被选中  则被删除
				
				if($that.parent().find("input").attr("checked")){
					removeCookie("cart");
					jzcart();
				}
				
				$bodyShow.css("display","none");
				$delBox.css("display","none");
				
			})
			$(".qx").click(function(){
				$bodyShow.css("display","none");
				$delBox.css("display","none");
			})
		})
		
		//点击去结算   判断是不是登录  如果登录  则去结算   没登录则登录框跳出
		var $set = $(".set");
		var $dlBox = $(".dlbox")
		$set.click(function(){
			var test1 = getCookie("test1") ? getCookie("test1") : "";
			if(test1){
				//如果是登录  还要判断所选商品是否大于库存   如果大于  提示库存不足
					//先判断该商品是不是选中   没选中则不结算该商品v
					var flag = 1;
					$.each($chose, function(i) {
					if($(this).attr("checked")){
						var $that = $(this)
						if($(this).parent().parent().find(".pro_num1 input").val() > $(this).parent().parent().attr("name")){
							$(this).parent().parent().find(".pro_num1").find(".num2box").css("display","block");
							$bodyShow.css("display","block");
							$moveBox.css("display","block").find("p:first-child").html($(this).parent().parent().find(".pro_name1 .name1_text").text()+"库存不足")
							setTimeout(function(){
								$that.parent().parent().find(".pro_num1").find(".num2box").css("display","none");
							},1000)
							//如果有一个库存不足  则flag--   
							flag --;
						}else{
							var cart1 =  getCookie("cart") ? getCookie("cart") : "";
							var id = $(this).parent().parent().attr("id");
							var cart1Num = $(this).parent().parent().find(".pro_num1 input").val();
								cart1Obj = convertCartStrToObj(cart1);
							for(var id1 in cart1Obj){
								if(id1 == id){
									cart1Obj[id1].num = cart1Num;
								}
							}
							cart1Str = convertObjToCartStr(cart1Obj);
							setCookie("cart",cart1Str,7);
							console.log(decodeURIComponent(document.cookie))
						}
					}
					
				});
				//如果flag为假   则证明有商品数量不足     不能跳转
				if(flag){
					location.href = "clear.html";
				}
				
			}else{
				$bodyShow.css("display","block");
				$dlBox.css("display","block");
				$dlBox.find(".dlbox1 a").click(function(){
					$bodyShow.css("display","none");
					$dlBox.css("display","none");
				})
			}
			
		})
		
		
		//移入收藏夹  按钮点击事件
		var $move = $(".move");
		var $moveBox = $(".moveBox");
		//点击确定按钮  则遮罩和提示框都消失
		$moveBox.find("button").click(function(){
			$bodyShow.css("display","none");
			$moveBox.css("display","none").find("p:first-child").html("");
		})
		$move.click(function(){
			favo();
		})
		//收藏夹点击事件
		$(".allFavo").click(function(){
			
			favo();
		})
		function favo(){
			var test1 = getCookie("test1") ? getCookie("test1") : "";
			if(test1){
				$bodyShow.css("display","block");
				$moveBox.css("display","block").find("p:first-child").html("收藏成功");
			}else{
				$bodyShow.css("display","block");
				$dlBox.css("display","block");
				$dlBox.find(".dlbox1 a").click(function(){
					$bodyShow.css("display","none");
					$dlBox.css("display","none");
				})
			}
		}
		//海外直邮按钮点击事件
		var $overSet = $(".overset");
		$overSet.click(function(){
			var test1 = getCookie("test1") ? getCookie("test1") : "";
			if(test1){
				$bodyShow.css("display","block");
				$moveBox.css("display","block").find("p:first-child").html("不存在选中的海外直邮的商品");
			}else{
				$bodyShow.css("display","block");
				$dlBox.css("display","block");
				$dlBox.find(".dlbox1 a").click(function(){
					$bodyShow.css("display","none");
					$dlBox.css("display","none");
				})
			}
		})
	}else{	//没有让空购物车出来
		$cart.css("display","block");
		$pro_list.css("display","none");
		$(".settle").css("display","none");
	}
	
	
	
		//登录框登录
	$(".dlBtn").click(function(){
		var user = $(".dluser input").val();
		var pwd = $(".dlpwd input").val();
		var users =  getCookie("test") ? getCookie("test") : "";
		users = strToObj(users);
		if(user in users){
			if(users[user] == pwd){
			//登录成功
				if($(".dlyz input").val() == eval($(".dlyz span").html())){
					$bodyShow.css("display","none");
					$dlBox.css("display","none");
					users = objToStr(users);
					if($(".dlzd input").attr("checked")){
						setCookie("test1",users,7);
					}
					setCookie("test1",users);
					$(".dlts").html("");
					$(".dl").html("hi"+user);
					$(".zhuxiao").html("<a href='../html/denglu.html'>注销</a>").find('a').css({"border-left":"1px solid #ccc","margin-left":"5px"});
					$(".zhuxiao a").click(function(){
					removeCookie("test1");
					
					})
				}else{
					$(".dlts").html("验证码不正确，请重新输入");
				}
			}else{
				//登录失败
			$(".dlts").html("您输入的密码不争取！请重新输入！");
			}
		}else{
			$(".dlts").html("您输入的用户名不存在，请先注册！");
		}
	})
	//点击验证码框改变算式
	$(".dlyz span").click(function(){
		sjss();
	})
	//算式验证码
	sjss();
	function sjss(){
		var ar = [0,1,2,3,4,5,6,7,8,9];
		var ar1 = ["+","-","*"]
		var num1 = ar[Math.floor(Math.random()*10)];
		var num2 = ar[Math.floor(Math.random()*10)];
		var fuhao = ar1[Math.floor(Math.random()*3)]
		$(".dlyz span").html( num1 + fuhao + num2);
		var sum = num1 + fuhao + num2;
			//验证码输入框失焦判断是否争取
		$(".dlyz input").blur(function(){
			if(!($(this).val() == eval(sum))){
				sjss();
			}
		})
	}
	
	var mUsers =  getCookie("test1") ? getCookie("test1") : "";
	mUsers = strToObj(mUsers);
	if(mUsers){
		//判断cookie中是否有东西
		for(var i in mUsers){
			$bodyShow.css("display","none");
			$dlBox.css("display","none");
			mUsers = objToStr(mUsers);
			$(".dl").html("hi"+i);
			$(".zhuxiao").html("<a href='../html/denglu.html'>注销</a>").find("a").css({"border-left":"1px solid #ccc","margin-left":"5px"});
			$(".zhuxiao a").click(function(){
				removeCookie("test1");
			})
		}
	}
	
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
				youhui : data[7],
				remain : data[8]
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
				cartStr += id + "," + obj[id].name + "," + obj[id].price + ","+obj[id].size+","+obj[id].color+"," + obj[id].num + "," + obj[id].src+","+obj[id].youhui + ","+obj[id].remain;
			}
			return cartStr;
	}
	
})