<script lang="ts">
	import { controls } from '$lib/stores/user';

	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Button from './Button.svelte';

	const command = getContext('command') as Writable<object>;
	function onHold(type: string) {
		$command = { command: 'hold', key: $controls[type] };
	}
	function onRelease(type: string) {
		$command = { command: 'release', key: $controls[type] };
	}
</script>

<div class="container">
	<Button type="zr" on:hold={() => onHold('ZR')} on:release={() => onRelease('ZR')} />
	<Button type="r" on:hold={() => onHold('R')} on:release={() => onRelease('R')} />
</div>

<style lang="scss">
	.container {
		width: 100%;
		grid-area: right-shoulders;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: end;
	}
</style>
