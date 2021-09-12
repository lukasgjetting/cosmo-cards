import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Theme from '../lib/theme';

interface IconProps {
	name: string;
	size?: number;
	color?: string,
}

const Icon: React.FC<IconProps> = ({
	name,
	size = 16,
	color = Theme.opposite,
}) => (
	<Ionicons
		name={name}
		size={size}
		color={color}
	/>
);

export default Icon;
