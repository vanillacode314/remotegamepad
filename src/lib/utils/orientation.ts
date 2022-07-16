import { ScreenOrientation, OrientationType } from '@robingenz/capacitor-screen-orientation';

export const landscape = async () => {
	await ScreenOrientation.lock({ type: OrientationType.LANDSCAPE });
};

export const potrait = async () => {
	await ScreenOrientation.lock({ type: OrientationType.PORTRAIT });
};

export const unlock = async () => {
	await ScreenOrientation.unlock();
};

export const getCurrentOrientation = async () => {
	const result = await ScreenOrientation.getCurrentOrientation();
	return result.type;
};
