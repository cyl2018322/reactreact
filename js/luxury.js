require(['../js/jquery','../js/cookie'],function(){
	
	
	//引入头部html
	$(".head").load("head.html");
	//引入way，list，footer的html
	$(".bott").load("waylistbottom.html")
	//引入banner
	$(".banner").load("banner.html")
	
	
	//引入侧边栏JS
	$.getScript("../js/rightside.js",function(){});
	
	//引入二级菜单js
	$.getScript("../js/ontwocaidan.js",function(){})
	
	
	
	
		
	$.getJSON("../js/shechipin.json",function(json){
		
		
		//轮播图
		var arr = json.lunbo;
		$.each(arr,function(index){
			$(".banner_list").append($("<li><a href='#'><img src='"+arr[index]+"'/></a></li>"))
			$(".banner_img p").append($("<span></span>"))
		});
		var index = 0;
		var timer = null;
		var $size = $(".banner_list li a img").size()
		now();
		function now(){
			
			$(".banner_list li a img").css("display","none").eq(index).fadeIn();            
			$(".banner_img p span").css("background","#d9d9d9").eq(index).css("background","#ff3344");
		}
		auto();
		$(".leftbtn").click(function(){
			index--;
			if(index <0){
				index = $size -1;  
			}
			now();
			auto();
		})
		$(".rightbtn").click(function(){
			index++;
			if(index > $size -1){
				index = 0;  
			}
			now();
			auto();
		})
		function auto(){
			var l = $(".banner_list li a img").size();
		
			clearInterval(timer);
			timer =  setInterval(function(){
				index++;
				if(index == l){
					index = 0;
				}
				now();
			},3000)	
		}
		$(".banner_list li a img").hover(function(){
			clearInterval(timer);
		},function(){
			auto();
		})
		$.each($(".banner_img p span"), function(i) {
			var n = i;
			$(this).hover(function(){
				index = n;
				now();
				clearInterval(timer)
			},function(){
				auto();
			})
		});
		
		
		
		//brand部分的数据获取
		var brand = json.brand;
		var brand_img = brand.brand_img;
		$.each(brand_img,function(i){
			$(".brand_img li img").eq(i).attr("src",brand_img[i]);
		})
		var brand_logo = brand.brand_logo;
		$.each(brand_logo, function(j) {
			$(".brand_logo a img").eq(j).attr("src",brand_logo[j]);
		});
		var brand_text = brand.brand_text;
		$.each(brand_text, function(k) {
			$(".brand_logo p  a:first-child").eq(k).html(brand_text[k]);
		});
		
		
		
		//special部分无缝轮播
		   //数据获取
		var special = json.special;
		
		
		$.each(special,function(i){
			var wflb = special[i].wflb;
			$(".special_main").append($("<ul class='special_pro'></ul>"));
			var wf_img = wflb.img;
			$.each(wf_img,function(j){
				$(".special_pro").eq(i).append("<li><a href='good.html'><img src='"+wf_img[j]+"'/></a></li>")
			})
			var wf_price = wflb.price;
			$.each(wf_price,function(k){
				$(".special_pro").eq(i).find("li").eq(k).append("<p class='pr1'><span class='fl'>"+ wf_price[k]+"</span><del class='fr'></del></p>")
			})
			var wf_del = wflb.del;
			$.each(wf_del, function(a) {
				$(".special_pro").eq(i).find("li del").eq(a).html(wf_del[a]);
			});
			var wf_text = wflb.text;
			$.each(wf_text, function(o) {
				$(".special_pro").eq(i).find("li").eq(o).append("<p class='pr2'>"+wf_text[o]+"</p>")
			});
		})
		
			//点击按钮淡入淡出
		var index1 = 0;
		var l = $(".special_pro").size();
		$(".sp_l").click(function(){
			index1--;
			if(index1 <= 0){
				index1 = l-1;
			}
			now1();
		})
		$(".sp_r").click(function(){
			index1++;
			if(index1 >= l-1){
				index1 = 0;
			}
			now1();
		})
		
		function now1(){
			$(".special_pro").css("display","none").eq(index1).fadeIn();
		}
		
		//clothing数据获取
		var special1 = json.special1;
		$.each(special1, function(i) {
			var l_img = special1[i].l_img;
			$(".prol img").attr("src",special1[i].l_img);
			var r_mess = special1[i].r_mess;
			var r_pro1img = r_mess.r_pro1img;
			$(".pror1 img").attr("src",r_pro1img);
			var r_pro2img = r_mess.r_pro2img;
			$.each(r_pro2img, function(j) {
				$(".pror").eq(i).find(".pror2_1 img").eq(j).attr("src",r_pro2img[j]);
			});
			var r_english = r_mess.r_english;
			$.each(r_english, function(a) {
				$(".pror").eq(i).find(".pror1_box p:first-child").eq(a).html(r_english[a]);
			});
			var r_text = r_mess.r_text;
			$.each(r_text,function(k){
				$(".pror").eq(i).find(".pror1_box p:nth-child(2)").eq(k).html(r_text[k]);
			})
			var r_price = r_mess.r_price;
			$.each(r_price,function(l){
				$(".pror").eq(i).find(".pror1_box p:last-child").eq(l).html( r_price[l]);
			})
		});
		
		
		//分页图片获取
	
		$(".fen_img1").css("display","none").eq(0).css("display","block")
		
		$(".m_fen a").hover(function(){
			$(".fen_img1").css("display","none").eq($(this).index()).css("display","block")
		})
	})	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

})
