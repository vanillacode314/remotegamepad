<script lang="ts">
	import AnalogStick from '$lib/components/AnalogStick.svelte';
</script>

<div class="wrapper">
	<AnalogStick />
</div>

<style lang="scss">
	.wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr auto;
		grid-template-areas: '. .' 'analog .';
		height: 100%;
	}
</style>
