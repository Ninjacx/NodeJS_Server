var timeStop = 1;
var Common = new Object({
		Time: function(DateTime){
			var d = new Date(DateTime)
			var Minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
			var Seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
			var time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + Minutes + ':' + Seconds
			return time;
		},
		//默认src给loading图片，data-img给实际图片 图片加载完显示
		loadingImg: function(clssName) {
					var ImgCount = document.querySelectorAll(clssName).length;
					var j = 0;
					for (var i = 0; i < ImgCount; i++) {
						var _img = document.querySelectorAll(clssName)[i].getAttribute("data-img");
						var img = new Image();
						img.src = _img;
						img.onload = function () {
							var img1 = document.querySelectorAll(clssName)[j];//.src= arr[0];
							img1.src = img1.getAttribute("data-img");
							j++;
						};
					}
	},
	toast: function(content) {
		var toast = $('<div class="toast" style="z-index:9999;position:fixed;top: 50%; left: 0; bottom: 0; right: 0;margin: auto;width:auto;'
				+ 'text-align:center;color:white;"><div style="font-size: 18px"><span style="padding:11px 20px;border-radius:10px;background:rgba(0,0,0,0.6);">' + content + '</span></div></div>');
		$('body').append(toast);
		setTimeout(function () {
				toast.remove();
		}, 2600);
	},
	isNull: function(text){
		return Boolean($.trim(text));
	},
	$setNameVal: function(_name,val){
		return $('[name='+_name+']').val(val);
	},
	$getNameVal: function(_name){
		return $('[name='+_name+']').val();
	},
	$setClassVal: function(_Class,val){
		return $('.'+_Class).val(val);
	},
	$getClassVal: function(_Class){
		return $('.'+_Class).val();
	},
	// 如果为空返回指定消息
	$NullMessage: function(str,Message) {
		if(!this.isNull(str)){
			this.toast(Message);
			return false;
		}
		return 1;
	},
	// 发送验证码倒计时
	sendCode: function(_this){

		if(timeStop){
			time(_this);
		}else{
			 Common.toast("请勿重复发送");
		}

			// 验证码倒计时
		 function time(t){
			 timeStop = 0;
			 var _this = t;
			 var time = 60;
			 $(_this).prop('disabled','disabled');
			 $(_this).val(time+"秒后可重新发送");
			 var tt = 1;
			 time = time-tt; // 直接跳过第一秒的延迟执行
			 var stop = setInterval(function(){
				 if(time<1){
						 $(_this).val("重新发送");
						 clearInterval(stop);
						 timeStop=1;
						 $(_this).prop('disabled','');
						 return false;
					 }
					 $(_this).val(time--+"秒后可重新发送");
			 },1000);
		 }
	}


});
//为空返回true
function isnull(str) {
    var reg = /(^\s*)|(\s*$)/g;
    str.replace(reg, "");
    console.log(str);
    return str == '' || str == null || str == undefined;
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




//加载等待框
function setLoading(){
      var load = $('<div class="loading_outer">'

        +'<div class="loader--audioWave">'
        +'</div>'
        +'<div style="text-align:center;font-size: 13px;font-weight: 800;color: cornflowerblue;">加载中…</div>'
    +'</div>');
    $('body').append(load);
}
//取消加载框
function removeLoading(){
    $('.loading_outer').remove();
}

//回退
function backWeb() {
    void (history.go(-1));
}


//删除数组中元素   arr.remove();
function removeArray(){
    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
}


//传入id 序列化所有表单name中的值转json
function Getform(formID){
    var obj = {};
    var data = $("#" + formID).serializeArray();
    $.each(data, function (i, v) { obj[v.name] = v.value; });
    return obj;
}


function counter(arrays, index, text, length) {
    if (length == undefined) length = 0;
    if (text.length > length) {
        if (arrays.indexOf(index) == -1) {
            arrays.push(index);
        }
    } else {
        arrays.remove(index);
    }
}





//根据append 上去的 元素进行全选与不选切换
//selectAll_id:全选id  ,selectChind_Class:append 上input class
function appendCheckbox_select(selectAll_id, selectChind_Class) {
    document.getElementById(selectAll_id).onclick = function () {
        if ($("." + selectChind_Class).hasClass('ck')) {
            if (!this.checked) {
                $("." + selectChind_Class).removeClass('ck');
                $("." + selectChind_Class).prop('checked', '');
            }
        } else {
            if (this.checked) {
                $("." + selectChind_Class).addClass('ck');
                $("." + selectChind_Class).prop('checked', 'checked');
            }
        }
    }
}
//全选，反选
function Checkbox_select(selectAll_id, selectChind_Class) {
    document.getElementById(selectAll_id).onclick = function () {
        if ($("." + selectChind_Class).hasClass('ck')) {
            $("." + selectChind_Class).removeClass('ck');
            $("." + selectChind_Class).prop('checked', '');
        } else {
            $("." + selectChind_Class).addClass('ck');
            $("." + selectChind_Class).prop('checked', 'checked');
        }
    }
}
