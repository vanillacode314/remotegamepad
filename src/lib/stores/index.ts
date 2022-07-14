import { writable, type Writable } from 'svelte/store';

function localStore<T>(key: string, defaultValue: T): Writable<T> {
	const store = writable<T>(defaultValue);

	if (typeof localStorage !== 'undefined') {
		const localValue = JSON.parse(localStorage.getItem(key));
		const newValue = localValue ?? defaultValue;

		if (newValue !== null) {
			store.set(newValue);
		}

		store.subscribe((val) => {
			localStorage.setItem(key, JSON.stringify(val));
		});
	}

	return store;
}

interface Settings {
	host: string;
	port: number;
}

const defaultSettings = {
	host: 'localhost',
	port: 8080
};

export const settings = localStore<Settings>(
	'settings',
	JSON.parse(JSON.stringify(defaultSettings))
);
