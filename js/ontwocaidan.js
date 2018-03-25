(function(){
	//二级菜单
	$.getJSON("../js/index.json",function(json){ //获取json
		var arr = json.sidebar_onenav; //一级菜单
		var list = json.sidebar_twonav; //二级菜单
		
		//一级菜单
		$.each(arr,function(index){
			$(".sidebar_onenav").append($("<dl><dt></dt><dd></dd></dl>"));
			$(".sidebar_onenav dl").eq(index).append($("<div class='sidebar_twonav'></div>"))
			var arr1 = arr[index].kind;
			var i = index;
			$.each(arr1,function(index){
				if(index == 0){
					$(".sidebar_onenav dt").eq(i).append($("<a href='#'>"+arr1[0]+ "</a>"));
				}else{
					$(".sidebar_onenav dd").eq(i).append($("<a href='#'>"+arr1[index]+ "</a>"));
				}
			});
			
		})
		//二级产品菜单
		$.each(list,function(index){
			var list1 = list[index].pro; //二级产品菜单
			$(".sidebar_twonav").eq(index).append($("<div class='sidebar_twonav_one'><ul></ul></div>"));
			var i = index;
			$.each(list1,function(index){
				var list2 = list1[index].kind1;
				var a = index;
				$(".sidebar_twonav").eq(i).find("ul").append($("<li><h5></h5><p></p></li>"))
				$.each(list2, function(index) {
					if(index == 0){
						$(".sidebar_twonav").eq(i).find(" ul").find("li").eq(a).find("h5").append($("<a href='#'>" +list2[0] +"</a>"));
					}else{
						$(".sidebar_twonav").eq(i).find(" ul").find("li").eq(a).find("p").append($("<a href='#'>" +list2[index] +"</a>"));
					}
				});
			});
		})
		
	})
	
	
	
		
	$.getJSON("../js/shechipin.json",function(json){
		//头部大图获取
		$(".head_search_banner a").append($("<img>").attr("src",json.head_img));
		
		
		//搜索框关键字获取
		var search_text = json.search;
		$.each(search_text,function(index){
			$(".search_i nav").append($("<a href='#'>" +search_text[index] + "</a>"));
		})
		var $search = $(".search_inp input");
		var $search_bot_bor = $(".search_bot_bor")
		$search.focus(function(){
				$(this).val("");
				$search_bot_bor.fadeIn().animate({"height":"2px"},100)
			});
			//console.log($(".search_i nav  a").eq(0).text())
			$search.blur(function(){
				
			$(this).val($(".search_i nav  a").eq(0).text());
			$search_bot_bor.animate({"height":0},100).fadeOut()
		})
		
		
		//二级logo菜单
		var logo = json.side_logo;
		$.each(logo,function(index){
			
			var logo1 = logo[index].logo;
			$(".sidebar_twonav").eq(index).append($("<div class='sidebar_twonav_bot'></div>"));
			var b = index;
			$.each(logo1,function(index){
				$(".sidebar_twonav").eq(b).find(".sidebar_twonav_bot").append($("<a href='#'><img src ='" +logo1[index] +"'></a>"));
			})
		})
	})
})()














	