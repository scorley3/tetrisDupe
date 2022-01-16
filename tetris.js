var columns = 10;
var rows = 20;
var blockSize = 30;
var watch = 0;
var started = true;
var hold = 0;
const canvas = document.getElementById("board");
const ctx = canvas.getContext('2d');
ctx.canvas.width = columns * blockSize;
ctx.canvas.height = rows * blockSize;
ctx.scale(blockSize,blockSize);
const nextCan = document.getElementById("next1");
const ctx1 = nextCan.getContext('2d');
ctx1.canvas.width = 4 * blockSize;
ctx1.canvas.height = 4 * blockSize;
ctx1.scale(blockSize,blockSize);
const holdCan = document.getElementById("next2");
const ctx2 = holdCan.getContext('2d');
ctx2.canvas.width = 4* blockSize;
ctx2.canvas.height = 4* blockSize;
ctx2.scale(blockSize,blockSize);
var nextPiece = new Piece(ctx,ctx1,ctx2);
let board = new Board();
board.reset();
var piece = new Piece(ctx,ctx1,ctx2);
startTime();
piece.draw();
board.piece = piece;
document.addEventListener("keydown",move);
function move(event){
	piece.move(event.keyCode);
}
function holdPiece(){
	console.log("func");
	if(hold!=0){
		var placeHolder = piece;
		piece = hold;
		board.piece = piece;
		hold = placeHolder;
	}
	else{
		hold = piece; 
		piece = nextPiece;
		board.piece = piece;
		nextPiece = new Piece(ctx,ctx1,ctx2);
	}
	startTime();
	board.draw();
	animate();
	hold.drawHold();
	nextPiece.drawNext();
	
}
document.addEventListener("keydown",keyListen);
function keyListen(event){
	if(event.keyCode==32){
		board.score+=20;
		switchPiece();
	}
	else if(event.keyCode==27) pause();
	else if(event.keyCode==67) holdPiece();
}
function switchPiece(){
	piece = nextPiece;
	board.piece = nextPiece;
	nextPiece = new Piece(ctx,ctx1,ctx2);
	nextPiece.drawNext();
	if(board.valid()){
		clearInterval(watch);
		startTime();
		board.draw();
	}
	else gameOver();
}
function gameOver(){
	document.getElementById("status").innerHTML = "game over";
	clearInterval(watch);
	document.removeEventListener("keydown",keyListen);
	document.removeEventListener("keydown",move);
}
function animate() {
	document.getElementById("num").innerHTML=board.score;
	if(piece.y<20) {
			piece.y++;
	}
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
	if(!board.valid()){
		if(piece.y>0){ piece.y--;}
		board.freeze();
		switchPiece();
	}
    board.draw();  
}
function startTime(){
		clearInterval(watch);	
		watch = setInterval(animate,500);
	}	
function play(){
		board.reset();
		console.table(board.grid);
}
play();
document.getElementById("pause").addEventListener("click",pause);
function pause(){
	clearInterval(watch);
	if(!started){
		started = true;
		watch = setInterval(animate,500);
	}
	else started = false;
}
		
	
