function rand(min, max) {
    return Math.floor(min + Math.random()*(max-min+1));
}

function Food(ground){
    //各种数据初始化
    this.w = 20;
    this.h = 20;
    this.class = 'food';
    this.food = null;
    //场地相关的信息
    this.ground = document.querySelector(ground);
    this.ground_width = document.querySelector(ground).getBoundingClientRect().width;
    this.ground_height = document.querySelector(ground).getBoundingClientRect().height;
}

Food.prototype.createFood = function () {
    this.food = document.createElement('div');
    this.food.classList.add(this.class);
    this.food.style.width = this.w + 'px';
    this.food.style.height = this.h + 'px';
    //随机位置
    this.food.style.left = rand(0, (this.ground_width-this.w)/this.w)* this.w + 'px';
    this.food.style.top = rand(0, (this.ground_height-this.h)/this.h)* this.h + 'px';
    this.ground.appendChild(this.food);
}