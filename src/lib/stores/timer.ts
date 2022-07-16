import { readable, type Readable } from 'svelte/store';

export function timerStore(duration: number): Readable<boolean> {
	return readable(false, (set) => {
		setTimeout(() => set(true), duration);
	});
}
