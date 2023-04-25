import React from 'react';
import { useState } from 'react';
import { ISFComponent } from '../../ISFComponent';
import DatePicker from 'react-native-date-picker';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { hasValue } from '../../../../libs/hasValue';
import { SimpleLabel } from '../../../../paper/components/SimpleLabel/SimpleLabel';
import { dateTimePickerSFStyle } from './DateTimePickerSFStyle';

interface IDatePickerSF extends ISFComponent {
	value?: Date;
	onChange?: (date: Date) => void;
}

export const DateTimePickerSF = (props: IDatePickerSF) => {
	const { name, label, value, onChange, ...otherProps } = props;
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);

	return (
		<>
			<TouchableOpacity onPress={handleOpen}>
				<SimpleLabel>{label}</SimpleLabel>
				<View style={dateTimePickerSFStyle.date}>
					<Text>{(value ?? new Date())?.toLocaleString('pt-br')}</Text>
				</View>
			</TouchableOpacity>
			<DatePicker
				locale="pt-br"
				mode="datetime"
				modal
				open={open}
				date={value && hasValue(value) ? value : new Date()}
				onConfirm={(date) => {
					setOpen(false);
					onChange && onChange(date);
				}}
				onCancel={() => {
					setOpen(false);
				}}
				confirmText="Confirmar"
				cancelText="Cancelar"
				title="Selecione a data"
				{...otherProps}
			/>
		</>
	);
};
