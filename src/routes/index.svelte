<script lang="ts">
	import AnalogStick from '$lib/components/AnalogStick.svelte';
	import IconCog from '~icons/mdi/cog';
</script>

<div class="wrapper">
	<a href="/settings">
		<IconCog />
	</a>
	<AnalogStick />
</div>

<style lang="scss">
	.wrapper {
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr auto;
		grid-template-areas: '. .' 'analog .';
		height: 100%;
	}
</style>
