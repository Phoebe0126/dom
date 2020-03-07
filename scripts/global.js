function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.append(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }

}

function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    //新增变为属性
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.top) { //未设置top
        elem.style.top = "0px";
    }
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    var pos_x = parseInt(elem.style.left); //化成整数
    var pos_y = parseInt(elem.style.top);
    var dist = 0; //相差的距离
    if (pos_x == final_x && pos_y == final_y) {
        return true;
    }
    if (pos_x < final_x) {
        dist = Math.ceil((final_x - pos_x) / 10);
        pos_x += dist;
    }
    if (pos_x > final_x) {
        dist = Math.ceil((pos_x - final_x) / 10);
        pos_x = pos_x - dist;
    }
    if (pos_y < final_y) {
        dist = Math.ceil((final_y - pos_y) / 10);
        pos_y += dist;
    }
    if (pos_y > final_y) {
        dist = Math.ceil((pos_y - final_y) / 10);
        pos_y = pos_y - dist;
    }
    elem.style.left = pos_x + "px";
    elem.style.top = pos_y + "px";
    var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
    elem.movement = setTimeout(repeat, interval); //全局变量

}
//突出显示当前页面链接
function highlightPage() {
    //检查各元素是否存在
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var headers = document.getElementsByTagName('header');
    if (headers.length == 0) return false;
    var navs = headers[0].getElementsByTagName('nav');
    if (navs.length == 0) return false;
    //循环遍历导航链接
    var links = navs[0].getElementsByTagName('a');
    var linkurl;
    for (var i = 0; i < links.length; i++) {
        linkurl = links[i].getAttribute("href");
        //检测当前链接的URL是否与当前页面的URL相同 window.location.href表示当前页面的url
        if (window.location.href.indexOf(linkurl) != -1) { //indexOf记得大写 不相同则返回-1
            links[i].className = "here";
        }

    }
}
//用js插入底下幻灯片图片
function prepareSlideshow() {
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");
    var preview = document.createElement("img");
    preview.setAttribute("src", "images/slideshow.gif");
    preview.setAttribute("alt", "a glimpse of what awaits you");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);
    //鼠标放上去幻灯片效果移动图片
    var links = document.getElementsByTagName("a"); //不用intro，用document使鼠标放在导航div链接时也有图片滑动效果
    var destination;
    for (var i = 0; i < links.length; i++) {
        // destination = links[i].href;
        links[i].onmouseover = function() {
            destination = this.getAttribute("href");
            //比较每个a链接的url与鼠标放上去的url字符串是否相等
            if (destination.indexOf("index.html") != -1) {
                moveElement("preview", 0, 0, 5);
            }
            if (destination.indexOf("about.html") != -1) {
                moveElement("preview", -150, 0, 5);
            }
            if (destination.indexOf("photos.html") != -1) {
                moveElement("preview", -300, 0, 5);
            }
            if (destination.indexOf("live.html") != -1) {
                moveElement("preview", -450, 0, 5);
            }
            if (destination.indexOf("contact.html") != -1) {
                moveElement("preview", -600, 0, 5);
            }
        }
        links[i].onmouseout = function() {
            moveElement("preview", 0, 0, 2);
        }
    }
    //圆角显示
    var frame = document.createElement("img");
    frame.setAttribute("src", "images/frame.gif");
    frame.setAttribute("id", "frame");
    slideshow.appendChild(frame);

}

function showSection(id) {
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].getAttribute("id") != id) {
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

function prepareInternalnav() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var articles = document.getElementsByTagName("article"); //获取article元素，才能得到article里的nav
    if (articles.length == 0) return false;
    var navs = articles[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var sectionId = links[i].getAttribute("href").split("#")[1]; //分割字符串#xxx获得数组中第二个元素
        if (!document.getElementById(sectionId)) return false;
        document.getElementById(sectionId).style.display = "none"; //一开始隐藏所有section文字
        links[i].destination = sectionId; //给每个连接创建自定义属性，避免时间处理函数时失效
        links[i].onclick = function() {
            showSection(this.destination); //注意这里不能用links[i] ,因为i也没有定义
            return false;
        }

    }
}
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}
function prepareGallery() {
    if(!document.getElementsByTagName) return false;//不能加括号！！！
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            return showPic(this) ? false : true; //执行成功一般返回false，省掉了return false;
        }
    }
}
function preparePlaceholder() {
    if(!document.createElement) return false;
    if(!document.getElementById) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById("imagegallery")) return false;
    
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/photos/placeholder.gif");
    placeholder.setAttribute("width", "400px");
    placeholder.setAttribute("height", "300px");
    placeholder.setAttribute("alt", "Jay Skript");

    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var text = document.createTextNode("Choose an image.");
    description.appendChild(text);

    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}
