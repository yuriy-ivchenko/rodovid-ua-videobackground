"use strict";
////Оголошення змінної без ключового слова let або const призведе до помилки, якщо скрипт виконується в суворому режимі.

const svg = document.getElementById("svg");
const svgLines = [];
let nodeId = [];
let lineId = [];

let nodes = [
    {
        id: "son-daugther", name: "Дочка", path_photo: "./photo/mama.png", link: "#son-daugtherModal"
    },
    {
        id: "father", name: "Тато", path_photo: "./photo/son.png", link: "#tatoModal"
    },
    {
        id: "mather", name: "Мама", path_photo: "./photo/mama.png", link: "#mamaModal"
    },
    //ДІДИ
    {
        id: "gf1", name: "Дідусь-1", path_photo: "./photo/didus11.png", link: "#gFather1Modal"
    },
    {
        id: "gm1", name: "Бабуся-1", path_photo: "./photo/babusia11.png", link: "#gMather1Modal"
    }, {
        id: "gf2", name: "Дідусь-2", path_photo: "./photo/didus11.png", link: "#gFather2Modal"
    },
    {
        id: "gm2", name: "Бабуся-2", path_photo: "./photo/babusia22.png", link: "#gMather2Modal"
    },
    ///П Р А Д І Д И
    {
        id: "_2gf1", name: "Прадідусь-1", path_photo: "./photo/didus11.png", link: "#2gFather1Modal"
    },
    {
        id: "_2gm1", name: "Прабабуся-1", path_photo: "./photo/babusia22.png", link: "#2gMather1Modal"
    },
    {
        id: "_2gf2", name: "Прадідусь-2", path_photo: "./photo/didus11.png", link: "#2gFather2Modal"
    },
    {
        id: "_2gm2", name: "Прабабуся-2", path_photo: "./photo/babusia22.png", link: "#2gMather2Modal"
    },
    {
        id: "_2gf3", name: "Прадідусь-3", path_photo: "./photo/didus11.png", link: "#2gFather3Modal"
    },
    {
        id: "_2gm3", name: "Прабабуся-3", path_photo: "./photo/babusia22.png", link: "#2gMather3Modal"
    },
    {
        id: "_2gf4", name: "Прадідусь-4", path_photo: "./photo/didus11.png", link: "#2gFather4Modal"
    },
    {
        id: "_2gm4", name: "Прабабуся-4", path_photo: "./photo/babusia22.png", link: "#2gMather4Modal"
    },
    {
        id: "God", name: "Б О Г", path_photo: "./img/heart.png", link: "#GodModal"
    }
];


const lineData = [
    { from: "son-daugther", to: "father" },
    { from: "son-daugther", to: "mather" },
    { from: "father", to: "gf1" },
    { from: "father", to: "gm1" },
    { from: "mather", to: "gf2" },
    { from: "mather", to: "gm2" },
    { from: "gf1", to: "_2gf1" },
    { from: "gf1", to: "_2gm1" },
    { from: "gm1", to: "_2gf2" },
    { from: "gm1", to: "_2gm2" },
    { from: "gf2", to: "_2gf3" },
    { from: "gf2", to: "_2gm3" },
    { from: "gm2", to: "_2gf4" },
    { from: "gm2", to: "_2gm4" },
    { from: "God", to: "_2gf1" },
    { from: "God", to: "_2gm1" },
    { from: "God", to: "_2gf2" },
    { from: "God", to: "_2gm2" },
    { from: "God", to: "_2gf3" },
    { from: "God", to: "_2gm3" },
    { from: "God", to: "_2gf4" },
    { from: "God", to: "_2gm4" },
];
for (let i = 0; i < nodes.length; i++) {
    const node = document.createElement("div");
    node.id = nodes[i].id;
    nodeId = nodes[i].id;
    node.parentId = nodes[i].parentId;
    node.className = "node";
    // node.style.cssText = `left: ${nodes.left}px; top: ${nodes.top}px`;
    node.draggable = true;
    node.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text/plain", node.id);
        from = node.id;
    });

    document.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    document.addEventListener("drop", function (e) {
        e.preventDefault();
        to = e.target.id;
        elementDrag(e, from, to);
    });

    let image = document.createElement("img");
    image.src = nodes[i].path_photo;
    image.width = "30";
    image.style.margin = "10px";
    node.appendChild(image);

    let link = document.createElement("a");
    link.href = nodes[i].link;
    link.style.position = "absolute";
    link.style.top = "15px";
    link.style.textDecoration = "none";
    link.innerText = nodes[i].name;
    node.appendChild(link);
    document.body.appendChild(node);
    console.log(node.id);
}

