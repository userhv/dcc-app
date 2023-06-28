//@ts-ignore
import React from 'react';
import { Linking, Platform, StatusBar, View} from 'react-native';
import {homeStyle} from './homeStyles';
import { HomeHeader } from './HomeHeader/HomeHeader';
import { Banner, Divider, Text } from 'react-native-paper';
import { theme } from '../../paper/theme';
import { styleIOS } from '../../paper/stylesIOS';


export const Home = (props: any) => {
  const {user} = props;

  const [visible, setVisible] = React.useState(false);


  const abrirLoja = async () => {
    const url = Platform.OS === 'android' ? 
        'https://play.google.com/store/apps/details?id=com.dcc.android' :
        Platform.OS === `ios` ? 'https://store.apple.com': '';
    const suportado = await Linking.canOpenURL(url);
    if(suportado) return Linking.openURL(url);
  }

  const style = Platform.OS === 'ios' ? styleIOS : null;

  return (
    <View style={{...homeStyle.container, ...style}}>
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
        actions={[
          {
            label: 'Depois', 
            onPress: () => setVisible(false)
          },
          {
            label: 'Atualizar',
            onPress: async () => {
              await abrirLoja();
              setVisible(false)},
          },
        ]}>
        <Text variant='labelLarge' style={{color: theme.colors.vermelhoVivo, paddingLeft: 5}} numberOfLines={4}> 
            Uma nova versão do aplicativo está disponível.
          </Text>
      </Banner>
      <View style={{backgroundColor: theme.colors.azulOpacoMenuOportunidades, margin: 10, borderRadius: 10, padding: 10}}>
        <Text variant='bodyMedium' style={{textAlign: 'auto'}}>
          {`  
          Notas da versão: 1.0.0-preview.10.1:
                  
            - Ajuste de UI no WebView
            - Adição do patch notes na tela de início [Marco Túlio]
            - Ajustes nas imagens das notícias [Pâmela]
            - Melhorias de desempenho
            - Adição do ícone de retornar ao topo da lista na tela de notícias [Wallace]
                      

            Mantenha o aplicativo atualizado.
            Envie seu feedback para dcc.ufmg@gmail.com ou indo até a aba Menu > Feedback`
          }
        </Text>
      </View>

      </View>
    </View>
  );
};
