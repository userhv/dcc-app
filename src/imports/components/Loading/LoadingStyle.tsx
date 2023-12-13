import { StyleSheet } from "react-native";

export const loadingStyle = (colors:any) => StyleSheet.create({
	container: {
		backgroundColor: colors,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
});
