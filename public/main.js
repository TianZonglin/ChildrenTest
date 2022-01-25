$(function(){
  
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
  
  //page 2
  $("#p1_button").click(function(){
    $("#p1_content").hide();
    $("#p2_content").show();
  });
  
  $("#p2_button").click(function(){
    $("#p2_content").hide();
    $("#p3_content").show();
  });

  $('#p5d').on('input propertychange',function() {
    let strInput = $(this).val();
    if(strInput === "1111111"){
      $("#p5d_text").html("<span style='color:green'>输入正确！5秒后自动跳转...</span>");  
      setTimeout(function(){
        $("#p3_content").hide();
        $("#p4_content").show();
        $("#p4_content").load('qltcs.html');

      },1000);
    }else if(strInput.length == 7){
      $("#p5d_text").html("<span style='color:red'>输入错误，请重新输入！</span>");  
    }
  });
  
  
});