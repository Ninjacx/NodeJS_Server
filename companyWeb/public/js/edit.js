window.onload = function(){
  var E = window.wangEditor
  var editor = new E('#div1')

  // 配置服务器端地址
  editor.customConfig.uploadImgServer = '/a';
  // editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片

  editor.customConfig.uploadImgServer = '/upload';
  // 进行下文提到的其他配置
  // ……
  // ……
  // ……
  editor.customConfig.uploadFileName = 'aaa';
  editor.create();



  document.getElementById('btn1').addEventListener('click', function () {
    // 读取 html
    alert(editor.txt.html())
  }, false)

}
