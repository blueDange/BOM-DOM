window.addEventListener('load',function() {
    var arrow_l = document.querySelector('.arrow-l')
   var arrow_r = document.querySelector('.arrow-r') 
    var focus = document.querySelector('.focus');
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
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
    for(var i = 0; i < ul.children.length; i++) {
        var li = this.document.createElement('li');
        li.setAttribute('data-index',i)
        ol.appendChild(li)
        ol.children[i].addEventListener('click', function() {
            for(var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current'
            var index = this.getAttribute('data-index');
            num = index;
            circle = index;
            animate(ul,-index * focusWidth)
        })
    }
    ol.children[0].className = 'current'
    var num = 0;
    var circle = 0;
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first)
    arrow_r.addEventListener('click', function() {
        if(num == ul.children.length-1) {
            ul.style.left = 0;
            num = 0
        }
        num++
        animate(ul,-num * focusWidth)
        circle++;
        if(circle == ol.children.length) {
            circle = 0
        }
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[circle].className = 'current'
    })
    arrow_l.addEventListener('click', function() {
        if(num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + 'px';
            
        }
        num--
        animate(ul,-num * focusWidth)
        circle--;
        if(circle < 0) {
            circle = ol.children.length -1;
        }
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[circle].className = 'current'
    })
    var timer = setInterval(function() {
        arrow_r.click();
    },2000)
})