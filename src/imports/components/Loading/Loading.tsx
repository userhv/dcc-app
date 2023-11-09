import {ActivityIndicator, View, useColorScheme} from 'react-native';
import {loadingStyle} from './LoadingStyle';
import { useTheme, Text } from 'react-native-paper';

interface ILoading {
  texto?: string;
}

export const Loading = (props: ILoading & any) => {
  const theme = useTheme<{[key:string]: any}>();
  const { colors } = theme; 
  const styles = loadingStyle(colors);
  const colorScheme = useColorScheme();
  
  return (
    <View style={styles.container}>
      <ActivityIndicator animating size={'large'} 
        color={colorScheme === 'dark' ? colors.cinza90 : colors.cinza10} {...props} />
        {props.texto? (
          <Text variant='labelLarge' style={{marginTop: 5}}> {props.texto}</Text>
        ): null}
    </View>
  );
};
