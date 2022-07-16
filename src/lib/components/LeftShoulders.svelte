<script lang="ts">
	import { controls } from '$lib/stores/user';

	import { hapticsImpactLight } from '$lib/utils/haptics';

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
	<Button type="zl" on:hold={() => onHold('ZL')} on:release={() => onRelease('ZL')} />
	<Button type="l" on:hold={() => onHold('L')} on:release={() => onRelease('L')} />
</div>

<style lang="scss">
	.container {
		width: 100%;
		grid-area: left-shoulders;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
