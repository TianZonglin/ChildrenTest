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
      $("#p1b_text").html("<span style='color:red'>"+$(this).children('option:selected').val()));  //弹出select的值
  });

  
});