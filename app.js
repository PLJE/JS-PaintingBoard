const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //캔버스의 context가 필요함
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "##2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE; //css와 마찬가지로 여기서도 실제 pixel 사이즈 설정해줘야함

ctx.fillStyle="white";
ctx.fillRect(0,0,"white","white");
ctx.strokeStyle = INITIAL_COLOR; // line color setting 
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // line width setting

let painting = false;
let filling= false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ //클릭하지 않고 마우스를 움직일 때는 path를 시작함. path는 line. 
        ctx.beginPath();
        ctx.moveTo(x,y);// path를 만들면 마우스의 x,y 좌표로 path를 옮긴다
    }else{ //click
        ctx.lineTo(x,y);
        ctx.stroke(); 
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS"
    link.click();
}

if(canvas){ 
    canvas.addEventListener("mousemove",onMouseMove); //want to detect mouse movement in canvas(div)
    canvas.addEventListener("mousedown" , startPainting); //detect mouse click
    canvas.addEventListener("mouseup" , stopPainting); //detect mouse up
    canvas.addEventListener("mouseleave" , stopPainting); //when mouse move to out of the canvas
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

//console.log(Array.from(colors)); //object를 array로 
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input" , handleRangeChange)
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}