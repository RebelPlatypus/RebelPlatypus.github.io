<div class="lluvia"></div><style>
.gotas {
  background:-webkit-gradient(linear,0% 0%,0% 100%, from(rgba(13,52,58,1) ), to(rgba(255,255,255,0.6))  );
  background: -moz-linear-gradient(top, rgba(13,52,58,1) 0%, rgba(255,255,255,.6) 100%);
 width:1px;height:89px;
 position: absolute;top:0px;z-index:99999;
 -webkit-animation: fall .63s linear infinite;
  -moz-animation: fall .63s linear infinite;
}
@-webkit-keyframes fall {
 to {margin-top:900px;}
}
@-moz-keyframes fall {
 to {margin-top:900px;}
}
</style><script type="text/javascript">
  //<![CDATA[
(function() {

var nbDrop = 200; 

function randRange( minNum, maxNum) {
  return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

function createRain() {

 for( i=1;i<nbDrop;i++) {
 var dropLeft = randRange(0,980);
 var dropTop = randRange(-1000,1400);

 $('.lluvia').append('<div class="gotas" id="gotas'+i+'"></div>');
 $('#gotas'+i).css('left',dropLeft);
 $('#gotas'+i).css('top',dropTop);
 }

}

createRain();

})();
//]]>
</script>