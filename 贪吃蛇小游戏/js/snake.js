function Snake(ground, foodObj) {
    this.w = 20;
    this.h = 20;
    //蛇身上的节点信息存成数据  一个节点只能使用一次  控制起来比较方便
    this.snake = [];
    //场地相关的信息
    this.ground = document.querySelector(ground);
    this.ground_width = document.querySelector(ground).getBoundingClientRect().width;
    this.ground_height = document.querySelector(ground).getBoundingClientRect().height;
    //蛇跑起来的定时id  rsid
    this.rsid = 0;
    this.time = 1000
    //方向属性
    this.direction = 3;
    //食物对象
    this.foodObj = null;
}
Snake.prototype.createSnake = function () {
    let This = this;
    //初始化蛇的基本数据
    let base = [{l:60, t:40}, {l:40, t:40}, {l:20, t:40}];
    for (let ind = 0; ind < base.length; ind++) {
        const el = base[ind];
        let node = document.createElement('div');
        //蛇身和蛇头的样式不同
        node.classList.add(ind ? 'snake' : 'header');
        node.style.width    = This.w + 'px';
        node.style.height   = This.h + 'px';
        node.style.left     = el.l  + 'px';
        node.style.top      = el.t  + 'px';
        //把节点存到蛇身数组里面
        This.snake.push(node);
        //同时把节点追加到游戏场地
        This.ground.appendChild(node);
    }
}
//蛇跑起来
Snake.prototype.run = function () {
    let This = this;
    This.rsid = setInterval(()=>{
        //蛇尾使用蛇头的位置信息
        This.snake[This.snake.length-1].style.left = This.snake[0].offsetLeft + 'px';
        This.snake[This.snake.length-1].style.top = This.snake[0].offsetTop + 'px';
        //把蛇尾拿出来
        let s = This.snake.pop();
        //把蛇尾插入到位置 1  可以看js手册 splice  使用
        This.snake.splice(1, 0, s);
        //让蛇头动起来  不同的方向改变不同的样式属性
        switch (This.direction) {
            case 1://向左  对应的是键盘 向左箭头  keycode  37
                This.snake[0].style.left = This.snake[0].offsetLeft - This.w + 'px';
                break;
            case 2://向上  对应的是键盘 向上箭头  keycode  38
                This.snake[0].style.top = This.snake[0].offsetTop - This.h + 'px';
                break;
            case 3: //向右  对应的是键盘 向右箭头  keycode  39
                This.snake[0].style.left = This.snake[0].offsetLeft + This.w + 'px';
                break;
            case 4://向下 对应的是键盘 向下箭头  keycode  40
                This.snake[0].style.top = This.snake[0].offsetTop + This.h + 'px';
                break;
            default:
                break;
        }
        //判断是不是迟到食物
        This.eat();
        //判断是不是死掉了
        This.gameover();
    }, This.time);
}

//吃食物
Snake.prototype.eat = function () {
    console.log(this.foodObj.food.offsetLeft);
    if(this.foodObj.food.offsetLeft == this.snake[0].offsetLeft && this.foodObj.food.offsetTop == this.snake[0].offsetTop){
        //把食物作为节点追加到蛇身
        this.foodObj.food.classList.remove('food');
        this.foodObj.food.classList.add('snake');
        this.snake.push(this.foodObj.food);
        //吃完之后创建食物
        this.foodObj.createFood();
    }
}
//游戏挂掉了
Snake.prototype.gameover = function () {
    if(
        this.snake[0].offsetTop < 0  || 
        this.snake[0].offsetTop > this.ground_height - this.h || 
        this.snake[0].offsetLeft < 0  || 
        this.snake[0].offsetLeft > this.ground_width - this.w
    ){
        this.pause();
        alert('Game Over !'); 
    }
}
//暂停操作
Snake.prototype.pause = function () {
    clearInterval(this.rsid);
}



