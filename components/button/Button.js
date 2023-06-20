import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default ({onPress, text, size, theme}) => {
	const buttonStyles = [styles.button];
	const textStyles = [styles.text];

	if (size === 'double') {
		buttonStyles.push(styles.buttonDouble);
	}

	if (theme === 'secondary') {
		buttonStyles.push(styles.buttonSecondary);
		textStyles.push(styles.textSecondary);
	} else if (theme === 'accent') {
		buttonStyles.push(styles.buttonAccent);
	}

	return (
		<TouchableOpacity onPress={onPress} style={buttonStyles}>
			<Text style={textStyles}>{text}</Text>
		</TouchableOpacity>
	);
};
// set dimmenstion
const screen = Dimensions.get('window');
const buttonWidth = screen.width / 4;

const styles = StyleSheet.create({
	button: {
		height: Math.floor(buttonWidth - 10),
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: Math.floor(buttonWidth),
	},
	text: {
		color: '#fff',
		fontSize: 24,
	},
	textSecondary: {
		color: '#060606',
	},
	buttonDouble: {
		width: screen.width / 2 - 10,
		flex: 0,
		alignItems: 'flex-start',
		paddingLeft: 40,
	},
	buttonSecondary: {
		top: '0%',
		backgroundColor: 'green',
	},
	buttonAccent: {
		backgroundColor: 'blue',
	},
});
