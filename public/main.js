$(function(){
  
  let oString = "";
  function checkOrder(str){
    oString += str;
    console.log(oString);
    if(oString.length == 4 && oString === "健康是福"){
      $("#p1a_text").html("<span>回答正确！</span>");
    }else{
      
    }
    //alert($(this).val());
  }
  
  
  $(".p1a").click(function(){$(this).addClass("disabled");checkOrder($(this).val())});
 

  
});