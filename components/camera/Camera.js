import {Camera, CameraType} from 'expo-camera';
import {useRef} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as FileSystem from 'expo-file-system';

import {SavePicture} from '../../cameraMethods/savePicture/savePicture';

export default function Camara() {
	const [hasCameraPermission, setHasCameraPermission] = useState(null);
	const [camera, setCamera] = useState(null);
	const [image, setImage] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(cameraStatus.status === 'granted');
		})();
	}, []);

	const toggleCameraType = async () => {
		setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
	};

	const takePicture = async () => {
		if (camera) {
			const data = await camera.takePictureAsync(null);
			setImage(data.uri);
			SavePicture(data.uri);
		}
	};
	if (hasCameraPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			<Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={toggleCameraType}>
						<Text style={styles.text}>Flip Camera</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.button} onPress={takePicture}>
					<Text style={styles.text}>Take Picture</Text>
				</TouchableOpacity>
			</Camera>
			<Button title="Take Picture" onPress={() => takePicture()} />
			{image && <Image source={{uri: image}} style={{flex: 1}} />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '90%',
		height: '75%',
		justifyContent: 'center',
	},
	camera: {
		width: '90%',
		height: '75%',
		justifyContent: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		backgroundColor: 'green',
		margin: 64,
	},
	button: {
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
});
