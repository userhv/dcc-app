import React from 'react';
import { Text, TextProps } from 'react-native-paper';
import { theme } from '../../theme';

interface ISimpleLabel extends TextProps<any> {}

export const SimpleLabel = (props: ISimpleLabel) => {
	const { children } = props;
	return (
		<Text style={{ color: theme.colors.onBackground }} variant="bodyMedium">
			{children}
		</Text>
	);
};