document.addEventListener("DOMContentLoaded", function () {
    let from = [];
    let to = [];
    for (let i = 0; i < lineData.length; i++) {
        from = lineData[i].from;
        to = lineData[i].to;
        createLine(from, to);
        console.log("від: " + from + " до:" + to);

    }
    // Код малювання ліній

    function createLine(from, to) {
        const fromNode = document.getElementById(from);
        const toNode = document.getElementById(to);

        if (!fromNode || !toNode) {
            console.error(`Cannot find element with id "${from}" or "${to}"`);
            return;
        }

        const fromNodeRect = fromNode.getBoundingClientRect();
        const toNodeRect = toNode.getBoundingClientRect();

        const fromNodeX = fromNodeRect.left + (fromNodeRect.width / 2);
        const fromNodeY = fromNodeRect.top + (fromNodeRect.height / 2);

        const toNodeX = toNodeRect.left + (toNodeRect.width / 2);
        const toNodeY = toNodeRect.top + (toNodeRect.height / 2);

        let lineId;

        // перевіряємо, чи лінія з таким ідентифікатором уже існує
        let existingLine = svgLines.find(line => {
            lineId = from + "-" + to;
            return line.getAttribute('id') === lineId;
        });

        if (existingLine) {
            svg.removeChild(existingLine); // видаляємо лінію з SVG елементу
            svgLines.splice(svgLines.indexOf(existingLine), 1); // видаляємо лінію з svgLines
        }

        let line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        line.setAttribute("x1", fromNodeX);
        line.setAttribute("y1", fromNodeY);
        line.setAttribute("x2", toNodeX);
        line.setAttribute("y2", toNodeY);

        //stroke-dasharray: 0, 500;
        line.setAttribute("stroke", "red");
        line.setAttribute("stroke-dasharray", 0, 500);
        line.style.strokeWidth = "3px";
        line.style.strokeDasharray = 8;
        line.style.strokeDashoffset = 6;
        lineId = from + "-" + to;
        line.setAttribute('id', lineId);
        svg.appendChild(line);
        svgLines.push(line);
    }

    createLine(from, to);
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //>>>>>>>>>>>>>>>>>>>>
    function addNodeAndLine(newNode) {
        nodes.push(newNode);
        const newLineFrom = newNode.id;
        const newLineTo = newNode.parentId;
        lineData.push({ from: newLineFrom, to: newLineTo });
        const newLineColor = newNode.background;
        lines[`${newLineFrom}-${newLineTo}`] = [newLineFrom, newLineTo, newLineColor];
        updateLines();
    }
});

