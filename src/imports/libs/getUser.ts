import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_ASYNC_COLLECTION } from '../config/storageConfig';

export const getUser = async () => {

	try {
		const userAssyncStorage = await AsyncStorage.getItem(USER_ASYNC_COLLECTION);
		if (!userAssyncStorage) {
			return null;
		} else {
			const userJSON = JSON.parse(userAssyncStorage);
			return { ...userJSON };
		}
	} catch (error) {
		console.log('error', error);
	}
};
