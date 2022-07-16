<script lang="ts">
	import { goto } from '$app/navigation';
	import { settings } from '$lib/stores';
	import { potrait } from '$lib/utils/orientation';
	import { onMount } from 'svelte';
	import { controlMap, allowedKeys } from '$lib/data/consts';
	import { controls } from '$lib/stores/user';

	onMount(() => {
		potrait();
	});
</script>

<div class="wrapper">
	<form on:submit|preventDefault={() => goto('/')}>
		<label>
			<span>Host: </span>
			<input type="text" bind:value={$settings.host} on:change={() => ($settings = $settings)} />
		</label>
		<label>
			<span>Port: </span>
			<input type="number" bind:value={$settings.port} on:change={() => ($settings = $settings)} />
		</label>
		<hr />
		{#each [...Object.entries($controls)] as [key, value]}
			<label>
				<span>{controlMap[key]}: </span>
				<select
					on:change={(e) => {
						$controls = { ...$controls, [key]: e.target.value };
					}}
				>
					{#each allowedKeys as k}
						<option selected={k === value.toLowerCase()}>{k}</option>
					{/each}
				</select>
			</label>
		{/each}
		<button>Save</button>
	</form>
</div>

<style lang="scss">
	.wrapper {
		display: grid;
		place-items: start;
		height: 100%;
	}
	form {
		font-family: monospace;
		color: white;
		width: 100%;
		padding: 1rem;
		display: grid;
		justify-items: center;
		gap: 0.5rem;
		label {
			padding-left: 1rem;
			border: 1px solid white;
			width: 100%;
			display: grid;
			grid-template-columns: 1fr 2fr;
			gap: 1rem;
			align-items: center;
		}
		input,
		select {
			margin: 0;
			border: none;
			background-color: #333;
			color: white;
			outline: none;
			padding: 1rem;
		}
		button {
			padding: 0.5rem;
			width: 100%;
		}
		hr {
			width: 100%;
			border-bottom: 1px solid gray;
		}
	}
</style>
