<script lang="ts">
	import { timerStore } from '$lib/stores/timer';

	import { hapticsImpactLight } from '$lib/utils/haptics';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/// STATE ///
	export let type: 'a' | 'b' | 'x' | 'y' | 'start' | 'select';
	const src: string = `/assets/images/${type}.png`;
	const size = (150 / 7) * 3;
	let pressed: boolean = false;
	let timeUp;

	function onTouchstart() {
		timeUp = timerStore(100);
		hapticsImpactLight();
		pressed = true;
		dispatch('hold');
	}

	function onTouchend() {
		if ($timeUp) {
			hapticsImpactLight();
		}
		pressed = false;
		dispatch('release');
	}
</script>

<img
	class="btn-{type}"
	{src}
	alt="button"
	class:pressed
	width={size}
	on:touchstart={onTouchstart}
	on:touchend={onTouchend}
	on:click
/>

<style lang="scss">
	img {
		object-fit: contain;
	}
	.pressed {
		filter: brightness(0.5);
	}
	.btn {
		&-x {
			grid-row: 1 / 2;
			grid-column: 1/ -1;
		}
		&-b {
			grid-row: 3 / 4;
			grid-column: 1/ -1;
		}
		&-y {
			grid-column: 1 / 2;
			grid-row: 1/ -1;
		}
		&-a {
			grid-column: 3 / 4;
			grid-row: 1/ -1;
		}
	}
</style>
