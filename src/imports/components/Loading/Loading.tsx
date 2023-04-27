import {ActivityIndicator, View} from 'react-native';
import {loadingStyle} from './LoadingStyle';
import { theme } from '../../paper/theme';

export const Loading = (props: any) => {
  return (
    <View style={loadingStyle.container}>
      <ActivityIndicator animating size={'large'} {...props} 
        color={theme.colors.vermelhoVivo}/>
    </View>
  );
};
