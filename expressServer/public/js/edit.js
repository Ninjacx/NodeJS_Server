window.onload = function(){
  $('.w-e-text-container').css('height',window.innerHeight+'px !important');
	
  var E = window.wangEditor
  var editor = new E('#div1')

  // 配置服务器端地址
  // editor.customConfig.uploadImgServer = '/a';
  //editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片

   editor.customConfig.uploadImgServer = '/system/upload';
  // 进行下文提到的其他配置
  // ……
  // ……
  // ……
  editor.customConfig.uploadFileName = 'fileNames';
  editor.customConfig.uploadImgMaxLength = 1
  editor.create();



  document.getElementById('btn1').addEventListener('click', function () {
     console.log(editor.txt.html());
    $.post('/system/saveText',{'txt':editor.txt.html(),'id':getQueryString('id')},function(result){
        console.log('success');
    })
    // 读取 html
  }, false)

}

//获取浏览器url 参数值 ，name ：浏览器参数
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
