<script lang="ts">
	import { settings, websocketStore } from '$lib/stores';
	import { connected, fullscreen } from '$lib/stores/app';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	$fullscreen = true;
	let command = writable({});
	command = websocketStore(
		`ws://${$settings.host}:${$settings.port}`,
		{},
		() => {
			$connected = true;
		},
		() => {
			$connected = false;
		}
	);
	setContext('command', command);
</script>

<slot />
