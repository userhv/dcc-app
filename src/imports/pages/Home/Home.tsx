//@ts-ignore
import React  from 'react';
import { Linking, StatusBar, View} from 'react-native';
import {homeStyle} from './homeStyles';
import { HomeHeader } from './HomeHeader/HomeHeader';
import { Banner, Divider, Text } from 'react-native-paper';
import { theme } from '../../paper/theme';


export const Home = (props: any) => {
  const {user} = props;

  const [visible, setVisible] = React.useState(false);

  const abrirPlayStore = async () => {
    const url = 'https://play.google.com/store/apps/details?id=com.dcc.android';
    const suportado = await Linking.canOpenURL(url);
    if(suportado) return Linking.openURL(url);
  }

  return (
    <View style={homeStyle.container}>
      <StatusBar backgroundColor={theme.colors.branco}  barStyle={'dark-content'}/>
      <HomeHeader  />
      <Divider style={homeStyle.divisor}/>
      <View style={homeStyle.blocoInterno}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.azulOpacoMenuOportunidades, padding: 5 }}>
					<Text variant='titleSmall' style={{color: theme.colors.azul}}> PREVIEW </Text>
				</View>
      <Banner
        visible={visible}
        elevation={0}
        style={{backgroundColor: theme.colors.vermelhoVivoOpaco, margin: 10, borderRadius: 10}}
        actions={[{
            label: 'Atualizar',
            onPress: async () => {
              await abrirPlayStore();
              setVisible(false)},
            buttonColor: theme.colors.vermelhoVivo,
            textColor: theme.colors.branco,
            mode: 'contained',
            icon: 'update'
        }
        ]}>
        <Text variant='labelLarge' style={{color: theme.colors.vermelhoVivo, paddingLeft: 5}} numberOfLines={4}> 
            Uma nova versão do aplicativo está disponível.
          </Text>
      </Banner>
      </View>
    </View>
  );
};
