import { get, writable, type Writable } from 'svelte/store';

const noop = () => {};

export function websocketStore(
	address: string,
	initialValue: object,
	successHandler = noop,
	errorHandler = noop
) {
	const { set, update, subscribe } = writable(initialValue);

	// @ts-expect-error: <websocket undefined at start>
	const data: { websocket: WebSocket } = { websocket: undefined };
	function connect() {
		data['websocket'] = new WebSocket(address);

		data['websocket'].addEventListener('message', (e) => {
			set(JSON.parse(e.data));
		});

		data['websocket'].addEventListener('open', successHandler);
		data['websocket'].addEventListener('error', errorHandler);

		addEventListener('beforeunload', () => {
			data['websocket'].close(1000);
		});
	}
	connect();
	return {
		subscribe,
		set(val: any) {
			data['websocket'].send(JSON.stringify(val));
			set(val);
		},
		update,
		connect
	};
}

export function localStore<T>(key: string, defaultValue: T): Writable<T> {
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
	secure: false
};

export const settings = localStore<Settings>(
	'settings',
	JSON.parse(JSON.stringify(defaultSettings))
);
