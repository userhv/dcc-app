import {StyleSheet} from 'react-native';

export const menuListStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loading: {
      justifyContent: 'center',
      flex: 1,
      paddingTop: 150,
      alignItems: 'center',
    },
    infosDCC: {
      flexGrow: 1,
      flexWrap: 'nowrap',
      flexDirection: 'row',
      justifyContent: 'center',
      display: 'flex',
      flex: 1,
      marginTop: 20,
      marginBottom: 20
    },
  });
