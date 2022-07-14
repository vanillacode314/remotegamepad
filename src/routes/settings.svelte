<script lang="ts">
	import { goto } from '$app/navigation';
	import { settings } from '$lib/stores';
</script>

<div class="wrapper">
	<form on:submit|preventDefault={() => goto('/')}>
		<input type="text" bind:value={$settings.host} on:change={() => ($settings = $settings)} />
		<input type="number" bind:value={$settings.port} on:change={() => ($settings = $settings)} />
		<input
			type="checkbox"
			bind:checked={$settings.secure}
			on:change={() => {
				$settings = $settings;
			}}
		/>
		<button>Save</button>
	</form>
</div>

<style lang="scss">
	.wrapper {
		display: grid;
		place-items: center;
		height: 100%;
	}
	form {
		padding: 1rem;
		display: grid;
		justify-items: center;
		gap: 0.5rem;
	}
</style>
