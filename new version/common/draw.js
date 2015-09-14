
function point(x,y) {
    this.X = x;
    this.Y = y;
}

var Nagib = new point(20,20);
var Opera = new point(40, 40);
var Dokki = new point(50, 70);
var Bhoos = new point(70, 100);
var Gam3a = new point(80, 110);
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.strokeStyle = '#000000';
ctx.moveTo(Nagib.X,Nagib.Y);
ctx.lineTo(Opera.X,Opera.Y);
ctx.stroke();
ctx.beginPath();
ctx.strokeStyle = '#ff0000';
ctx.moveTo(Opera.X,Opera.Y);
ctx.lineTo(Dokki.X,Dokki.Y);
ctx.stroke();
ctx.beginPath();
ctx.strokeStyle = '#ff0000';
ctx.moveTo(Dokki.X,Dokki.Y);
ctx.lineTo(Bhoos.X,Bhoos.Y);
ctx.stroke();
ctx.beginPath();
ctx.strokeStyle = '#000000';
ctx.moveTo(Bhoos.X,Bhoos.Y);
ctx.lineTo(Gam3a.X,Gam3a.Y);
ctx.stroke();



ctx.font = "10px Arial";
ctx.fillText("Nagib",20,20);
ctx.fillText("Opera",40,40);
ctx.fillText("Dokki",50,70);
ctx.fillText("Bhoos",70,100);
ctx.fillText("Gam3a",80,110);