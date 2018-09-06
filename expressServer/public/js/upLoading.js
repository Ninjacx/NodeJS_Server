//滚动条在Y轴上的滚动距离 558

function getScrollTop () {
    // 考虑到浏览器版本兼容性问题，解析方式可能会不一样
  return document.documentElement.scrollTop || document.body.scrollTop
}

//文档的总高度 1172

function getScrollHeight() {
  let bodyScrollHeight = 0
  let documentScrollHeight = 0
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight
  }
  // 当页面内容超出浏览器可视窗口大小时，Html的高度包含body高度+margin+padding+border所以html高度可能会大于body高度
  return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
}

//浏览器视口的高度 500

function getWinHeight () {
  // 浏览器可见内容高度 || 浏览器所有内容高度(考虑到浏览器版本兼容性问题，解析方式可能会不一样)
  return document.documentElement.clientHeight || document.body.clientHeight
}

function isReachBottom () {
  const scrollTop = getScrollTop() // 获取滚动条的高度558
  const winHeight = getWinHeight() // 一屏的高度 500
  const scrollHeight = getScrollHeight()-115 // 获取文档总高度 937  1172


  return scrollTop >= parseInt(scrollHeight) - winHeight
}

window.onscroll = function(){

  if($('.nodata').val()==1){
    return false;
  }
  if(isReachBottom()){
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
             console.log(res);
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