function updateLines() {
    const lines = {

        'son-daugther-father': ['son-daugther', 'father', 'blue'],
        'son-daugther-mather': ['son-daugther', 'mather', 'green'],
        'father-gf1': ['father', 'gf1', 'blue'],
        'father-gm1': ['father', 'gm1', 'blue'],
        'mather-gf2': ['mather', 'gf2', 'green'],
        'mather-gm2': ['mather', 'gm2', 'green'],
        'gf1-_2gf1': ['gf1', '_2gf1', 'blue'],
        'gf1-_2gm1': ['gf1', '_2gm1', 'blue'],
        'gm1-_2gf2': ['gm1', '_2gf2', 'blue'],
        'gm1-_2gm2': ['gm1', '_2gm2', 'blue'],
        'gf2-_2gf3': ['gf2', '_2gf3', 'green'],
        'gf2-_2gm3': ['gf2', '_2gm3', 'green'],
        'gm2-_2gf4': ['gm2', '_2gf4', 'green'],
        'gm2-_2gm4': ['gm2', '_2gm4', 'green'],
        'God-_2gf1': ['God', '_2gf1', 'red'],
        'God-_2gf2': ['God', '_2gf2', 'red'],
        'God-_2gf3': ['God', '_2gf3', 'red'],
        'God-_2gf4': ['God', '_2gf4', 'red'],
        'God-_2gm1': ['God', '_2gm1', 'red'],
        'God-_2gm2': ['God', '_2gm2', 'red'],
        'God-_2gm3': ['God', '_2gm3', 'red'],
        'God-_2gm4': ['God', '_2gm4', 'red'],
    };

    const svgRect = document.getElementById('svg').getBoundingClientRect();
    const nodes = {};
    for (const line in lines) {
        const [startNodeId, endNodeId, color] = lines[line];
        const startNode = document.getElementById(startNodeId);
        const endNode = document.getElementById(endNodeId);
        const startX = (startNode.getBoundingClientRect().left + startNode.getBoundingClientRect().right) / 2;
        const startY = (startNode.getBoundingClientRect().top + startNode.getBoundingClientRect().bottom) / 2;
        const endX = (endNode.getBoundingClientRect().left + endNode.getBoundingClientRect().right) / 2;
        const endY = (endNode.getBoundingClientRect().top + endNode.getBoundingClientRect().bottom) / 2;
        nodes[line] = [startX - svgRect.left, startY - svgRect.top, endX - svgRect.left, endY - svgRect.top, color];
    }

    for (const line in nodes) {
        const [x1, y1, x2, y2, color] = nodes[line];
        const lineElement = document.getElementById(line);
        setAttributes(lineElement, {
            'x1': x1,
            'y1': y1,
            'x2': x2,
            'y2': y2,
            'stroke': color,
            'stroke-width': 14,
            'stroke-linecap': 'round'
        });
    }
}

function setAttributes(el, attrs) {
    for (const key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
for (let i = 0; i < nodes.length; i++) {
    let id = nodes[i].id;
    dragElement(document.getElementById(id));

    //Make the DIV element draggagle:
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id)) {
            /* if present, the header is where you move the DIV from:
            */
            document.getElementById(elmnt.id).onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:
           */
            elmnt.onmousedown = dragMouseDown;
        }
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            updateLines();
        }
        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }


}
let screen_ua = document.getElementById("screen_ua");
screen_ua.addEventListener("click", function () {
    location.href = "./index.html";
});

