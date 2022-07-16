import { localStore } from '.';

export interface Controls {
	A?: string;
	B?: string;
	X?: string;
	Y?: string;
	A1_RIGHT?: string;
	A1_LEFT?: string;
	A1_UP?: string;
	A1_DOWN?: string;
	A2_RIGHT?: string;
	A2_LEFT?: string;
	A2_UP?: string;
	A2_DOWN?: string;
	DPAD_RIGHT?: string;
	DPAD_LEFT?: string;
	DPAD_UP?: string;
	DPAD_DOWN?: string;
	ZL?: string;
	ZR?: string;
	R?: string;
	L?: string;
	START?: string;
	SELECT?: string;
}

export const controls = localStore<Controls>('controls', {
	A: 'A',
	B: 'S',
	X: 'Z',
	Y: 'X',
	A1_UP: 'up',
	A1_RIGHT: 'right',
	A1_LEFT: 'left',
	A1_DOWN: 'down',
	DPAD_UP: 'T',
	DPAD_RIGHT: 'H',
	DPAD_LEFT: 'F',
	DPAD_DOWN: 'G',
	A2_UP: 'I',
	A2_RIGHT: 'L',
	A2_LEFT: 'J',
	A2_DOWN: 'K',
	ZL: '1',
	ZR: '2',
	L: 'Q',
	R: 'W',
	START: 'm',
	SELECT: 'n'
});
