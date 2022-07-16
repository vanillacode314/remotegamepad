<script lang="ts">
	import { swipe } from '$lib/actions';
	import { controls } from '$lib/stores/user';
	import { difference, isBetween, setsAreEqual } from '$lib/utils';
	import { hapticsImpactLight, hapticsSelectionStart } from '$lib/utils/haptics';
	import type { Vector } from '$lib/utils/vector';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const src: string = '/assets/images/left-stick.png';
	const size: number = 150;
	let offsetX: number = 0;
	let offsetY: number = 0;

	const command = getContext('command') as Writable<object>;

	let lastKeys: Set<string> = new Set();
	function onSwipe(dir: Vector | null) {
		let keys: Set<string> = new Set();
		if (dir === null) {
			for (const key of difference(lastKeys, keys)) {
				$command = { command: 'release', key: key };
			}
			lastKeys = new Set();
			offsetX = 0;
			offsetY = 0;
			return;
		}
		const mag = dir.mag;
		const offset = dir
			.clone()
			.normalize()
			.mult(Math.min(mag, size / 2));
		offsetX = offset.x;
		offsetY = offset.y;

		const angle = (dir.clone().rotate((3 * Math.PI) / 8).angle + 2 * Math.PI) % (2 * Math.PI);
		const c = Math.PI / 4;

		if (isBetween(angle, 0, 3 * c)) {
			keys.add($controls.A1_RIGHT);
		}
		if (isBetween(angle, 2 * c, 5 * c)) {
			keys.add($controls.A1_DOWN);
		}
		if (isBetween(angle, 4 * c, 7 * c)) {
			keys.add($controls.A1_LEFT);
		}
		if (isBetween(angle, 6 * c, 8 * c) || isBetween(angle, 0, c)) {
			keys.add($controls.A1_UP);
		}
		for (const key of difference(lastKeys, keys)) {
			$command = { command: 'release', key: key };
		}
		for (const key of difference(keys, lastKeys)) {
			$command = { command: 'hold', key: key };
		}
		lastKeys = keys;
	}
</script>

<img
	use:swipe={onSwipe}
	alt="analog"
	{src}
	width={size}
	height={size}
	style:transform="translate({offsetX}px, {offsetY}px)"
	on:touchstart={hapticsImpactLight}
/>

<style lang="scss">
	img {
		transform-origin: center;
		grid-area: analog1;
		object-fit: contain;
		place-self: center;
	}
</style>
