import React from 'react';
import {
	Text as NativeText,
	TextProps as NativeTextProps,
	StyleSheet,
} from 'react-native';
import Theme from '../lib/theme';

interface TextProps extends NativeTextProps {

}

const Text: React.FC<TextProps> = ({
	style,
	...props
}) => (
	<NativeText
		style={[styles.text, style]}
		{...props}
	/>
);

const styles = StyleSheet.create({
	text: {
		color: Theme.opposite,
	},
});

export default Text;
