//alert("s")
let imgList = document.querySelector("#imgList");
let imgArr = document.getElementsByTagName("img");
imgList.style.width = 820 * imgArr.length + "px";

let navDiv = document.querySelector("#navDiv");
let outer = document.querySelector("#outer")
navDiv.style.left = (outer.offsetWidth - navDiv.offsetWidth) / 2 + "px";

let index = 0;
let allA = document.querySelectorAll("a");
allA[index].style.backgroundColor = "black"

for (var i = 0; i < allA.length; i++) {
    allA[i].num = i;
    allA[i].onclick = function() {
        clearInterval(timer);
        index = this.num;
        
        setA();

        move(imgList, "left", -820 * index, 50, function() {
            autoChange()
        })
    }
}

autoChange()

function setA() {
    if(index >= imgArr.length - 1) {
        index = 0;
        imgList.style.left = 0
    }
    for (var i = 0; i < allA.length; i++) {
        allA[i].style.backgroundColor = "red"
    }
        allA[index].style.backgroundColor = "black"
}
let = timer;
function autoChange() {
    timer = setInterval(() => {
        index++;
        index %= imgArr.length;
        move(imgList, "left", -820 * index, 50, function() {
            setA()
        })
    }, 3000);
}





/*===========================move function=================================*/
function move(obj, attr, target, speed, callback) {
    clearInterval(obj.timer);
    let current = parseInt(getStyle(obj, attr));
    if (current > target) {
        speed = -speed
    }

    obj.timer = setInterval(function() {
        let oldValue = parseInt(getStyle(obj, attr));
        let newValue = oldValue + speed;
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target))
            newValue = target;

        obj.style[attr] = newValue + "px";

        if (newValue == target) {
            clearInterval(obj.timer)
            callback && callback()
        }
    }, 30);
}

function getStyle(obj, name) {
    if (window.getComputedStyle) {
    return getComputedStyle(obj, null)[name]
} else {
    return obj.currentStyle[name]
    }
}