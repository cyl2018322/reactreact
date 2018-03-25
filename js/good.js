require(['../js/jquery','../js/cookie'],function(){
	//引入头部html
	$(".head").load("head.html");
	//引入way，list，footer的html
	$(".bott").load("waylistbottom.html")
	
	//引入飞入购物车
	$.getScript("../js/jquery.fly.js",function(){})
	//引入侧边栏JS
	$.getScript("../js/rightside.js",function(){})
	
	//引入二级菜单js
	$.getScript("../js/ontwocaidan.js",function(){})
	
	//获取详情页数据
	$.getJSON("../js/xiangqing.json",function(json){
		var pro = json[111];
		//获取分类信息
		var pro_sort = pro.pro_sort;
		$.each(pro_sort, function(i) {
			$(".pro_top .sort").eq(i).html(pro_sort[i]);
		});
		//商品英文名
		var pro_EngName = pro.pro_EngName;
		$(".pro_top a").eq(4).html(pro_EngName);
		$(".pro_choose1 span").eq(0).html(pro_EngName);
		//商品名字
		var pro_name = pro.pro_name;
		$(".pro_top a").eq(5).html(pro_name);
		$(".pro_choose1 span").eq(1).html(pro_name);
		$(".pre_r_main1 dd").eq(0).find("span").html(pro_name);
		//商品信息
		var pro_messimg = pro.pro_messimg;
		$.each(pro_messimg, function(i) {
			$(".pro_messimg").append($("<li><img  src='"+ pro_messimg[i]+"'/></li>"));
		});
		//商品图片
		var pro_rimg = pro.pro_rimg;
		$.each(pro_rimg, function(i) {
			$(".pro_bigimg").append($("<li><img  src='"+ pro_rimg[i]+"'/></li>"));
			$(".pro_rimg ").append($("<li><img  src='"+ pro_rimg[i]+"'/></li>"))
		});
		//商品价格
		var pro_price = pro.pro_price;
		$(".pro_choose_price span").html(pro_price);
		$(".pro_cuxiao i").html(pro_price);
		//商品过期价格
		var pro_guoqi = pro.pro_guoqi;
		$(".pro_choose_price del").html(pro_guoqi);
		//商品颜色
		var color = pro.color;
		$.each(color,function(i){
			$(".pro_mess_color").eq(i).append($("<a href='javascript:;'><div class='pro_color'>"+color[i] +"<em></em></div></a>"));
			
		})
		//商品型号
		var size = pro.size;
		var prosize =$(" .mess_size  .pro_color")
		$.each(size, function(i) {
			$(" .mess_size  .pro_color").eq(i).append("<em></em>").css({"color":"#333","border":"1px solid #ccc"})
			$.each(prosize,function(k){
				if(k > i){
					prosize.css("cursor","pointer").eq(k).css("cursor","not-allowed")
				}
			})
		});
		//商品剩余数量
		var pro_shengyu = pro.pro_shengyu;
		$(".cart1 .shengyu").html("剩余"+pro_shengyu+"件");
			//商品编号	
		var bianhao = pro.bianhao;
		$(".pro_r2 .bianhao").html(bianhao);
		//商品货号
		var huohao = pro.huohao;
		$(".pro_r2 .huohao").html(huohao);
		
		var bianhao1 = pro.bianhao1;
		$(".pre_r_main1 dd").eq(1).find("span").html(bianhao1);
		//上架时间
		var time = pro.time;
		$(".pre_r_main1 dd").eq(2).find("span").html(time);
		//重量
		var kg = pro.kg;
		$(".pre_r_main1 dd").eq(3).find("span").html(kg);
		//热卖商品
		var hot = pro.hot;
		$.each(hot, function(i) {
			$(".present_l_img ").append($("<li><img /><p class='present_l_text'></p><p class='present_l_price'></p></li>"))
			var hot1_img = hot[i].hot1_img; 
			$(".present_l_img li").eq(i).find("img").attr("src", hot1_img);
			var hot1_text = hot[i].hot1_text;
			$(".present_l_img .present_l_text").eq(i).html(hot1_text);
			var hot1_price = hot[i].hot1_price;
			$(".present_l_img .present_l_price").eq(i).html(hot1_price);
		});
		
		var pro_mess_img = pro.pro_mess_img;
		$.each(pro_mess_img, function(i) {
			$(".pre_r_main2").append($("<p><img src='"+ pro_mess_img[i]+"'/></p>"))
		});
		
		
		
		
	
		//左边ul滑动效果
		$(".pro_messimg").css("height",pro_messimg.length*69);
		var pro_mess_index = 0;
		//移入哪张显示哪张
		$(".pro_messimg li").hover(function(){
			pro_mess_index = $(this).index();
			now();
		})
		//当前状态
		now();
		function now(){
			$(".pro_rimg li").css("display","none").eq(pro_mess_index).css("display","block");
			$(".pro_bigimg li").css("display","none").eq(pro_mess_index).css("display","block");
			if(pro_mess_index == 0){
				$(".pro_messimg").css("top",0);
			}else if(pro_mess_index == pro_messimg.length){
				$(".pro_messimg").css("top",-(pro_messimg.length-5)*69);
			}else if(pro_mess_index > 5){
				$(".pro_messimg").css("top",-(pro_mess_index -5)*69);
			}
			
			
		}
		//上按钮点击
		$(".topbtn").click(function(){
			pro_mess_index --;
			if(pro_mess_index <=0){
				pro_mess_index = 0;
			}
			now();
		})
		//下按钮点击
		$(".botbtn").click(function(){
			pro_mess_index ++;
			if(pro_mess_index >=pro_messimg.length-1 ){
				pro_mess_index =pro_messimg.length-1 ;
			}
			now();
		})
		//放大镜效果
		var $zhezhao = $('.zhezhao');
		var $mark = $(".mark");
		var $smallimg = $(".pro_rimg ");
		var $bigimg = $(".pro_bigimg li");
		$zhezhao.mouseover(function(){
			$mark.css("display","block");
			$(".pro_bigimg").css("display","block");
			$zhezhao.mousemove(function(evt){
				var e = evt || window.event;
				var l = e.offsetX - $mark.outerWidth()/2;
				var t = e.offsetY - $mark.outerHeight()/2;
				if(l < 0){
					l = 0;
				}else if(l > $zhezhao.outerWidth()- $mark.outerWidth()){
					l = $zhezhao.outerWidth()- $mark.outerWidth() ;
				}
				if(t < 0){
					t = 0;
				}else if(t > $zhezhao.outerHeight()- $mark.outerHeight()){
					t = $zhezhao.outerHeight()- $mark.outerHeight() ;
				}
				$mark.css({"left":l+"px","top":t+"px"})
				var preX = l / ($zhezhao.outerWidth()- $mark.outerWidth());
				var preY = t /($zhezhao.outerHeight() - $mark.outerHeight());
				$(".pro_bigimg img").css({"left":- preX *($(".pro_bigimg img").width() -$(".pro_bigimg").width()),"top":-preY*($(".pro_bigimg img").height() -$(".pro_bigimg").height())})
			})
		})
		$zhezhao.mouseout(function(){
			$mark.css("display","none");
			$(".pro_bigimg").css("display","none");
		})
		
		//颜色选项
		var $color = $(".mess_color a");
		var color_index = 0;
		$color.eq(0).find("em").attr("name","1").css("display","block");
		$color.click(function(){
			color_index = $(this).index()-1;
			$color.find("em").attr("name","0").css("display","none")
			$(this).find("em").css("display","block");
			$(this).find("em").attr("name","1");
		})
		
		//尺码选择
		var $size = $(".mess_size a ");
		var size_index = 2;
		$size.eq(2).find("em").attr("name","1").css("display","block");
		$(".mess_size a").click(function(){
			size_index = $(this).index()-1;
			$size.find("em").attr("name","0").css("display","none");
			$(this).find("em").attr("name","1").css("display","block");
			
		})
	
		
		//数量加减
		var $jia = $(".jia");
		var $jian = $(".jian");
		var num = 1;
		//jia
		$jia.click(function(){
			num++;
			$(".num").val(num);
		})
		
		//jian 
		$jian.click(function(){
			num--;
			 if(num <=1 ){
			 	num=1;
			 }
			 $(".num").val(num);
		})
		
		
		
		//fenye
		$(".present_r_top span").click(function(){
			$(".pre_fen").css("display","none").eq($(this).index()).css("display","block");
			$(".present_r_top span").css({"border":"none","background":"#fafafa"}).eq($(this).index()).css({"border-top":"1px solid #f00","background":"#fff"});
			$(document).scrollTop( $(".present").offset().top+10);
		})
		
		$(document).scroll(function(){
			
		
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if(scrollTop > $(".present").offset().top){
				$(".present_r_top").css({"position":"fixed","top":"0"})
				$(".present_r_top p").css("display",'block');
				var arr = $(".mess_color .pro_color em");
				$(".present_r_top p a:first-child").html(pro_name);
				$.each(arr, function(k) {
					if($(this).attr("name") == 1){
						$(".present_r_top p i").html($(this).parent().text());
					}
				});
				var arr1 = $(".mess_size .pro_color em");
				$.each(arr1, function(k) {
					if($(this).attr("name") == 1){
						$(".present_r_top p i").append("/"+$(this).parent().text());
					}
				});
			}else if(scrollTop < $(".present").offset().top){
				$(".present_r_top").css({"position":"relative","top":"0"})
				$(".present_r_top p").css("display",'none');
			}
		}) 
		
		
		//购物车
		//商品优惠价格
		var pro_youhui  = pro.pro_youhui;
		
		
		//给加入购物车按钮添加点击事件
		$(".cartbtn").click(function(e){
			var proId = bianhao1;
			var proName = pro_name;
			var proPrice = pro_price;
			var proYouhui =pro_youhui;
			var proRemain = pro_shengyu;
			var proSize = $size.eq(size_index).find(".pro_color").text();
			var proColor = $color.eq(color_index).find(".pro_color").text();
			var proSrc = pro_rimg[0];
			var proNum = $(".num").val()
			//如果cookie中没有信息会返回一个undefined ,我所须是一个字符串类型的数据，所以将它转成一个“”空字符串。保持数据类型一致。
			var cartStr = getCookie("cart") ? getCookie("cart") : "";
			//将字符串转成对象
			var cartObj = convertCartStrToObj(cartStr); 
			if(proId in cartObj){
				//如果已存在，那么该商品的数量加1
				cartObj[proId].num += eval(proNum);
			}else{
				//如果不存在，那么将新商品的信息存入
				cartObj[proId] = {
					name : proName,
					price : proPrice,
					size : proSize,
					color : proColor,
					num : proNum,
					src : proSrc,
					youhui : proYouhui,
					remain : proRemain
				};
				
			}
			console.log(cartObj)
			//将新的购物车信息存回cookie
			//将对象转为字符串
			cartStr = convertObjToCartStr(cartObj);
			console.log(cartStr)
			//存入cookie
			setCookie("cart",cartStr,7);
			console.log(decodeURIComponent(document.cookie))
			//飞入购物che
			var cloneImg = $(".pro_rimg li").eq(0).find("img").clone().css({width:50,height:50});
			cloneImg.fly({
				start : {
					top : e.clientY,
					left : e.clientX
				},
				end :{
					top : $(".buy").offset().top-$(document).scrollTop(),
					left : $(".buy").offset().left,
					width:0,
					height:0
				},
				autoPlay : true,
				onEnd : function(){
					$(".buy").html(function(index,v){
				//"购物车（0）"
				var pattern = /(\d+)/;
				var num = parseInt(v.match(pattern)[1]);
				return  num + eval(proNum);
			});
				cloneImg.remove();
				}
			})
		})
		
		
		//导航栏的简易购物车
		//判断购物车中是否有商品
		
		
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