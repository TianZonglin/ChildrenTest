$(function(){
  
  let oString = "";
  function checkOrder(str){
    oString += str;
    console.log(oString);
    if(oString.length == 4 && oString === "健康是福"){
      $("#p1a_text").html("<span style='color:green'>回答正确！</span>");
      oString = "";
    }else if(oString.length == 4){
      $("#p1a_text").html("<span style='color:red'>回答错误，请重新点击！</span>");
      $(".p1a").removeClass("disabled");
      oString = "";
    }
    //alert($(this).val());
  }
  
  
  $(".p1a").click(function(){$(this).addClass("disabled");checkOrder($(this).val())});
  $('#p1b').change(function(){
    let vle = $(this).children('option:selected').val();
    if(vle === "18"){
      $("#p1b_text").html("<span style='color:green'>回答正确！</span>");  
      $(this).addClass("disabled");
    }else{
      $("#p1b_text").html("<span style='color:red'>您选择的是 "+vle+"，请重新选择！</span>");  
    }
  });

  $('#p1c').on('input propertychange',function() {
    let strInput = $(this).val();
    if(strInput === "6752"){
      $("#p1c_text").html("<span style='color:green'>输入正确！</span>");  
      $(this).addClass("disabled");
    }else if(strInput.length == 4){
      $("#p1c_text").html("<span style='color:red'>输入错误，请重新输入！</span>");  
    }
  });

  $('#p1d').on('input propertychange',function() {
    let strInput = $(this).val();
    if(strInput === "ENGLISH"){
      $("#p1d_text").html("<span style='color:green'>输入正确！</span>");  
      $(this).addClass("disabled");
    }else if(strInput.length == 7){
      $("#p1d_text").html("<span style='color:red'>输入错误，请重新输入！</span>");  
    }
  });
  
});