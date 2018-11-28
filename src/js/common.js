/**
 * [生成任意范围内随机整数的函数]
 * @param  {Number} min [最小值]
 * @param  {Number} max [最大值]
 * @return {Number}     [随机整数]
 */
function randomNumber(min,max){
	return parseInt(Math.random()*(max-min+1))+min;
}

/**
 * [随机颜色]
 * @param  {[Number]} n [是否生成16进制颜色]
 * @return {[String]}   [返回随机颜色]
 */
function randomColor(n){
	if(n===16){
		var str = '0123456789abcdef';

		var color = '#';

		for(var i=0;i<6;i++){
			// 随机获取一个字符
			var idx = parseInt(Math.random()*str.length);
			color += str[idx];
		}
		return color;
		
	}


}


function showTime(end,callback){
	// 2）不断拿当前时间跟结束时间对比，计算差值
	var offset = Date.parse(end) - Date.now();

	// 3）把差值转换成《剩余时间》
	// 毫秒->秒
	offset = parseInt(offset/1000);

	// 5）倒计时结束时
	if(offset <= 0){
		// * 停止定时器
		clearInterval(timer);

		if(typeof callback === 'function'){
			callback();
		}
	}

	// 23s	0:0:23
	// 65s	0:1:5
	// 5m	0:5:0
	// 85m	1:25:0
	var sec = offset%60;//剩余秒数
	var min = parseInt(offset/60)%60;//剩余分数
	var hour = parseInt(offset/60/60)%24;//剩余小时数
	var day = parseInt(offset/60/60/24);//天数

	// 补0操作
	sec = sec<10 ? '0'+sec : sec;
	min = min<10 ? '0'+min : min;
	hour = hour<10 ? '0'+hour : hour;

	return day + '天' + hour + '时' + min + '分' + sec + '秒'

	// console.log(offset)
}


var Element = {
	get:function(node){
		var res = [];
		for(var i=0;i<node.length;i++){
			if(node[i].nodeType === 1){
				res.push(node[i]);
			}
		}

		return res;
	},

	// 获取ele下的所有元素
	children:function(ele){
		return this.get(ele.childnodes);
	},

	// 获取ele的前一个元素
	prev:function(ele){

	},

	next:function(ele){

	}
}

// Element.next(ele)
// Element.children(ele);//


// class="content box box2"
function getElementByClassName(name){
	var ele = document.getElementByTagName('*');
	var res = [];
	for(var i=0;i<ele.length;i++){
		var className = ele[i].className.split(' ');
	}
}


/**
 * [获取css样式，兼容IE8-]
 * @param  {Element} ele [获取样式的元素]
 * @param  {String} key [css属性]
 * @return {String}     [返回key对应的css属性值]
 */
function getCss(ele,key){
	// 判断是否支持getComputedStyle
	if(window.getComputedStyle){
		// 标准浏览器
		return getComputedStyle(ele)[key]
	}else if(ele.currentStyle){
		// IE8-
		return ele.currentStyle[key]
	}else{
		// 返回内联样式
		return ele.style[key]
	}
}


// getCss(box,'fontSize')

/**
 * [绑定事件函数,兼容IE8-]
 * @param  {Elment}   ele       [绑定事件的元素]
 * @param  {String}   type      [事件类型,不带on]
 * @param  {Function} fn        [事件处理函数]
 * @param  {Boolean}  isCapture [是否捕获]
 */
function bind(ele,type,fn,isCapture){
	if(ele.addEventListener){
		ele.addEventListener(type,fn,isCapture);
	}else if(ele.attachEvent){
		ele.attachEvent('on'+type,fn);
	}else{
		// DOM节点绑定方式
		// ele.onclick = function(){}
		ele['on'+type] = fn;
	}
}
//bind(ele,type,fn,isCapture)
//bind(box,'click',function(){},true)


