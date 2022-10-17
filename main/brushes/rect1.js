
let startX;
let startY;
let drawOver;

export default (ctx, radius, path, opts={}) => {
	if(opts?.color?.primary){
		ctx.fillStyle = opts.color.primary;
		ctx.strokeStyle = opts.color.secondary;
	}
	const {x1, y1, x2, y2} = path;

	drawOver && ctx.putImageData(drawOver,0,0);
	drawOver = drawOver || ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
	startX = startX || x1;
	startY = startY || y1;

	ctx.beginPath();
	ctx.rect(startX, startY, x2-startX, y2-startY);
	ctx.fill();

	ctx.beginPath();
	ctx.rect(startX, startY, x2-startX, y2-startY);
	ctx.stroke();

	if(x1 === x2 && y1 === y2){
		startX = undefined;
		startY = undefined;
		drawOver = undefined;
	}
};
