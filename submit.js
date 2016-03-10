$("#submit button").click(function(){
	var postModel = [];
	var num = 0;
	var bpost = true;
	var limit1 = 0;
	var limit2 = 0;
	var limit3 = 0;

    //开始【德】检查
	for (var n = 0;n<$(".mo").length;n++){
        switch ($(".mo:eq("+n+")").val()){
            case '优':
                limit1++;
                break;
            case '良':
                limit2++;
                break;
            case '差':
                limit3++;
                break;
        }
	};

	if (limit1>$("tr[status='正常']").length*0.17) {
		alert("【德】这个选项选的【优】太多了！");
		bpost = false;
	};
	if ($("tr[status='正常']").length*0.60>limit2 ) {
		alert("【德】这个选项选的【良】太少了！");
		bpost = false;
	};
	if (limit2>$("tr[status='正常']").length*0.74) {
		alert("【德】这个选项选的【良】太多了！");
		bpost = false;
	};
	if ($("tr[status='正常']").length*0.09>limit3 ) {
		alert("【德】这个选项选的【差】太少了！");
		bpost = false;
	};
	if (limit3>$("tr[status='正常']").length*0.23) {
		alert("【德】这个选项选的【差】太多了！");
		bpost = false;
	};

    //开始【体】检查
	limit1=limit2=limit3=0;
	for (var n = 0;n<$(".pe").length;n++){
		switch ($(".pe:eq("+n+")").val()){
			case '优':
				limit1++;
			    break;
			case '良':
				limit2++;
			    break;
			case '差':
				limit3++;
			    break;
		}
	};
		if (limit1>$("tr[status='正常']").length*0.17) {
			alert("【体】这个选项选的【优】太多了！");
			bpost = false;
		};
		if ($("tr[status='正常']").length*0.60>limit2 ) {
			alert("【体】这个选项选的【良】太少了！");
			bpost = false;
		};
		if (limit2>$("tr[status='正常']").length*0.74) {
			alert("【体】这个选项选的【良】太多了！");
			bpost = false;
		};
		if ($("tr[status='正常']").length*0.09>limit3 ) {
			alert("【体】这个选项选的【差】太少了！");
			bpost = false;
		};
		if (limit3>$("tr[status='正常']").length*0.23) {
			alert("【体】这个选项选的【差】太多了！");
			bpost = false;
		};

    //开始【能】检查
	limit1=limit2=limit3=0;
	for (var n = 0;n<$(".ab").length;n++){
		switch ($(".ab:eq("+n+")").val()){
			case '优':
				limit1++;
			break;
			case '良':
				limit2++;
			break;
			case '差':
				limit3++;
			break;
		}
	   };
		if (limit1>$("tr[status='正常']").length*0.17) {
			alert("【能】这个选项选的【优】太多了！");
			bpost = false;
		};
		if ($("tr[status='正常']").length*0.60>limit2 ) {
			alert("【能】这个选项选的【良】太少了！");
			bpost = false;
		};
		if (limit2>$("tr[status='正常']").length*0.74) {
			alert("【能】这个选项选的【良】太多了！");
			bpost = false;
		};
		if ($("tr[status='正常']").length*0.09>limit3 ) {
			alert("【能】这个选项选的【差】太少了！");
			bpost = false;
		};
		if (limit3>$("tr[status='正常']").length*0.23) {
			alert("【能】这个选项选的【差】太多了！");
			bpost = false;
		};

        //创建JSON构造器
		function resultJSON(i){
            postModel.push({
                assessee_no:$("tr:eq("+i+") td:eq(0)").text(),
                morality:$("tr:eq("+i+") td:eq(3) select").val(),
                pe: $("tr:eq("+i+") td:eq(4) select").val(),
                ability: $("tr:eq("+i+") td:eq(5) select").val()
            })
		};

        //检查未填写项目并用红色标出
		function check(){
            $("select").each(function(){
                if ($(this).val()!='') {
                    $(this).closest("tr").attr("class","defaul");
                    num = num;
                } else {
                    $(this).closest("tr").attr("class","danger");
                    num++;
                };
            });
		    return num;
		};

        //检查无误即可ajax提交
		if (check()==0) {   //检查是否全部填写
            //创建JSON实例
			for (var i=1;i<$("tr").length;i++){
				resultJSON(i);
				};
			if (bpost=true) {   //检查【德】、【体】、【能】数目是否符合标准
				$.ajax({
			        url: "/api/post_assessment",
			        type: "POST",
			        dataType: "json",
			        data: {
			        	assessor_no:$("#stuNum span").text() ,
						judgements:postModel
					},
			        contentType: "application/json; charset=utf-8",
			        success: function (json) {
			        	if (json.code == 200) {
			        		alert("提交成功！");
			        	}else{
			        		alert('提交失败，请重试！');
			        	}
			        }
					
				});
			};	
		}
		else{   //若没有填写完整，则提示
			alert("请填写完整！");
		};
})

