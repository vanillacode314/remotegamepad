<script lang="ts">
	import { swipe } from '$lib/actions';
	let src: string = '/assets/analog/button_xbox_digital_analog_click_dark_3.png';
	let angle: number = 0;

	function updateImage(direction: string) {
		src = '/assets/analog/button_xbox_digital_analog_click_dark_6.png';
		switch (direction) {
			case 'U':
				angle = 0;
				break;
			case 'UR':
				angle = 45;
				break;
			case 'R':
				angle = 90;
				break;
			case 'DR':
				angle = 135;
				break;
			case 'D':
				angle = 180;
				break;
			case 'DL':
				angle = 225;
				break;
			case 'L':
				angle = 270;
				break;
			case 'UL':
				angle = 315;
				break;
			case 'end':
				src = '/assets/analog/button_xbox_digital_analog_click_dark_3.png';
				angle = 0;
				break;
		}
	}

	function onSwipe(direction: string) {
		updateImage(direction);

		switch (direction) {
			case 'U':
				break;
			case 'UR':
				break;
			case 'R':
				break;
			case 'DR':
				break;
			case 'D':
				break;
			case 'DL':
				break;
			case 'L':
				break;
			case 'UL':
				break;
			case 'end':
				break;
		}
	}
</script>

<img
	use:swipe={onSwipe}
	alt="analog"
	{src}
	width="200"
	height="200"
	style:transform="rotate({angle}deg)"
/>

<style lang="scss">
	img {
		transition: transform 0.2s ease-out;
		object-fit: contain;
		grid-area: analog;
	}
</style>