function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return false;
    var placeholder = document.getElementById("placeholder");
    var source = whichpic.getAttribute("href");
    if (placeholder.nodeName != "IMG") return false; //记得nodeName大写
    placeholder.setAttribute("src", source);
    if (document.getElementById("description")) {
        var description = document.getElementById("description");
        var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
        if (description.firstChild.nodeType == 3) { //检测是否为文本
            description.firstChild.nodeValue = text;
        }
    }
    return true;
}
function stripeTable() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
        var odd = false;
        var rows = tables[i].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if (odd == true) {              
                addClass(rows[j], "odd");
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}
function highlightRows() {
	if(!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");//别大意！
	for(var i = 0; i<rows.length; i++){
		rows[i].oldClassName = rows[i].className;//先保存自身类名
		rows[i].onmouseover = function() {
			addClass(this,"highlight");
		}
		rows[i].onmouseout = function() {
			this.className = this.oldClassName;
		}

	}
}
//这个函数用来显示缩略语列表
function displayAbbreviations() {
	//首先排除各种情况 hh
	if(!document.getElementsByTagName||!document.createElement||!document.createTextNode) return false;
	//取得所有缩略词
	var abbreviations = document.getElementsByTagName("abbr");
	if(abbreviations.length<1) return false;
	var defs = new Array();
	//遍历所有缩略词
	for(var i=0; i<abbreviations.length; i++) {
		var current_abbr = abbreviations[i];
		if(current_abbr.childNodes.length<1) continue;//防止个数为0的情况发生
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.nodeValue;
		defs[key] = definition;
	}
	//创建定义列表
	var dlist = document.createElement("dl");
	//循环defs数组
	for( key in defs) {
		var definition = defs[key];
	//创建定义标题
	    var dtitle = document.createElement("dt");
	    var dtitle_text  = document.createTextNode(key);
	    dtitle.appendChild(dtitle_text);
	//创建定义描述
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
    //把他们添加到定义列表
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
	}
	//检测特殊情况
	if(dlist.childNodes.length<1) return false;
	//创建标题
	var header = document.createElement("h3");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	//新增代码 寻找article里的元素
	var  articles = document.getElementsByTagName("article");
	if(articles.length ==0 ) return false;
	var container = articles[0];
	//把标题加载在页面主体
	container.appendChild(header);
	container.appendChild(dlist);
}	
function focusLabels() {
	if(!document.getElementsByTagName)return false;
	var labels = document.getElementsByTagName("label");
	for (var i = 0; i< labels.length;i++) {
		if(!labels[i].getAttribute("for")) continue;
		labels[i].onclick = function() {
			var id = this.getAttribute("for");
			if(!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();//让相应表单字段获得焦点
		}
	}
}


function resetFields(whichform) {
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if(element.type=="submit") continue;
		element.onfocus = function() {
			var text = this.placeholder||this.getAttribute("placeholder");
			if(this.value==this.defaultValue) {//如果字段的值等于占位符文本，说明还没有输入文字
				this.value = "";
                this.className = "";
			}
		}
		element.onblur = function() {
			if(this.value=="") {
                this.value=this.defaultValue; 
                addClass(this,"grey");
			}
		}
		element.onblur();
	}
}


function isFilled(field) {
    if(field.value.replace('','').length==0)return false;//空换空？
    
    return (field.value!=field.defaultValue);
      
}
function isEmail(field) {
    return (field.value.indexOf("@")!=-1&&field.value.indexOf(".")!=-1);
}
function validateForm(whichform) {
    for( var i = 0; i<whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if(element.required) {
            if(!isFilled(element)) {
                alert("Please fill in the "+element.name+" field.");
                return false;
            }
        }
        if(element.type=="email") {
            if(!isEmail(element)) {
                alert("The "+element.name+" field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}
function prepareForms() {
	for( var i=0;i<document.forms.length;i++) {
		var thisform = document.forms[i];
		resetFields(thisform);
        thisform.onsubmit = function() {
           return validateForm(thisform);
        }
	}
}

addLoadEvent(focusLabels);
addLoadEvent(prepareForms);
addLoadEvent(stripeTable);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);
addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);