<script lang="ts">
	import { controls } from '$lib/stores/user';

	import { hapticsImpactLight } from '$lib/utils/haptics';

	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import Button from './Button.svelte';
	const command = getContext('command') as Writable<object>;

	function onHold(type: string) {
		hapticsImpactLight();
		switch (type) {
			case 'a':
				$command = { command: 'hold', key: $controls.A };
				break;
			case 'b':
				$command = { command: 'hold', key: $controls.B };
				break;
			case 'x':
				$command = { command: 'hold', key: $controls.X };
				break;
			case 'y':
				$command = { command: 'hold', key: $controls.Y };
				break;
			default:
				break;
		}
	}
	function onRelease(type: string) {
		hapticsImpactLight();
		switch (type) {
			case 'a':
				$command = { command: 'release', key: $controls.A };
				break;
			case 'b':
				$command = { command: 'release', key: $controls.B };
				break;
			case 'x':
				$command = { command: 'release', key: $controls.X };
				break;
			case 'y':
				$command = { command: 'release', key: $controls.Y };
				break;
			default:
				break;
		}
	}
</script>

<div class="container">
	{#each ['a', 'b', 'x', 'y'] as type}
		<Button {type} on:hold={() => onHold(type)} on:release={() => onRelease(type)} />
	{/each}
</div>

<style lang="scss">
	.container {
		gap: 0.7rem;
		grid-area: abxy;
		display: grid;
		grid-template-columns: 3fr 1fr 3fr;
		grid-template-rows: 3fr 1fr 3fr;
		place-items: center;
		place-self: center;
	}
</style>
