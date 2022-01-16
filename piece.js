class Piece{
	constructor(ctx,ctx1,ctx2){

		this.ctx = ctx;
		this.ctx1 = ctx1;
		this.ctx2 = ctx2;
		this.colorArr = ['none','orange','yellow','purple','cyan','red','green','blue'];
		let shapeArr1 = [
		[[7,0,0],[7,7,7],[0,0,0]],
		[[0,7,7],[0,7,0],[0,7,0]],
		[[0,0,0],[7,7,7],[0,0,7]],
		[[0,7,0],[0,7,0],[7,7,0]]];
		let shapeArr2 = [
		[[0,0,1],[1,1,1],[0,0,0]],
		[[0,1,0],[0,1,0],[0,1,1]],
		[[0,0,0],[1,1,1],[1,0,0]],
		[[1,1,0],[0,1,0],[0,1,0]]];
		let shapeArr3 = [
		[[2,2,0],[2,2,0],[0,0,0]],
		[[2,2,0],[2,2,0],[0,0,0]],
		[[2,2,0],[2,2,0],[0,0,0]],
		[[2,2,0],[2,2,0],[0,0,0]]];
		let shapeArr4 = [
		[[0,3,0],[3,3,3],[0,0,0]],
		[[0,3,0],[0,3,3],[0,3,0]],
		[[0,0,0],[3,3,3],[0,3,0]],
		[[0,3,0],[3,3,0],[0,3,0]]];
		let shapeArr5 = [
		[[4,4,4,4]],
		[[4],[4],[4],[4]],
		[[4,4,4,4]],
		[[4],[4],[4],[4]]];
		let shapeArr6 = [
		[[0,0,0],[5,5,0],[0,5,5]],
		[[0,5,0],[5,5,0],[5,0,0]],
		[[0,0,0],[5,5,0],[0,5,5]],
		[[0,5,0],[5,5,0],[5,0,0]]];
		let shapeArr7 = [
		[[0,0,0],[0,6,6],[6,6,0]],
		[[6,0,0],[6,6,0],[0,6,0]],
		[[0,0,0],[0,6,6],[6,6,0]],
		[[6,0,0],[6,6,0],[0,6,0]]];
		this.shapeArr = [shapeArr2,shapeArr3,shapeArr4,shapeArr5,shapeArr6,shapeArr7,shapeArr1];
		this.shapeChoice = Math.floor(Math.random()*7);
		this.color = this.colorArr[this.shapeChoice+1];
		this.shape = this.shapeArr[this.shapeChoice][0];
		this.x=3;
		this.y=0;
		this.index = 0;
		
	
	}
	draw(){
		this.ctx.fillStyle = this.color;
		if(board.valid()){
			this.shape.forEach((row,y) =>{
				row.forEach((value,x)=>{
					if(value>0) this.ctx.fillRect(this.x+x,this.y+y,1,1);
				});
			});
		}
	}
	drawNext(){
		this.ctx1.fillStyle = "gray" ;
		this.ctx1.fillRect(0,0,4,4);
		this.ctx1.fillStyle = this.color;
		this.shape.forEach((row,y) =>{
				row.forEach((value,x)=>{
					if(value>0) this.ctx1.fillRect(x,y,1,1);
				});
			});
	}
	drawHold(){
		this.ctx2.fillStyle = "gray";
		this.ctx2.fillRect(0,0,4,4);
		this.ctx2.fillStyle = this.color;
		this.shape.forEach((row,y) =>{
				row.forEach((value,x)=>{
					if(value>0) this.ctx2.fillRect(x,y,1,1);
				});
			});
	}
	move(keyCode){
		if(keyCode==39){
			if(this.x<9) this.x++;
			if(board.valid()){
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
				board.draw();
			}
			else this.x--;
		}
		else if(keyCode==37){
			if(this.x>-1) this.x--;
			if(board.valid()){
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
				board.draw();
			}
			else this.x++;
		}
		else if(keyCode==40){
			if(this.y<19) this.y++;
			if(board.valid()){
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
				board.draw();
			}
			else this.y--;
		}
		else if(keyCode==38){
			if(this.index<3) this.index++;
			else this.index=0;
			this.shape = this.shapeArr[this.shapeChoice][this.index];
			if(board.valid()){
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
				board.draw();
			}
			else{
				while(this.y>17){
					this.y--;
				}
				var x = this.x;
				console.log(this.x);
				if(this.x=0) this.x++;
				if(this.x>=8)x--;
				console.log(this.x);
				if(board.valid()){
					board.draw();
				}
				else{
					this.index--;
				}
			}
		}
		else if(keyCode==32){
			while(board.valid()&&this.y<19){
				this.y++;
			}
			ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
			if(board.valid()){
				this.draw();
				board.freeze();
			}
			else{
				while(!board.valid()){
					this.y--;
				}
				board.draw();
				board.freeze();
			}
		}
	}
}