import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {  View } from 'react-native';
import { TextInputSF } from '../../../components/SimpleFormRN/components/TextInputSF/TextInputSF';
import { CheckBoxSF } from '../../../components/SimpleFormRN/components/CheckBoxSF/CheckBoxSF';
import { SelectInputSF } from '../../../components/SimpleFormRN/components/SelectInputSF/SelectInputSF';
import { SwitchSF } from '../../../components/SimpleFormRN/components/SwitchSF/SwitchSF';
import { DateTimePickerSF } from '../../../components/SimpleFormRN/components/DateTimePickerSF/DateTimePickerSF';
import { Masks } from 'react-native-mask-input';
import { noticiasDetailRNStyle } from './style/noticiasDetailRNStyle';


interface INoticiasDetail {
	user: any;
	screenState: string;
	id: string;
	navigation: NativeStackNavigationProp<any>;
}

export const NoticiasDetail = (props: INoticiasDetail) => {

	return (
		<View style={noticiasDetailRNStyle.container}>
			<View style={noticiasDetailRNStyle.primeiroForm}>
				<TextInputSF name="title" key="title" style={noticiasDetailRNStyle.input} />
				<TextInputSF
					name="description"
					key="description"
					mask={Masks.BRL_CURRENCY}
					style={noticiasDetailRNStyle.input}
				/>
				<CheckBoxSF name="check" key="check" />
				<SwitchSF name="statusToggle" key="statusToggle" onChange={function (v: boolean): void {
					throw new Error('Function not implemented.');
				} } value={false} />
				<SelectInputSF name="type" key="type" />
				<DateTimePickerSF name="date" key="date" />
			</View>
		</View>
	);
};
