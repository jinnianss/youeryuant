var fanhui = $("header span")[0];
fanhui.onclick= function () {
    //console.log(fanhui);
    top.location = "index.html";
};
$("#buttontijiao").click(function () {
    //console.log($(".radio-inline input"))
    if (!$(".radio-inline input").is(":checked")) {
        alert("什么假未选择");
        return;
    }

    var vaule = $("#appDate").val();
    //console.log(vaule);



    starttime =vaule;
    starttime = starttime.replace(new RegExp("-","gm"),"/");
    var inputvalue1 = (new Date(starttime)).getTime();

    //console.log(starttimeHaoMiao);
    //(new Date((new Date().toLocaleDateString()).getTime());
    var nowdate = (new Date(new Date().toLocaleDateString())).getTime();
    //console.log(nowdate);
    //console.log(oldTime);
    if(inputvalue1 < nowdate){
        alert("请假起始时间小于今天");
        $("#appDate").val("");
        return;
    }


    var vaule1 = $("#appDate1").val();
    //console.log(vaule);

    if(vaule =="" || vaule1 ==""){
        alert("日期不能为空");
        return;
    }

    starttime1 =vaule1;
    starttime1 = starttime1.replace(new RegExp("-","gm"),"/");
    var inputvalue2 = (new Date(starttime1)).getTime();

    if(inputvalue2 < inputvalue1){
        alert("请假结束日期不能小于起始日期");
        $("#appDate1").val("");
        return;
    }

       $( "#form").submit();
})


//日期相差天数

function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays
    aDate  =  sDate1.split("-")
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2002格式
    aDate  =  sDate2.split("-")
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
    return  iDays
}
//var s1 = "2010-12-10";
//var s2 = "2010-12-15";
//alert(DateDiff(s1,s2));


$(function () {
        $.ajax({
            type: 'post',
            url: 'json/qingjiajilu.json',

            dataType: 'json', //很重要!!!.预期服务器返回的数据类型 , */
            success: function (data) {

/*"yuanyin":"事假",
 "startTime":"2017-4-8",
 "endTime":"2017-5-5",
 "check":"未通过",
 "content":"*/
                $(data.qingjiaList).each(function (index, value) {

                    //console.log(this.startTime);
                    /*<ul class="ul-list" id="ul-list">
                     <li>
                     <div class="riqihao">14-12-12号</div>
                     <span>病假</span>
                     <span>3天</span>
                     <span>未通过</span>
                     <div class="yuanyin">因朋友结婚，需前去随礼，还望领导批准！</div>
                     </li>*/

                    var daycha = DateDiff(this.startTime,this.endTime);
                    var li = $("<li>" +
                        "<div class='riqihao'>"+this.startTime+"号</div>" +
                        "<span>"+this.yuanyin+"</span>" +
                        "<span>"+daycha+"</span>" +
                        "<span>"+this.check+"</span>" +
                    "<div class='yuanyin'>"+this.content+"</div>"+


                    "</li>");
                    $("#ul-list").prepend(li);
                })


                var div = $("<div class='jiazai' id='jiazai'>点击加载更多...</div>")

                if(data.hasMore) {

                    div.click(function () {

                        var that = this;

                        $.ajax({
                            type: 'post',
                            url: 'json/qingjiajilu.json',

                            dataType: 'json', //很重要!!!.预期服务器返回的数据类型 , */
                            success: function (data) {

                                /*"yuanyin":"事假",
                                 "startTime":"2017-4-8",
                                 "endTime":"2017-5-5",
                                 "check":"未通过",
                                 "content":"*/
                                $(data.qingjiaList).each(function (index, value) {

                                    //console.log(this.startTime);
                                    /*<ul class="ul-list" id="ul-list">
                                     <li>
                                     <div class="riqihao">14-12-12号</div>
                                     <span>病假</span>
                                     <span>3天</span>
                                     <span>未通过</span>
                                     <div class="yuanyin">因朋友结婚，需前去随礼，还望领导批准！</div>
                                     </li>*/

                                    var daycha = DateDiff(this.startTime,this.endTime);
                                    var li = $("<li>" +
                                        "<div class='riqihao'>"+this.startTime+"号</div>" +
                                        "<span>"+this.yuanyin+"</span>" +
                                        "<span>"+daycha+"</span>" +
                                        "<span>"+this.check+"</span>" +
                                        "<div class='yuanyin'>"+this.content+"</div>"+


                                        "</li>");
                                    $("#ul-list").append(li,that);
                                })



                            },
                            error: function () {
                                alert("error occured!!!");
                            }

                        });





                    })
                }
                else{
                    div.html("没有了...");
                }

                $("#ul-list").append(div);


                        },
            error: function () {
                alert("error occured!!!");
            }

        });

    }
)
