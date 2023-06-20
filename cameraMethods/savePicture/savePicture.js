import * as MediaLibrary from 'expo-media-library';
import {ToastAndroid} from 'react-native';

export const SavePicture = async (item, permission) => {
	if (permission.granted) {
		try {
			const asset = await MediaLibrary.createAssetAsync(item);
			const currentDate = new Date();
			const year = currentDate.getFullYear();
			const month = String(currentDate.getMonth() + 1).padStart(2, '0');
			const day = String(currentDate.getDate()).padStart(2, '0');

			const albumName = `Images/${year}/${month}/${day}/`;
			await MediaLibrary.createAlbumAsync(albumName, asset, true);
			ToastAndroid.showWithGravity(
				`Image saved in: Images/${year}/${month}/${day}/${asset.filename}`,
				ToastAndroid.LONG,
				ToastAndroid.CENTER
			);
		} catch (error) {
			ToastAndroid.showWithGravity(
				`Image not saved ,please try again`,
				ToastAndroid.LONG,
				ToastAndroid.CENTER
			);
		}
	} else {
		ToastAndroid.showWithGravity(
			`You need permissions to save a photo`,
			ToastAndroid.LONG,
			ToastAndroid.CENTER
		);
	}
};
