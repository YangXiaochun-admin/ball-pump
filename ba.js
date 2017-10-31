 /*动态生成dom元素，初始化
	 	1.生成几个
	 	2.创建节点对象
	 	3.初始化对象属性
	 	4.放入body
	 	5.循环添加节点对象
	 	6.初始化场景属性
	 		top: 浏览器的高度
	 		left：随机分布 0-浏览器宽度
			绝对值

	 气球向上移动做动画
	 	1.改变top--
	 	2.持续运动 定时器
	 	3.设置速差
	 点击气球爆炸
	 	点击事件 委托
	 	判断触发click是不是ball
	 	气球节点删除
	 完善动画 
	 	加速
	 	宽高减少
	 	左右摇摆
*/
var bZ = 160;

var wH = window.innerHeight;
var wW = window.innerWidth;

var balls = [];
var t;

init(10);
move();
t = setInterval(move,1000/30);
//事件委托
document.addEventListener('click',function(e){
	if(e.target.className.toLowerCase()==='ballon'){
		var e = e.target;
		//移除节点对象
		boom.call(e);
		//移除一个新生成一个
		init(1);
	}
},false)

function boom(){
	var rotate = [30,80];
	var index = 0;
	this.t = setInterval(function(){
		if(this.offsetWidth < 10){
			clearInterval(this.t);
			this.parentNode.removeChild(this);
			return false;
		}
		index ++;
		index%=2;
		this.style.transform = `rotate(${rotate[index]}deg)`;
		this.speed ++; //加速
		this.style.width = this.offsetWidth - 10 + 'px';
		this.style.height = this.offsetHeight - 10 + 'px';
		this.style.top = this.offsetTop - this.speed + 'px';
	}.bind(this),1000/30)
}
function init(num){
	var fragment = document.createDocumentFragment();
	for(let i = 0;i < num;i++){
		var ball = document.createElement('div');
		var randomX = ~~(Math.random()*wW) - bZ;
		randomX = Math.abs(randomX);

		ball.className  = "ballon";
		ball.style.top = wH + 'px';
		ball.style.left = randomX + 'px';
		ball.speed = ~~(Math.random()*8) + 1;

		fragment.appendChild(ball);
		balls.push(ball);
	}
	document.body.appendChild(fragment);
}

function move(){
	for(let i = 0;i < balls.length;i++){
		balls[i].style.top = balls[i].offsetTop - balls[i].speed + 'px';
		if(balls[i].offsetTop < -bZ){
			balls[i].style.top = wH + 'px';
		}
	}
}
