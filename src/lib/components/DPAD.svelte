<script lang="ts">
	import { controls } from '$lib/stores/user';

	import { isBetween } from '$lib/utils';

	import { hapticsImpactLight } from '$lib/utils/haptics';
	import { Vector } from '$lib/utils/vector';

	let src: string = '/assets/images/dpad.png';

	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	const command = getContext('command') as Writable<object>;

	let center = new Vector(0, 0);
	let lastKey: string = '';
	function processTouch(touch: Touch) {
		const p = new Vector(touch.clientX, touch.clientY);
		const dp = p.sub(center);
		const angle = dp.angle * (180 / Math.PI);
		let key;
		if (isBetween(angle, -45, 45)) {
			src = '/assets/images/dpad-right.png';
			key = $controls.DPAD_RIGHT;
		} else if (isBetween(angle, 45, 135)) {
			src = '/assets/images/dpad-down.png';
			key = $controls.DPAD_DOWN;
		} else if (isBetween(angle, 135, 225)) {
			src = '/assets/images/dpad-left.png';
			key = $controls.DPAD_LEFT;
		} else {
			src = '/assets/images/dpad-up.png';
			key = $controls.DPAD_UP;
		}
		if (key !== lastKey) {
			hapticsImpactLight();
			$command = { command: 'release', key: lastKey };
			$command = { command: 'hold', key: key };
			lastKey = key;
		}
	}
	function onTouchmove(e: TouchEvent) {
		const { width, height, top, left } = e.target.getBoundingClientRect();
		const touch = e.touches[0];
		processTouch(touch);
	}

	function onTouchstart(e: TouchEvent) {
		const { width, height, top, left } = e.target.getBoundingClientRect();
		center.set(left + width / 2, top + height / 2);
		const touch = e.touches[0];
		processTouch(touch);
	}

	function onTouchend(e: TouchEvent) {
		const { width, height, top, left } = e.target.getBoundingClientRect();
		src = '/assets/images/dpad.png';
		$command = { command: 'release', key: lastKey };
		lastKey = '';
	}
</script>

<div class="container">
	<img
		{src}
		width="150"
		height="150"
		alt="dpad"
		on:touchstart={onTouchstart}
		on:touchend={onTouchend}
		on:touchmove={onTouchmove}
		on:touchcancel={onTouchend}
	/>
</div>

<style lang="scss">
	.container {
		grid-area: dpad;
		display: grid;
		place-items: center;
		place-self: end center;
	}

	img {
		display: block;
		object-fit: contain;
	}
</style>
