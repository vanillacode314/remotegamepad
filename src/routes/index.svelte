<script lang="ts">
	import ABXY from '$lib/components/ABXY.svelte';
	import AnalogStick1 from '$lib/components/AnalogStick1.svelte';
	import AnalogStick2 from '$lib/components/AnalogStick2.svelte';
	import Button from '$lib/components/Button.svelte';
	import DPAD from '$lib/components/DPAD.svelte';
	import LeftShoulders from '$lib/components/LeftShoulders.svelte';
	import RightShoulders from '$lib/components/RightShoulders.svelte';
	import { connected, fullscreen } from '$lib/stores/app';
	import { controls } from '$lib/stores/user';
	import { landscape } from '$lib/utils/orientation';
	import { getContext } from 'svelte';
	import { onMount } from 'svelte';
	import IconCog from '~icons/mdi/cog';
	import IconFullscreen from '~icons/mdi/fullscreen';
	import IconRestart from '~icons/mdi/restart';

	let command = getContext('command') as any;
	function reconnect() {
		command.connect();
	}
	onMount(() => {
		landscape();
	});

	function start() {
		$command = { command: 'press', key: $controls.START };
	}
	function select() {
		$command = { command: 'press', key: $controls.SELECT };
	}
</script>

<div class="wrapper">
	<RightShoulders />
	<LeftShoulders />
	<AnalogStick1 />
	<AnalogStick2 />
	<ABXY />
	<DPAD />
	<nav>
		<Button type="start" on:release={start} />
		<a href="/settings" class="btn">
			<IconCog />
		</a>
		<button class="btn" on:click={() => ($fullscreen = !$fullscreen)}>
			<IconFullscreen />
		</button>
		<button class="btn" on:click={reconnect}>
			<IconRestart style="background-color: {$connected ? 'green' : 'red'}" />
		</button>
		<Button type="select" on:release={select} />
	</nav>
</div>

<style lang="scss">
	.wrapper {
		overflow: hidden;
		display: grid;
		grid-template-columns: auto 1fr 1fr 1fr auto;
		grid-template-rows: auto 1fr auto auto;
		grid-template-areas: 'left-shoulders dpad . analog2 right-shoulders' '. dpad . analog2 .' '. dpad . analog2 .' 'analog1 nav nav nav abxy';
		height: 100%;
		padding: 1rem;
	}

	.spacer {
		grid-area: spacer;
	}

	.btn {
		background: none;
		outline: none;
		color: white;
		font-size: x-large;
		border-radius: 50%;
		display: inline-block;
		aspect-ratio: 1;
		border: 2px solid white;
		overflow: hidden;
		padding: 0rem;
	}

	nav {
		justify-self: stretch;
		align-self: stretch;
		display: flex;
		padding: 1rem;
		justify-content: center;
		align-items: end;
		gap: 1rem;
		width: 100%;
		grid-area: nav;
	}
</style>
