class Board{
	constructor(){
		this.rows=20;
		this.columns=10;
		this.piece = new Piece();
		this.score = 0;
	}
	reset(){
		this.grid = this.getEmptyBoard();
	}
	
	getEmptyBoard(){
		var array = new Array(20);
		for(var y = 0;y<20;y++){
			array[y] = new Array(10)
			for(var x = 0;x<10;x++){
				array[y][x] = 0;
			}
		}
		
		return array;
	}
	freeze(){
		this.piece.shape.forEach((row,y)=>{
			row.forEach((value,x)=>{
				if(value>0&&this.piece.y+y<=20&&this.piece.x+x<=9){
					this.grid[this.piece.y+y][this.piece.x+x] = value;
				}
			});
		});
		var count = 0;
		this.grid.forEach((row, y) => {
			if (row.every(value => value > 0)) {
				count++;
				this.grid.splice(y, 1);
				this.grid.unshift(Array(this.columns).fill(0));
				board.draw();
			} 
		});
		if(count==4) this.score+=800;
		else if(count==3) this.score+=400;
		else if(count==2) this.score+=200;
		else if(count==1) this.score+=100;
	}
	draw(){
		this.piece.draw();
		this.drawBoard();
		
	}
	drawBoard(){
		 this.grid.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value > 0) {
					ctx.fillStyle = this.piece.colorArr[value];
					ctx.fillRect(x, y, 1, 1);
				}
			});
		});
	}
	valid(){
		var valid = true;
		this.piece.shape.forEach((row,y)=>{
			row.forEach((value,x)=>{
				if(value>0){
					if(((this.piece.x+x)<0||(this.piece.x+x)>9)) valid = false;
					if(((this.piece.y+y)>19)) valid = false;
					if(this.piece.y+y<20){
						if(this.grid[this.piece.y+y][this.piece.x+x]!=0) valid = false;
					}
				}
			});
		});
		return valid;
	}
}