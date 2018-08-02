//滚动条在Y轴上的滚动距离

function getScrollTop(){
　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　if(document.body){
　　　　bodyScrollTop = document.body.scrollTop;
　　}
　　if(document.documentElement){
　　　　documentScrollTop = document.documentElement.scrollTop;
　　}
　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　return scrollTop;
}

//文档的总高度

function getScrollHeight(){
　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
　　if(document.body){
　　　　bodyScrollHeight = document.body.scrollHeight;
　　}
　　if(document.documentElement){
　　　　documentScrollHeight = document.documentElement.scrollHeight;
　　}
　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
　　return scrollHeight;
}

//浏览器视口的高度

function getWindowHeight(){
　　var windowHeight = 0;
　　if(document.compatMode == "CSS1Compat"){
　　　　windowHeight = document.documentElement.clientHeight;
　　}else{
　　　　windowHeight = document.body.clientHeight;
　　}
　　return windowHeight;
}

window.onscroll = function(){
  if($('.nodata').val()==1){
    return false;
  }
  if(getScrollTop() + getWindowHeight() == getScrollHeight()){
    var goods_id = document.getElementById('goods_id').value;
    document.getElementById('goods_id').value = parseInt(goods_id)+5;
           setLoading();
           var temp = '';
    　　　　//下拉每次加载5条
           $.get('getGoodsList',{"goods_id":goods_id},function(result){
             var res = JSON.parse(result.res);
             if(!res.length){
               document.querySelector('.isShowMsg').style.display = "block";
               $('.nodata').val(1);
               removeLoading();
               return  false;
             }
             console.log(res.length);
             for (var i = 0; i < res.length; i++) {
               temp+='<div class="marginTop">'
                      +'<table class="bgwhite" width="100%">'
                        +'<tr>'
                          +'<td rowspan="2" style="width:40%"><img src="../images/loading.png" class="padding-outline goodsLoading" style="width:100%" data-img="'+res[i].url+'" />'
                            +'<td style="vertical-align: top; padding: 0.3rem 0.6rem;">'
                              +'<div class="fs16 fwBold">'+res[i].title+'</div>'
                              +'<div class="fs14 fwBold" style="color: rgb(160, 160, 160); margin-top: 0.4rem;">'+res[i].description+'</div>'
                            +'</td>'
                          +'</td>'
                        +'</tr>'
                        +'<tr>'
                          +'<td style="vertical-align: bottom; padding-left: 0.3rem; padding-bottom: 0.3rem;">'
                            +'<div style="color:#FD2A39">'
                              +'<span class="fwBold">￥</span>'
                              +'<span class="fs15 marginRight">'+res[i].price+'</span>'
                              +'<del class="fs12" style="margin-left: 0.39rem; color: rgb(172, 172, 172);"> 市场价：￥'+res[i].big_price+'</del>'
                            +'</div>'
                          +'</td>'
                        +'</tr>'
                      +'</table>'
                      +'</div>';
             }
             $('#tempList').append(temp);
             setImg(".goodsLoading");
              removeLoading();
           });
    　　}

};