var Cookie = {
	get:function(name){
		// 获取所有
		var cookies = document.cookie;

		// 转成数组
		cookies = cookies.split('; ');//['goodslist=[]','your=lemon']

		var res = '';
		for(var i=0;i<cookies.length;i++){
			// 拆分cookieName和cookieValue
			var arr = cookies[i].split('=');
			if(arr[0] === name){
				res = arr[1];
				break;
			}
		}

		return res;

	},
	/**
	 * [设置/修改cookie]
	 * @param {String} name  [cookie名]
	 * @param {String} value [cookie值]
	 * @param {[Object]} param [cookie参数]
	 	* expires:Date
	 	* path：String
	 	* domain：String
	 	* secure：Boolean
	 */
	set:function(name,value,param){
		//param = {expires,path,secure,domain}
		var cookie = name + '=' + value;

		if(param){
			// 有效期
			if(param.expires){
				cookie += ';expires='+param.expires.toUTCString();
			}

			// 保存路径
			if(param.path){
				cookie += ';path=' + param.path;
			}

			// 域名
			if(param.domain){
				cookie += ';domain=' + param.domain;
			}

			// 安全性
			if(param.secure){
				cookie += ';secure'
			}

		}
		
		document.cookie = cookie;

	},
	remove:function(name,path){
		// 原理：设置过期时间达到删除效果
		var now = new Date();
		now.setDate(now.getDate()-1);

		this.set(name,null,{expires:now,path:path});
	},

}


// Cookie.remove();


/**
 * [动画函数]
 * @param  {Element} ele    [动画元素]
 * @param  {String} attr   [动画属性]
 * @param  {Number} target [动画目标值]
 * @param  {[Function]} callback [回调函数]
 */
/*function animate(ele,attr,target,callback){
	ele.timer = setInterval(function(){
		// 获取当前值(得到ele的css属性)
		var current = getCss(ele,attr);//带单位的string:'16px','60deg','0.5'

		// 提取单位
		var unit = current.match(/[a-z]*$/)[0];

		// 提取当前值(number)
		current = parseFloat(current);

		// 计算缓冲速度
		var speed = (target-current)/10;


		// 针对opacity属性操作
		if(attr === 'opacity'){
			speed = speed>0 ? 0.05 : -0.05;
		}else{
			// 避免speed过小或为0
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
		}

		current = current + speed;

		if(current === target || speed === 0){
			clearInterval(ele.timer);
			current = target

			// 动画结束
			if(typeof callback === 'function'){
				callback();
				
			}

		}

		ele.style[attr] = current + unit;



	},30)
}*/

// animate(box,'left',600)
// animate(box,'top',600)
// 扩展:
// animate(box,{left:600,fontSize:30,},function(){})


/**
 * [动画函数增强版]
 * @param  {Element}   ele      [动画元素]
 * @param  {Object}   opt      [动画属性与目标值]
 * @param  {[Function]} callback [回掉函数]
 */
function animate(ele,opt,callback){
	// 使用属性timerLen记录定时器数量
	ele.timerLen = 0;

	for(var attr in opt){
		ele.timerLen++;

		(function(attr){
			var timerName = attr + 'Timer';//leftTimer,fontSizeTimer
			var target = opt[attr];
			// 添加前先清除之前的同名定时器
			clearInterval(ele[timerName]);


			ele[timerName] = setInterval(function(){
				// 获取当前值
				var current = getCss(ele,attr);

				// 提取单位
				var unit = current.match(/[a-z]*$/)[0];

				// 提取当前值(number)
				current = parseFloat(current);

				// 计算缓冲速度
				var speed = (target-current)/10;


				// 针对opacity属性操作
				if(attr === 'opacity'){
					speed = speed>0 ? 0.05 : -0.05;
				}else{
					// 避免speed过小或为0
					speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
				}

				current = current + speed;

				// 目标值判断
				if(current === target){
					clearInterval(ele[timerName]);

					// 重置当前值
					current = target;

					ele.timerLen--;

					// 动画完成后执行回调函数
					if(typeof callback === 'function' && ele.timerLen === 0){
						callback();
					}
				}


				// 设置样式
				ele.style[attr] = current + unit;
			},30)

		})(attr);
	}
}