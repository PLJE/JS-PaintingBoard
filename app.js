const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //캔버스의 context가 필요함

canvas.width = 700;
canvas.height = 700; //css와 마찬가지로 여기서도 실제 pixel 사이즈 설정해줘야함

ctx.strokeStyle = "##2c2c2c"; // line color setting 
ctx.lineWidth = 2.5; // line width setting

let painting = false;

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

function onMouseDown(event){
    painting = true;
}

if(canvas){ 
    canvas.addEventListener("mousemove",onMouseMove); //want to detect mouse movement in canvas(div)
    canvas.addEventListener("mousedown" , startPainting); //detect mouse click
    canvas.addEventListener("mouseup" , stopPainting); //detect mouse up
    canvas.addEventListener("mouseleave" , stopPainting); //when mouse move to out of the canvas
}