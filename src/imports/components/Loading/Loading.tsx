import { View, useColorScheme} from 'react-native';
import {loadingStyle} from './LoadingStyle';
import { useTheme, Text, ActivityIndicator } from 'react-native-paper';

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
      <ActivityIndicator animating size={30}
        style={{backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco, borderRadius: 100, padding: 7,
                elevation: 3, ...props.style}}
        color={colors.accentClaro}/>
        {props.texto? (
          <Text variant='labelLarge' style={{marginTop: 5}}> {props.texto}</Text>
        ): null}
    </View>
  );
};
