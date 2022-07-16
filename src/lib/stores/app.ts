import { writable } from 'svelte/store';
import { AndroidFullScreen } from '@awesome-cordova-plugins/android-full-screen';

function fs() {
	AndroidFullScreen.immersiveMode();
}

function fsExit() {
	AndroidFullScreen.showSystemUI();
}

function fullscreenStore() {
	const { set, update, subscribe } = writable<boolean>(false);

	return {
		set(v: boolean) {
			if (v) {
				fs();
			} else {
				fsExit();
			}
			set(v);
		},
		update,
		subscribe
	};
}

export const fullscreen = fullscreenStore();

export const connected = writable<boolean>(false);
