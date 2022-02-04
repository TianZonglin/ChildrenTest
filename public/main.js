$(function(){
  
  $("#version").html(new Date().toString().substring(4,15).replaceAll(" ",".").replaceAll("Feb","2").replaceAll("Mar","3"));
  
  let oString = "";
  let oPage = 0;
  function checkOrder(str){
    oString += str;
    if(oString.length == 4 && oString === "健康是福"){
      $("#p1a_text").html("<span style='color:green'>回答正确！</span>");
      oString = "";
      checkPage(1);
    }else if(oString.length == 4){
      $("#p1a_text").html("<span style='color:red'>回答错误，请重新点击！</span>");
      $(".p1a").removeClass("disabled");
      oString = "";
    }
    //alert($(this).val());
  }
  
  function checkPage(rst){
    oPage += rst;
    if(oPage == 4){
      $("#p1_text").css("visibility","visible");
      $("#p1_button").css("visibility","visible");
      oPage = 0;
    }
    //alert($(this).val());
  }
  
  $(".p1a").click(function(){
    $(this).addClass("disabled");
    checkOrder($(this).val());
    
  });
  $('#p1b').change(function(){
    let vle = $(this).children('option:selected').val();
    if(vle === "18"){
      $("#p1b_text").html("<span style='color:green'>回答正确！</span>");  
      $(this).addClass("disabled");
      checkPage(1);
    }else{
      $("#p1b_text").html("<span style='color:red'>您选择的是 "+vle+"，请重新选择！</span>");  
    }
  });

  $('#p1c').on('input propertychange',function() {
    let strInput = $(this).val();
    if(strInput === "6752"){
      $("#p1c_text").html("<span style='color:green'>输入正确！</span>");  
      $(this).addClass("disabled");
      checkPage(1);
    }else if(strInput.length == 4){
      $("#p1c_text").html("<span style='color:red'>输入错误，请重新输入！</span>");  
    }
  });

  $('#p1d').on('input propertychange',function() {
    let strInput = $(this).val();
    if(strInput === "ENGLISH"){
      $("#p1d_text").html("<span style='color:green'>输入正确！</span>");  
      $(this).addClass("disabled");
      checkPage(1);
    }else if(strInput.length == 7){
      $("#p1d_text").html("<span style='color:red'>输入错误，请重新输入！</span>");  
    }
  });
  
  //page 3
  //$("#p1_button").click(function(){
  //  $("#p1_content").hide();
  //  $("#p3_content").show();
  //});
  
  $("#p1_button").click(function(){
    $("#p1_content").hide();
    $("#p3_content").show();
    setTimeout(() => window.scrollTo(0,0), 150);
  });
  
  
  
  $("#p3_button").click(function(){
    $("#p3_content").hide();
    $("#p4_content").show();
    setTimeout(() => window.scrollTo(0,0), 150);
  });

   //page 4
  $('#p4d').on('input propertychange',function() {
    let strInput = $(this).val();
    if(strInput === "1111111"){
      $("#p4d_text").html("<span style='color:green'>输入正确！5秒后自动跳转...</span>");  
      setTimeout(function(){
        $("#p4_content").hide();
        $("#p6_content").show();
  
      },1000);
    }else if(strInput.length == 7){
      $("#p4d_text").html("<span style='color:red'>输入错误，请重新输入！</span>");  
    }
  });
 
  //page 7
  $("#p6d").click(function(){
    $("#p6_content").hide();
    $("#p7_content").show();
    setTimeout(() => window.scrollTo(0,0), 150);
    //$("#p8_content").load('intro.html');

  });
  
    //page 8
  $("#p7d").click(function(){
    $("#p7_content").hide();
    $("#p8-21").show();
     window.onbeforeunload = function(){document.body.scrollTop = 0;} 
    $("#p8-21").load('intro.html');
     window.onbeforeunload = function(){document.body.scrollTop = 0;} 
  });
});