document.getElementById('screen_ua').innerHTML = `
<div id = "GodModal" class="personName-eclipse">
    <div class="personModalInfo">
<div class="titleModal">
<h2> </h2><h1><strong>Б О Г</strong></h1>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">          
	<div class="box visible" id="visible">
    <h2>Отець Небесний - Владика всіх родів</h2><br>
<p><q>Тоді настрашилися страхом вони, бо Бог в 
<strong>праведнім роді</strong></q>
(Псалми 13:5)</p>
<p><strong>Ісус Христо є Голова Церкви.</strong></p><br>
<p><strong>Бог-Творець. Бог-Суддя. Бог-Отець. Бог-Спаситель.
<br><br>
    </div>
        </div>
    </div>
</div>
<!--//////////////  prayer/////////////////////////-->
<!--//////////////  info /////////////////////////-->
<div id = "infoUa" class="personName-eclipse" >
    <div class="personModalInfo">
<div class="titleModal">
<h2>Info</h2>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">
            <h1>Як працювати з шаблоном №2</h1><br><br>
<p>Для успішного опрацювання шаблону треба виконати дві дії:
<p>1. Відкрити у редакторі сторінку index.html і замінти у 
шаблоні імена та фото на свої імена та фото
<p>(name: "Іван"; path_photo: "./photo/Ivan.png"); </p>
<pre>
{
    id: "son", name: "Cин", path_photo: "./photo/son.png", l
},</pre>

<p>2. Відкрити у редакторі сторінку winMoodalData-ua.js і за
вікон</p><br>
---------------------------------------------------<br>
Автор: Івченко Юрій. +380663669013; ivchenko505@gmail.com 
<br>
            </div>
        </div>
    </div>
<!--//////////////////// ////////////////////-->
<!--//////////////  info /////////////////////////-->
<div id = "infoUa-prayer" class="personName-eclipse" >
    <div class="personModalInfo" style="width:600px">
<div class="titleModal">
<h2>Молитва</h2>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">
            <h1>Молитва за Україну</h1><br>
<p>Боже Великий! Боже Всесильний! Ми, грішні діти Твої, у смиренні сердець наших приходимо до Тебе і схиляємо 
голови наші. Отче! Прости провини наші та провини батьків, дідів і прадідів наших. Прийми нині, благаємо 
Тебе, щиру молитву нашу і подяку за безмежне милосердя Твоє до нас. Вислухай наші молитви і прийми благання 
змучених сердець наших. Благослови нашу Батьківщину Україну, волю та щастя їй дай.
Премилосердний Господи, хто вдається до Тебе з благанням, ласку Твою подай.
Благаємо Тебе, Боже Благий, за братів і сестер наших, що на засланні, у в'язницях, на тяжких роботах 
караються і мучаться. За вдовиць, за сиріт, за калік і немічних, і за тих, що Твого Милосердя та допомоги 
Твоєї потребують.
З'єднай нас усіх в єдину велику Христову сім'ю, щоб усі люди, як брати, славили Величне ім'я Твоє завжди – 
нині, і повсякчас, і на віки віків. Амінь.
</p><br>

            </div>
        </div>
    </div>
<!--//////////////////// Son ////////////////////-->
<div id = "son-daugtherModal" class="personName-eclipse" >
    <div class="personModalInfo">
<div class="titleModal">
<img src="./photo/son-1.png" width="48">
<h2>Син</h2>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">
            <p>Про Сина</p>
        </div>
    </div>
</div>
<!--////////  Б А Т Ь К И  ///////////////////////-->
<div id="tatoModal" class="personName-eclipse">
        <div class="personModalInfo">
<div class="titleModal">
<img src="./photo/tato.png" width="48">
<h2>Тато</h2>
<a class="close" href="#">&times;</a>
</div>
<div class="contentModal">
<p>Все про Тата</p><p></p><p></p><p></p>
            </div>
        </div>
    </div>
<!--//////////////////////////////////////-->
<div id = "mamaModal" class="personName-eclipse" >
    <div class="personModalInfo">
<div class="titleModal">
<img src="./photo/mama.png" width="48">
<h2>Мама</h2>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">
            <p>Все про Маму</p>
        </div>
    </div>
</div>
<!--//////////  Д І Д И    ////////////////////-->
<div id = "gFather1Modal" class="personName-eclipse" >
    <div class="personModalInfo">
<div class="titleModal">
<img src="./photo/didus11.png" width="48">
<h2>Двдусь-1</h2>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">
            <p>Все про Дідуся-1</p>
        </div>
    </div>
</div>
<!--///////////////////////////////////////////-->
<div id = "gMather1Modal" class="personName-eclipse" >
    <div class="personModalInfo">
<div class="titleModal">
<img src="./photo/babusia11.png" width="48">
<h2>Бабуся-1</h2>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">
            <p>Все про Бабусю-1</p>
        </div>
    </div>
</div>
<!--///////////////////////////////////////////-->
<div id = "gFather2Modal" class="personName-eclipse" >
    <div class="personModalInfo">
<div class="titleModal">
<img src="./photo/didus22.png" width="48">
<h2>Дідусь-2</h2>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">
            <p>Все про Дідуся-2</p>
        </div>
    </div>
</div>
<!--///////////////////////////////////////////-->
<!--///////////////////////////////////////////-->
<div id = "gMather2Modal" class="personName-eclipse" >
    <div class="personModalInfo">
<div class="titleModal">
<img src="./photo/babusia22.png" width="48">
<h2>Бабуся-2</h2>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">
            <p>Все про Бабусю-2</p>
        </div>
    </div>
</div>
<!--////////////  П Р А Д І Д И/////////////////////////-->
<div id = "2gFather1Modal" class="personName-eclipse" >
    <div class="personModalInfo">
<div class="titleModal">
<img src="./photo/didus11.png" width="48">
<h2>Прадідусь-1</h2>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">
            <p>Все про Прадідуся-1</p>
        </div>
    </div>
</div>

</div>
<!--///////////////////////////////////////////-->
<div id = "2gMather1Modal" class="personName-eclipse" >
    <div class="personModalInfo">
<div class="titleModal">
<img src="./photo/babusia22.png" width="48">
<h2>Прабабуся-1</h2>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">
            <p>Все про Прабабусю-1</p>
        </div>
    </div>
</div>
</div>
<!--///////////////////////////////////////////-->

<div id = "2gFather2Modal" class="personName-eclipse" >
    <div class="personModalInfo">
<div class="titleModal">
<img src="./photo/didus11.png" width="48">
<h2>Прадідусь-2</h2>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">
            <p>Все про Прадідуся-2</p>
        </div>
    </div>
</div>
<!--///////////////////////////////////////////-->
<!--///////////////////////////////////////////-->
<div id = "2gMather2Modal" class="personName-eclipse" >
    <div class="personModalInfo">
<div class="titleModal">
<img src="./photo/babusia22.png" width="48">
<h2>Прабабуся-2</h2>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">
            <p>Все про Прабабусю-2</p>
        </div>
    </div>
</div>
</div>
<!--///////////////////////////////////////////-->
<div id = "2gFather3Modal" class="personName-eclipse" >
    <div class="personModalInfo">
<div class="titleModal">
<img src="./photo/didus11.png" width="48">
<h2>Прадідусь-3</h2>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">
            <p>Все про Прадідуся-3</p>
        </div>
    </div>
</div>
<!--///////////////////////////////////////////-->
<!--///////////////////////////////////////////-->
<div id = "2gMather3Modal" class="personName-eclipse" >
    <div class="personModalInfo">
<div class="titleModal">
<img src="./photo/mama.png" width="48">
<h2>Прабабуся-3</h2>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">
            <p>Все про Прабабусю-3</p>
        </div>
    </div>
</div>
</div>
<!--///////////////////////////////////////////-->

<!--///////////////////////////////////////////-->
<div id = "2gFather4Modal" class="personName-eclipse" >
    <div class="personModalInfo">
<div class="titleModal">
<img src="./photo/didus11.png" width="48">
<h2>Прадідусь-4</h2>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">
            <p>Все про Прадідуся-4</p>
        </div>
    </div>
</div>
<!--///////////////////////////////////////////-->
<!--///////////////////////////////////////////-->
<div id = "2gMather4Modal" class="personName-eclipse" >
    <div class="personModalInfo">
<div class="titleModal">
<img src="./photo/mama.png" width="48">
<h2>Прабабуся-4</h2>
<a class="close" href="#">&times;</a>
</div>
        <div class="contentModal">
            <p>Все про Прабабусю-4</p>
        </div>
    </div>
</div>
</div>
<!--///////////////////////////////////////////-->
<!--///////////////////////////////////////////-->
<!--///////////////////////////////////////////-->
`;
