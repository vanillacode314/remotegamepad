import { get, writable, type Writable } from 'svelte/store';

export function websocketStore(address: string, initialValue: any): Writable {
	const { set, update, subscribe } = writable(initialValue);
	const websocket = new WebSocket(address);

	websocket.addEventListener('message', (e) => {
		set(JSON.parse(e.data));
	});

	return {
		subscribe,
		set(val: any) {
			websocket.send(JSON.stringify(val));
			set(val);
		},
		update
	};
}

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
	secure: boolean;
}

const defaultSettings = {
	host: 'localhost',
	port: 8080,
	secure: true
};

export const settings = localStore<Settings>(
	'settings',
	JSON.parse(JSON.stringify(defaultSettings))
);
