window.onresize=size();
window.onload = function(){
  //图片加载
  setImg('.load-img');
  var gallery = mui('.mui-slider');
    //banner轮播
    gallery.slider({
      interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
    });
  size();
  // var r= document.documentElement.clientWidth;
  //   var Paper = Raphael('panda', r, 90);
  //   var img = 80;
  //   if(document.documentElement.clientWidth<768){
  //       img = 50;
  //   }
  //   var p = Paper.image('../images/pos.jpg',170, 30, img, img);
  //
  //   // p.attr('height',180);
  //   p.animate({"transform":"t"+(r-200)+",100r65t-100,0 r205t"},2300,'bounce',function(r){
  //       console.log(r);
  //   });
  //   p.click(function(res){
  //   });
}
//初始屏幕字体大小
function size(){
  var init= 750;
  var rem = document.documentElement.clientWidth/750*16;
  if(rem<14){
     rem = 14;
  }
  document.documentElement.style.fontSize = rem+'px';
}

$(document).ready(function(){
  $('.changeRecommend').click(()=>{

     $('.changeRecommend').addClass('rotate');
     setTimeout(function(){
       $('.changeRecommend').removeClass('rotate');
     },800);
      //换一批推荐
      setLoading();
      $.get('changeRecommend',function(result){
        var res =  JSON.parse(result.res);
        var temp = '';
        for (var i = 0; i < res.length; i++) {
          temp += '<div style="width:50%;list-style:none;float:left">'
             +'<li style="text-align:center">'
             + '<a class="mui-navigate-center">'
             + '<div class="padding-outline">'
             +' <img class="load-recommend" style="height:120px;" data-img="'+res[i].url+'" src=""  width="100%" /></div>'
             +'<div>'+res[i].title+'</div></li></div>';
        }
          $('#temp').html(temp);
          setImg('.load-recommend');
         removeLoading();
      }).error(function(err){
          toast(JSON.stringify(err));
          removeLoading();
      });
  })
})
