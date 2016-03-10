function getInfo(){
	var comNum;
	var rate;
	var starttime = new Date().getTime();
	var currentTime = new Date().getTime();
	var endtime = starttime+($("#testTime").val())*60*1000;

	function createJsonData1(){
		var json = {
			class:$("#ordClass").val(),
			available:true,
			start_time:starttime,
			end_time:endtime

		};
		return json;
	}

	function createJsonData2(){
		var json = {
			counsellor:$("#teaNum").text(),
    		class: $("#ordClass").val()
		};
		return json;
	}
	$.ajax({
		url: "/api/set_judgement",
		type: "POST",
		dataType: "json",
		data: JSON.stringify(createJsonData1()),
		contentType: "application/json; charset=utf-8",
        success:function(json,status) {
            if (status == '设置成功') {
                var data = JSON.parse(json);
                for (var i = 0;i<data.stu_grades.length;i++){
                    genScore1 = (data.stu_grades[i].morality.great*95+data.stu_grades[i].morality.good*85+data.stu_grades[i].morality.bad*70) % data.length;
                    genScore2 = (data.stu_grades[i].pe.great*95+data.stu_grades[i].pe.good*85+data.stu_grades[i].pe.bad*70) % data.length;
                    genScore3 = (data.stu_grades[i].ability.great*95+data.stu_grades[i].ability.good*85+data.stu_grades[i].ability.bad*70) % data.length;
                    $("tr:eq(i+1)").html(
                        '<td>'+data.stu_grades[i].stu_no+'</td>'+
                        '<td>'+data.stu_grades[i].name+'</td>'+
                        '<td>'+data.stu_grades[i].morality.great+'&nbsp'+data.stu_grades[i].morality.good+'&nbsp'+data.stu_grades[i].morality.bad+'</td>'+
                        '<td>'+data.stu_grades[i].pe.great+'&nbsp'+data.stu_grades[i].pe.good+'&nbsp'+data.stu_grades[i].pe.bad+'</td>'+
                        '<td>'+data.stu_grades[i].ability.great+'&nbsp'+data.stu_grades[i].ability.good+'&nbsp'+data.stu_grades[i].ability.bad+'</td>'+
                        '<td>'+genScore1+'&nbsp'+genScore2+'&nbsp'+genScore3+'</td>'
                        )
                    if (data.stu_grades[i].status=='正常') {
                        $("tr:eq(i+1)").attr("class","default");
                        comNum++;
                    } else {
                        $("tr:eq(i+1)").attr("class","danger");
                    }

                }
            }else{
                alert('请求失败，请重新点击按钮！')
            };
        var rate = comNum % data.length;
        $("#rate").attr("aria-valuenow",rate);
        $("#rate").text(rate+"%");
        if (data.s_assessing) {
            $("#status").text('正在评测中...');
        } else {
            $("status").text('评测已结束或未开启')
        };
        var remainTime = (data.end_time-currentTime) / 1000 % 60;
        $("#remainTime").text(remainTime);
        }
    })
}
function consult(){
	var comNum;
	var rate;
	var currentTime = new Date().getTime();
	$.ajax({
		url: '/api/class_overview',
		type: 'POST',
		dataType: 'json',
		data:JSON.stringify(createJsonData2()),
        success:
            function(json){
                var data = JSON.parse(json);
                for (var i = 0;i<data.stu_grades.length;i++){
                    genScore1 = (data.stu_grades[i].morality.great*95+data.stu_grades[i].morality.good*85+data.stu_grades[i].morality.bad*70) % data.length;
                    genScore2 = (data.stu_grades[i].pe.great*95+data.stu_grades[i].pe.good*85+data.stu_grades[i].pe.bad*70) % data.length;
                    genScore3 = (data.stu_grades[i].ability.great*95+data.stu_grades[i].ability.good*85+data.stu_grades[i].ability.bad*70) % data.length;
                    $("tr:eq(i+1)").html(
                        '<td>'+data.stu_grades[i].stu_no+'</td>'+
                        '<td>'+data.stu_grades[i].name+'</td>'+
                        '<td>'+data.stu_grades[i].morality.great+'&nbsp'+data.stu_grades[i].morality.good+'&nbsp'+data.stu_grades[i].morality.bad+'</td>'+
                        '<td>'+data.stu_grades[i].pe.great+'&nbsp'+data.stu_grades[i].pe.good+'&nbsp'+data.stu_grades[i].pe.bad+'</td>'+
                        '<td>'+data.stu_grades[i].ability.great+'&nbsp'+data.stu_grades[i].ability.good+'&nbsp'+data.stu_grades[i].ability.bad+'</td>'+
                        '<td>'+genScore1+'&nbsp'+genScore2+'&nbsp'+genScore3+'</td>'
                        )
                    if (data.stu_grades[i].status=='正常') {
                        $("tr:eq(i+1)").attr("class","default");
                        comNum++;
                    } else {
                        $("tr:eq(i+1)").attr("class","danger");
                    }

                }
                var rate = comNum % data.length;
                $("#rate").attr("aria-valuenow",rate);
                $("#rate").text(rate+"%");
                if (data.s_assessing) {
                    $("#status").text('正在评测中...');
                } else {
                    $("status").text('评测已结束或未开启')
                };
                var remainTime = (data.end_time-currentTime) / 1000 % 60;
                $("#remainTime").text(remainTime);
            }
    })
}

function endInfo(){
	$.post("/api/set_judgement",{
	class:$("#ordClass").val() ,
    available: false,
    start_time:0 ,
    end_time: 0
	})
}


$("#startBtn").click(function(){
	getInfo();
});

$("#endBtn").click(function(){
	endInfo();
	consult();
});
$("#makeXls button").click(function(){
	$("#result").tableExport({type:'excel', separator:';', escape:'false'});
});

$("#ordClass").change(function(){
	consult();
});


