import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.vanillacode.remotegamepad',
	appName: 'Remote Gamepad',
	webDir: 'build',
	// server: {
	// 	url: 'http://192.168.163.182:5173',
	// 	cleartext: true
	// },
	bundledWebRuntime: false
};

export default config;
