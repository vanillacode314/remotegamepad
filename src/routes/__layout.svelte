<script lang="ts">
	import { settings, websocketStore } from '$lib/stores';
	import { setContext } from 'svelte';

	const command = websocketStore(`ws://${$settings.host}:${$settings.port}`, {});
	setContext('command', command);
</script>

<slot />
