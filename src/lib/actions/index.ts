import { Vector } from '$lib/utils/vector';

export type Handler = (direction: Vector | null) => void;

export function swipe(node: HTMLElement, handler: Handler) {
	const { width, height, top, left } = node.getBoundingClientRect();
	let p0: Vector = new Vector(left + width / 2, top + height / 2);

	function onTouchStart(e: TouchEvent) {
		// const touch = e.changedTouches[0];
		const { width, height, top, left } = node.getBoundingClientRect();
		p0 = new Vector(left + width / 2, top + height / 2);
	}

	function onTouchMove(e: TouchEvent) {
		const touch = e.changedTouches[0];
		const p1: Vector = new Vector(touch.clientX, touch.clientY);
		const dp: Vector = p1.sub(p0);
		handler(dp);
	}

	function onTouchEnd() {
		handler(null);
	}
	node.addEventListener('touchstart', onTouchStart);
	node.addEventListener('touchmove', onTouchMove);
	node.addEventListener('touchend', onTouchEnd);
	node.addEventListener('touchcanel', onTouchEnd);
	return {
		destroy() {
			node.removeEventListener('touchstart', onTouchStart);
			node.removeEventListener('touchmove', onTouchMove);
			node.removeEventListener('touchend', onTouchEnd);
			node.removeEventListener('touchcancel', onTouchEnd);
		}
	};
}
