<script lang="ts">
	import { settings, websocketStore } from '$lib/stores';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	let command = writable({});
	try {
		if ($settings.secure) {
			command = websocketStore(`wss://${$settings.host}:${$settings.port}`, {});
		} else {
			command = websocketStore(`ws://${$settings.host}:${$settings.port}`, {});
		}
	} catch (e) {
		console.error(e);
	}
	setContext('command', command);
</script>

<slot />
