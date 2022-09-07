/*
 * @Author: blueDange 672074694@qq.com
 * @Date: 2022-08-23 17:54:47
 * @LastEditors: blueDange 672074694@qq.com
 * @LastEditTime: 2022-08-24 11:46:14
 * @FilePath: \BOM\05-轮播图制作\js\index1.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
window.addEventListener('load',function() {
   var arrow_l = document.querySelector('.arrow-l')
   var arrow_r = document.querySelector('.arrow-r') 
    var focus = document.querySelector('.focus');
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block'
        clearInterval(timer);
        timer = null
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
           },2000)
    })
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var focusWidth = focus.offsetWidth;
    for (var i = 0; i < ul.children.length; i++){
        // 创建一个小li
        var li = document.createElement('li')
        // 记录当前小圆圈的索引号 通过自定义属性来做
        li.setAttribute('data-index',i);
        // 把小li插入到ol 里面
        ol.appendChild(li)
        // 4.小圆圈排他思想 我们可以直接在生成小圆圈的同事直接绑定点击事件
        li.addEventListener('click', function() {
            // 干掉所有人 把所有小li 清楚current 类名
            for(var i = 0; i < ol.children.length; i++){
                ol.children[i].className = ''
            }
            // 留下我自己 当前的小li 设置current 类名
            this.className = 'current'
            // 5.点击小圆圈 移动动画  当然移动的是ul
            // ul的移动距离 小圆圈 索引号 乘以图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到当前小li的索引号
            var index = this.getAttribute('data-index')
            // 当我们点击了某个小li 就要把这个小li 的索引号给 num
            num = index;
            // 当我们点击了某个小li既要把这个li 的索引号给circle
            circle = index;
            animate(ul,-index* focusWidth,)
        })
    }
    // 把ol里面的第一给小li设置类名为current
   ol.children[0].className = 'current'
   // 6.克隆第一张图片(li)放到ul 最后面
   var first = ul.children[0].cloneNode(true)  // true 深克隆
   ul.appendChild(first)
   // 7.点击右侧按钮 图片滚动一张
   var num = 0;
   // circle 控制小圆圈的播放 
   var circle = 0;
   arrow_r.addEventListener('click',function() {
    // 如果走到了最后复制的一张图片, 此时我们的ul就要快速复原 left 改为 0;
    if(num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0
    }
    num++
    animate(ul,-num * focusWidth);
    // 8. 点击右侧按钮 小圆圈跟随一起变化 ,可以在声明一个变量控制小圆圈的播放
    circle++;
    // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
    if(circle == ol.children.length) {
        circle =0
    }
    circleChange();
   })
   // 9.左侧按钮做法
   arrow_l.addEventListener('click',function() {
    // 如果走到了最后复制的一张图片, 此时我们的ul就要快速复原 left 改为 0;
    if(num == 0) {
        num =  ul.children.length - 1
        ul.style.left = -num * focusWidth + 'px';
        
    }
    num--
    animate(ul,-num * focusWidth);
    // 8. 点击右侧按钮 小圆圈跟随一起变化 ,可以在声明一个变量控制小圆圈的播放
    circle--;
    // 如果circle < 0 说明第一张图片, 则小圆圈改为第四个小圆圈(3)
    if(circle < 0) {
        circle = ol.children.length-1
    }
    circleChange();
   })
   function circleChange(){
        // 先清楚其余小圆圈的current类名
        for(var i = 0; i < ol.children.length; i++){
            ol.children[i].className=''
        } 
    
        // 留下当前小圆圈current类名
        ol.children[circle].className = 'current'
    
   }
   var timer = setInterval(function() {
    arrow_r.click();
   },2000)

})
