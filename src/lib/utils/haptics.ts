import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const hapticsImpactMedium = async () => {
	await Haptics.impact({ style: ImpactStyle.Medium });
};

export const hapticsImpactLight = async () => {
	await Haptics.impact({ style: ImpactStyle.Light });
};

export const hapticsVibrate = async () => {
	await Haptics.vibrate();
};

export const hapticsSelectionStart = async () => {
	await Haptics.selectionStart();
};

export const hapticsSelectionChanged = async () => {
	await Haptics.selectionChanged();
};

export const hapticsSelectionEnd = async () => {
	await Haptics.selectionEnd();
};
