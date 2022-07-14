import { isBetween } from '$lib/utils';
import { Vector } from '$lib/utils/vector';

export type Handler = (direction: string) => void;

export function swipe(node: HTMLElement, handler: Handler) {
	const p0: Vector = new Vector(0, 0);
	const threshold: number = 30; // in pixels

	function onTouchStart(e: TouchEvent) {
		const touch = e.changedTouches[0];
		p0.set(touch.clientX, touch.clientY);
	}

	function onTouchMove(e: TouchEvent) {
		const touch = e.changedTouches[0];
		const p1: Vector = new Vector(touch.clientX, touch.clientY);
		const dp: Vector = p1.sub(p0);
		const phase_shift: number = Math.PI / 4;

		if (dp.mag() >= threshold) {
			const angle = dp.rotate(phase_shift).angle(true);
			if (isBetween(angle, 0, 45)) {
				handler('R');
			} else if (isBetween(angle, 45, 90)) {
				handler('DR');
			} else if (isBetween(angle, 90, 135)) {
				handler('D');
			} else if (isBetween(angle, 135, 180)) {
				handler('DL');
			} else if (isBetween(angle, -180, -135)) {
				handler('L');
			} else if (isBetween(angle, -135, -90)) {
				handler('UL');
			} else if (isBetween(angle, -90, -45)) {
				handler('U');
			} else if (isBetween(angle, -45, 0)) {
				handler('UR');
			}
		}
	}

	function onTouchEnd() {
		handler('end');
	}
	node.addEventListener('touchstart', onTouchStart);
	node.addEventListener('touchmove', onTouchMove);
	node.addEventListener('touchend', onTouchEnd);
	return {
		destroy() {
			node.removeEventListener('touchstart', onTouchStart);
			node.removeEventListener('touchmove', onTouchMove);
			node.removeEventListener('touchend', onTouchEnd);
		}
	};
}
