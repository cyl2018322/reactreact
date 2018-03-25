
	
	require(['js/jquery','js/ontwocaidan','js/jquery.cookie'],function(){
		//头部大图
		(function(){
			$.getJSON("js/index.json",function(json){
				$(".head_search_banner a").append($("<img>").attr("src",json.head_img));
			})
		})()
		//搜索关键词获取
		
	})
	


