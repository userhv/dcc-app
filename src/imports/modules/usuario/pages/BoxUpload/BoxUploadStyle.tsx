import {StyleSheet} from 'react-native';

export const boxUploadStyle = (colors: any) =>
  StyleSheet.create({
    boxUpload: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1,
        flexShrink: 1,
      },
      boxBotoesUpload: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
      },
  });
