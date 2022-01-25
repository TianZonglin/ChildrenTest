$(function(){
  
  let oString = null;
  function checkOrder(){
     console.log(this);
    //alert($(this).val());
  }
  
  
  $(".p1a").click(function(){$(this).addClass("disabled");checkOrder()});
 

  
});