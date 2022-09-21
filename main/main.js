import { listen, send } from '../shared/messages.js';
import { sleep } from '../shared/utils.js';
import Canvas from './canvas.js';
import layerDef from './layers/layerDef.js';
import './cursor.js';
import attachDraw from './draw.js';

const container = document.querySelector('.canvasContainer');
let canvas;

// https://stackoverflow.com/a/66874077
const mouseStrength = 1.4;
const pinchStrength = 0.002;
let scale;

const setScale = (s) => {
	scale = s;
	container.style.transform = `scale(${s})`;
};

document.body.addEventListener('wheel', (ev) => {
	let _scale = scale || 1;
	ev.preventDefault();
	ev.stopPropagation();

	const isPinch = Math.abs(ev.deltaY) < 50;

	if (isPinch) {
		const factor = 1 - pinchStrength * ev.deltaY;
		_scale *= factor;
		//console.log(`Pinch: scale is ${_scale}`);
	} else {
		const factor = ev.deltaY < 0
			? mouseStrength
			: 1.0 / mouseStrength;
		_scale *= factor;
		//console.log(`Mouse: scale is ${_scale}`);
	}

	setScale(_scale);

}, { passive: false });


listen('file-update', async (args) => {
	const { layers, width, height, zoom, tool } = args;

	canvas = canvas || await Canvas({
		width,
		height,
		layers: layers.reverse().map(layer => ({
			...layer,
			render: layerDef(layer)
		})),
		container
	});
	attachDraw(canvas, tool);
	setScale(zoom);

	//right/sidebarReady.js:51
	for(const layer of layers){
		if(layer.dirty){
			console.log('layer is dirty')
			await canvas.renderFns[layer.number].update({
				...layer,
				render: layerDef(layer)
			});
		}
		const canvasLayer = canvas.layers[layer.number];
		const render = canvas.renderFns[layer.number];
		if(!canvasLayer) continue;

		if(layer.visible !== undefined)
			canvasLayer.visible = layer.visible;
		if(layer.blendMode !== undefined){
			canvasLayer.blendMode = layer.blendMode;
		}

		await render(layer);
	}
	canvas.viewport.render();
	send('update-thumbs', { thumbs: canvas.thumbs });
	return;

});

send('ping', 'main');

