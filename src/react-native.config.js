module.exports = {
	project: {
		android: {},
		ios: {
			automaticPodsInstallation: true
		  }
	},
	dependencies: {
		'react-native-vector-icons': {
		  platforms: {
			ios: null,
		  },
		},
	  },
	assets: ['./assets/fonts/']
};

