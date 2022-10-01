import undoable from './undoable.js';
import { uuidv4, clone } from '@grfx/utils';
import produce, {applyPatches} from "immer";

const List = {
	append: (item) => (arr) => {
		arr.push(item);
	},
	duplicate: (pred, newId) => (arr) => {
		const layer = clone(arr.find(pred));
		layer.id = newId;
		arr.push(layer);
	},
	insertBefore: (pred, item) => (arr) => {
		pred && arr.splice(arr.findIndex(pred)-1, 0, item);
	},
	prepend: (item) => (arr) => {
		arr.unshift(item);
	},
	remove: (pred) => (arr) => {
		pred && arr.splice(arr.findIndex(pred), 1);
	},
	update: (pred, updates={}) => (arr) => {
		const x = pred && arr.find(pred) || {};
		for(const [k,v] of Object.entries(updates)){
			x[k] = v;
		}
	},
	select: (pred) => (arr) => {
		for(const item of arr){
			item.selected = pred(item);
		}
	}
};

const Setter = (state) => (actions) => {
	for(const [i, a] of Object.entries(actions)){
		const [ path, handler] = a;
		const opts = i > 0 ? { breakpoint: false } : {};
		(path
			? state.setter(path, opts)(handler)
			: handler && handler()
		);
	}
};

const Layer = (state) => ({
	add: (layer) => {
		layer.id = uuidv4();
		Setter(state)([
			["file/layers", List.append(layer)],
			["file/layerOrder", List.prepend(layer.id)],
			["file/history", List.append('layerAdd')],
		]);
	},
	duplicate: (id) => {
		const newId = uuidv4();
		Setter(state)([
			["file/layers", List.duplicate(x => x.id === id, newId)],
			["file/layerOrder", List.insertBefore(x => x.id === id, newId)],
			["file/history", List.append('layerDuplicate')],
		]);
	},
	remove: (id) => Setter(state)([
		["file/layers", List.remove(x => x.id === id)],
		["file/layerOrder", List.remove(x => x === id)],
		["file/history", List.append('layerRemove')],
	]),
	update: (id, updates) => Setter(state)([
		["file/layers", List.update(x => x.id === id, updates)],
		["file/history", List.append('layerUpdate')],
	]),
	select: (id) => Setter(state)([
		["file/layers", List.select(x => x.id === id)],
		["file/history", List.append('layerSelect')],
	]),
	order: (order) => Setter(state)([
		["file/layerOrder", order],
		["file/history", List.append('layerOrder')],
	])
});

const fileObserveMiddleware = (fn) => {
	let stack;
	const stackHistory=[];
	let stackRedo;
	return (state, { patch }) => {
		stack = stack || [];
		stack.push(patch);
		let isUndo;
		if(stackRedo?.length === 1){
			isUndo = true;
			stackRedo = undefined;
		}
		if(patch.path.startsWith('/file/history/length')){
			stackRedo = clone(stackHistory[patch.value]);
		}
		if(stackRedo?.length){
			stackRedo.pop();
			return;
		}
		const stackAction = stack.find(x =>
			x.path.startsWith('/file/history/')
		);
		if(!stackAction) return
		const isNew = !stackHistory.find(s => s.find(p => p.path === stackAction.path))
		if(!isUndo && isNew){
			stackAction.type = stackAction.value;
			stackHistory.push(stack);
		} else {
			stackAction.type = isUndo ? "undo": "redo"
		}
		fn(state, stack);
		stack = undefined;
	}
};

export class HostState {
	detach;
	undoable;

	constructor(initialState, changeHandler){
		this.undoable = undoable(initialState);
		this.observe(changeHandler);
		this.layer = Layer(this.undoable);
		this.undo = this.undoable.undo;
		this.redo = this.undoable.redo;
		this.get = this.undoable.get;
	}
	observe(handler){
		if(this.detach) this.detach();
		this.detach = this.undoable.observe(
			fileObserveMiddleware(handler)
		);
	}
	set canvas(args){ this.set.canvas(args); }
	set layers(args){ this.set.layers(args); }
	set tool(args){ this.set.tool(args); }
	set zoom(args){ this.set.zoom(args); }

	undo(){ this.history.file.undo(); }
	redo(){ this.history.file.undo(); }
};

export const ClientState = (state, patches) => {
	// see: https://medium.com/@mweststrate/distributing-state-changes-using-snapshots-patches-and-actions-part-2-2f50d8363988
	function immerPath(path) {
		if (!path) return [];
		const immerPath = path
			.replaceAll("\\/", ":::")
			.split("/");
		immerPath.shift();
		return immerPath.map((p) => p.replaceAll(":::", "/"));
	}
	return applyPatches(state, patches.map(x => {
		x.path = immerPath(x.path);
		return x
	}));
};