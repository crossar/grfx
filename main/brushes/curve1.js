let startX;
let startY;

export default (ctx, radius, path, opts={}) => {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	if(opts?.color?.primary){
		ctx.fillStyle = opts.color.primary;
		ctx.strokeStyle = opts.color.secondary;
	}
	const {x1, y1, x2, y2} = path;
	startX = startX || x1;
	startY = startY || y1;

	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(x2, y2);
	ctx.stroke();

	if(x1 === x2 && y1 === y2){
		startX = undefined;
		startY = undefined;
	}
};