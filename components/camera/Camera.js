import {Camera, CameraType} from 'expo-camera';
import {useRef} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import {SavePicture} from '../../cameraMethods/savePicture/savePicture';
import Button from '../button/Button';

export default function Camara() {
	const [hasCameraPermission, setHasCameraPermission] = useState(null);
	const [camera, setCamera] = useState(null);
	const [image, setImage] = useState(null);
	const [permission, setPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(cameraStatus.status === 'granted');
			setPermission(await MediaLibrary.requestPermissionsAsync());
		})();
	}, []);

	const toggleCameraType = async () => {
		setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
	};

	const takePicture = async () => {
		if (camera) {
			const data = await camera.takePictureAsync(null);
			setImage(data.uri);
			SavePicture(data.uri, permission);
		}
	};
	if (hasCameraPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			<Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
				<View style={styles.buttonContainer}>
					<Button
						onPress={() => toggleCameraType()}
						text={'Flip Camera'}
						theme={'secondary'}
						size={'double'}
					/>
				</View>
				<View style={styles.bottomButtonContainer}>
					<Button onPress={() => takePicture()} text={'Take Picture'} theme={'accent'} />
				</View>
			</Camera>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	},
	camera: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	},
	buttonContainer: {
		position: 'absolute',
		top: 0,
		width: '100%',
		alignItems: 'flex-end',
		paddingRight: 5,
		paddingTop: 45,
	},
	button: {
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
	bottomButtonContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 20,
	},
});
