const currentDisplay=document.getElementById("current");
const previousDisplay=document.getElementById("previous");

let input="0";
let reset=false;

function appendNumber(num){

if(input==="0"||reset){
input="";
reset=false;
}

input+=num;
update();

}

function appendOperator(op){

input+=" "+op+" ";
update();

}

function appendFunction(fn){

if(input==="0"||reset){
input=fn+"(";
reset=false;
}else{
input+=fn+"(";
}

update();

}

function appendConstant(c){

if(input==="0")input="";
input+=c;

update();

}

function update(){

let view=input
.replace(/Math\.PI/g,"π")
.replace(/Math\.sin/g,"sin")
.replace(/Math\.cos/g,"cos")
.replace(/Math\.tan/g,"tan")
.replace(/Math\.log10/g,"log")
.replace(/Math\.log/g,"ln")
.replace(/Math\.sqrt/g,"√")
.replace(/Math\.exp/g,"exp")
.replace(/\*\*/g,"^")
.replace(/\*/g,"×")
.replace(/\//g,"÷");

currentDisplay.innerText=view;

}

function calculate(){

try{

let open=(input.match(/\(/g)||[]).length;
let close=(input.match(/\)/g)||[]).length;

while(open>close){
input+=")";
close++;
}

let result=eval(input);

if(result===Infinity||isNaN(result)){
throw "error";
}

previousDisplay.innerText=currentDisplay.innerText+" =";

input=parseFloat(result.toFixed(8)).toString();

reset=true;

update();

}catch{

currentDisplay.innerText="Error";
currentDisplay.classList.add("error");

setTimeout(()=>{
currentDisplay.classList.remove("error")
},400)

input="0";
reset=true;

}

}

function backspace(){

if(input.length>1){
input=input.trim().slice(0,-1);
}else{
input="0";
}

update();

}

function allClear(){

input="0";
previousDisplay.innerText="";
update();

}

function toggleTheme(){

document.body.classList.toggle("light");

}

window.addEventListener("keydown",e=>{

if(e.key>=0&&e.key<=9)appendNumber(e.key);

if(e.key===".")appendNumber(".");

if(["+","-","*","/","%"].includes(e.key))
appendOperator(e.key);

if(e.key==="Enter"){
e.preventDefault();
calculate();
}

if(e.key==="Backspace")backspace();

if(e.key==="Escape")allClear();

});