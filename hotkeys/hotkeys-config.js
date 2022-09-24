export default {
	moveTool: (k) => [ k.code === "KeyV" ],
	transformTool: (k) => [ k.code === "KeyT", k.altKey, k.ctrlKey || k.metaKey ],
	lassoTool: (k) => [ k.code === "KeyL" ],
	quickSelectionTool: (k) => [ k.code === "KeyW" ],
	marqueeTool: (k) => [ k.code === "KeyM" ],
	switchMarqueeTool: (k) => [ k.code === "KeyM", k.shiftKey ],
	brushTool: (k) => [ k.code === "KeyB" ],
	eraserTool: (k) => [ k.code === "KeyE" ],
	paintGradientTool: (k) => [ k.code === "KeyG" ],
	switchPaintGradientTool: (k) => [ k.code === "KeyG", k.shiftKey ],
	spotHealingBrushTool: (k) => [ k.code === "KeyJ" ],
	CloneStampTool: (k) => [ k.code === "KeyS" ],
	eyedropperTool: (k) => [ k.code === "KeyI" ],
	switchFGandBGColors: (k) => [ k.code === "KeyX" ],
	undo: (k) => [ k.code === "KeyZ", k.ctrlKey || k.metaKey ],
	redo: (k) => [ k.code === "KeyZ", k.shift, k.ctrlKey || k.metaKey ],
	selectAll: (k) => [ k.code === "KeyA", k.ctrlKey || k.metaKey ],
	deselect: (k) => [ k.code === "KeyD", k.ctrlKey || k.metaKey ],
	reselect : (k) => [ k.code === "KeyD", k.shiftKey, k.ctrlKey || k.metaKey ],
	invertSelection: (k) => [ k.code === "KeyI", k.shiftKey, k.ctrlKey || k.metaKey ],
	invertImage: (k) => [ k.code === "KeyI", k.ctrlKey || k.metaKey ],
	zoomIn: (k) => [ k.code === "Equal", k.ctrlKey || k.metaKey ],
	zoomOut: (k) => [ k.code === "Minus", k.ctrlKey || k.metaKey ],
	zoomFit: (k) => [ k.code === "Digit0", k.ctrlKey || k.metaKey ],
	zoom100: (k) => [ k.code === "Digit1", k.ctrlKey || k.metaKey ],
	zoom200: (k) => [ k.code === "Digit2", k.ctrlKey || k.metaKey ],
	save: (k) => [ k.code === "KeyS", k.ctrlKey || k.metaKey ],
	export: (k) => [ k.code === "KeyW", k.altKey, k.shiftKey, k.ctrlKey || k.metaKey ],
	fileInfo: (k) => [ k.code === "KeyI", k.altKey, k.shiftKey, k.ctrlKey || k.metaKey ],
	newLayer: (k) => [ k.code === "KeyN", k.altKey, k.shiftKey, k.ctrlKey || k.metaKey ],
	newLayerViaCopy:  (k) => [ k.code === "KeyJ", k.ctrlKey || k.metaKey ],
	newLayerViaCut: (k) => [ k.code === "KeyJ", k.shiftKey, k.ctrlKey || k.metaKey ],
	createReleaseClippingMask: (k) => [ k.code === "KeyG", k.altKey, k.ctrlKey || k.metaKey ],
	groupLayers: (k) => [ k.code === "KeyG", k.ctrlKey || k.metaKey ],
	ungroupLayers: (k) => [ k.code === "KeyG", k.shiftKey, k.ctrlKey || k.metaKey ],
	hideLayers: (k) => [ k.code === "Comma", k.ctrlKey || k.metaKey ],
	selectAllLayers: (k) => [ k.code === "KeyA", k.altKey, k.ctrlKey || k.metaKey ],
	selectTopLayer: (k) => [ k.code === "Period", k.altKey ],
	selectBottomLayer: (k) => [ k.code === "Comma", k.altKey ],
	bringToFront: (k) => [ k.code === "BracketRight", k.altKey, k.ctrlKey || k.metaKey ],
	bringForward: (k) => [ k.code === "BracketRight", k.ctrlKey || k.metaKey ],
	sendBackward: (k) => [ k.code === "BracketLeft", k.ctrlKey || k.metaKey ],
	sendToBack: (k) => [ k.code === "BracketLeft", k.altKey, k.ctrlKey || k.metaKey ],
	lockLayers: (k) => [ k.code === "Slash", k.ctrlKey || k.metaKey ],
	mergeLayers: (k) => [ k.code === "KeyE", k.ctrlKey || k.metaKey ],
	mergeVisible: (k) => [ k.code === "KeyE", k.shiftKey, k.ctrlKey || k.metaKey ],
	showSettings: (k) => [ k.code === "KeyK", k.ctrlKey || k.metaKey ],
	keyboardShortcuts: (k) => [ k.code === "KeyK", k.altKey, k.shiftKey, k.ctrlKey || k.metaKey ],
};
