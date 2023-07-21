const robotoRegular = 'Roboto-Regular';
const robotoMedium = 'Roboto-Medium';
const robotoBold = 'Roboto-Bold';
const titilliumWebSemibold = 'TitilliumWeb-SemiBold';

const variants = {
	displayLarge: {
		fontFamily: titilliumWebSemibold,
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 48,
		lineHeight: 58,
		letterSpacing: -0.02
	},
	displayMedium: {
		fontFamily: titilliumWebSemibold,
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 40,
		lineHeight: 48,
		letterSpacing: -0.02
	},
	displaySmall: {
		fontFamily: titilliumWebSemibold,
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 32,
		lineHeight: 38,
		letterSpacing: -0.015
	},
	headlineLarge: {
		fontFamily: titilliumWebSemibold,
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 32,
		lineHeight: 38
	},
	headlineMedium: {
		fontFamily: titilliumWebSemibold,
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 28,
		lineHeight: 34
	},
	headlineSmall: {
		fontFamily: titilliumWebSemibold,
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 24,
		lineHeight: 29
	},
	titleLarge: {
		fontFamily: titilliumWebSemibold,
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 20,
		lineHeight: 24
	},
	titleMedium: {
		fontFamily: titilliumWebSemibold,
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 18,
		lineHeight: 22
	},
	titleSmall: {
		fontFamily: titilliumWebSemibold,
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 18,
		lineHeight: 22
	},
	labelLarge: {
		fontFamily: robotoRegular,
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 16,
		lineHeight: 19,
		letterSpacing: 0.005
	},

	labelMedium: {
		fontFamily: robotoMedium,
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 14,
		lineHeight: 17,
		letterSpacing: 0.015
	},
	labelSmall: {
		fontFamily: robotoRegular,
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 12,
		lineHeight: 14,
		letterSpacing: 0.02
	},
	bodyLarge: {
		fontFamily: robotoRegular,
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 19,
		letterSpacing: 0.01
	},
	bodyMedium: {
		fontFamily: robotoRegular,
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 17,
		letterSpacing: 0.015
	},
	bodySmall: {
		fontFamily: robotoRegular,
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 12,
		lineHeight: 14,
		letterSpacing: 0.02
	}
};

export const fontConfig = {
	fontFamily: robotoRegular,titilliumWebSemibold,
	...variants,
	android: variants,
	ios: variants
};
