import {ActivityIndicator, View} from 'react-native';
import {loadingStyle} from './LoadingStyle';

export const Loading = (props: any) => {
  return (
    <View style={loadingStyle.container}>
      <ActivityIndicator animating size={'large'} {...props} />
    </View>
  );
};
