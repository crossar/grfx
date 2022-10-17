// https://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
function ellipse(ctx, x, y, w, h) {
	var kappa = .5522848,
		ox = (w / 2) * kappa, // control point offset horizontal
		oy = (h / 2) * kappa, // control point offset vertical
		xe = x + w,           // x-end
		ye = y + h,           // y-end
		xm = x + w / 2,       // x-middle
		ym = y + h / 2;       // y-middle

	ctx.moveTo(x, ym);
	ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
}

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
	ellipse(ctx, startX, startY, x2-startX, y2-startY);
	ctx.fill();

	ctx.beginPath();
	ellipse(ctx, startX, startY, x2-startX, y2-startY);
	ctx.stroke();

	if(x1 === x2 && y1 === y2){
		startX = undefined;
		startY = undefined;
	}
};
