<script lang="ts">
	import { swipe } from '$lib/actions';
	import { getContext } from 'svelte';
	import type { writable } from 'svelte/store';

	let src: string = '/assets/analog/button_xbox_digital_analog_click_dark_3.png';
	let angle: number = 0;
	let lastKeys: string[] = [];

	const command = getContext('command') as writable;

	function updateImage(direction: string) {
		src = '/assets/analog/button_xbox_digital_analog_click_dark_6.png';
		switch (direction) {
			case 'U':
				angle = 0;
				break;
			case 'UR':
				angle = 45;
				break;
			case 'R':
				angle = 90;
				break;
			case 'DR':
				angle = 135;
				break;
			case 'D':
				angle = 180;
				break;
			case 'DL':
				angle = 225;
				break;
			case 'L':
				angle = 270;
				break;
			case 'UL':
				angle = 315;
				break;
			case 'end':
				src = '/assets/analog/button_xbox_digital_analog_click_dark_3.png';
				angle = 0;
				break;
		}
	}

	function processKey(keys: string[]) {
		if (JSON.stringify(keys) === JSON.stringify(lastKeys)) return;
		lastKeys = keys;
		for (const key of lastKeys) {
			$command = { command: 'release', key: key };
		}
		for (const key of keys) {
			$command = { command: 'hold', key };
		}
	}

	function onSwipe(direction: string) {
		updateImage(direction);

		switch (direction) {
			case 'U':
				processKey(['up']);
				break;
			case 'UR':
				processKey(['up', 'right']);
				break;
			case 'R':
				processKey(['right']);
				break;
			case 'DR':
				processKey(['down', 'right']);
				break;
			case 'D':
				processKey(['down']);
				break;
			case 'DL':
				processKey(['down', 'left']);
				break;
			case 'L':
				processKey(['left']);
				break;
			case 'UL':
				processKey(['up', 'left']);
				break;
			case 'end':
				$command = { command: 'release', key: lastKeys };
				break;
		}
	}
</script>

<img
	use:swipe={onSwipe}
	alt="analog"
	{src}
	width="200"
	height="200"
	style:transform="rotate({angle}deg)"
/>

<style lang="scss">
	img {
		grid-area: analog;
		transition: transform 0.2s ease-out;
		object-fit: contain;
	}
</style>
