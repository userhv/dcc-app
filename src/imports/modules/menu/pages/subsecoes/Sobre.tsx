import {Linking, Platform, View} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CardSecaoInterno } from '../../../../components/Secao/SecaoInterna/CardSecaoInterno';
import { getVersion } from 'react-native-device-info';
import { subSecoesStyle } from '../style/SubSecoesStyle';
import { HeaderBar } from '../../../../components/HeaderBar/HeaderBar';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../../components/GeneralComponents/GeneralComponents';
import { useContext } from 'react';
import { styleIOS } from '../../../../paper/stylesIOS';
import { ModalNotasVersao } from '../../components/ModalNotasVersao';
import { useTheme } from 'react-native-paper';

interface ISobre {
    navigation: NativeStackNavigationProp<any>;
  }

export const Sobre = (props: ISobre) => {

    const { navigation } = props;

    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const styles = subSecoesStyle(colors);

    const { showModal, showSnackBar, showDialog } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;

    const abreModalNotasVersao = () => {
      showModal({
        renderedComponent: (_props: any) => (
          <ModalNotasVersao handleClose={_props.onDismiss}
          {...{ showSnackBar, showDialog }}
          />
        )
      });
    }

    const abrirLoja = async () => {
      const url = Platform.OS === 'android' ? 
        'https://play.google.com/store/apps/details?id=com.dcc.android' : 
        Platform.OS === `ios` ? 'https://store.apple.com': '';
      const suportado = await Linking.canOpenURL(url);
      if(suportado) return Linking.openURL(url);
    }

  const style = Platform.OS === 'ios' ? styleIOS : null;
  
  return (
    <View style={{...styles.container, ...style}}>
      <HeaderBar navigation={navigation} titulo='Sobre o aplicativo'/>

        <CardSecaoInterno titulo='Política de privacidade'
                          onPress={() => navigation?.navigate('Root', {
                            screen: 'WebView', params:{
                            url:'https://dcc.ufmg.br/politica-de-privacidade/'
                          }})}/>

        <CardSecaoInterno titulo='Notas da versão'
                          onPress={() => abreModalNotasVersao()}/>
                          
        <CardSecaoInterno titulo='Versão do aplicativo' descricao={getVersion()} 
                          onPress={async () => abrirLoja()}/>
    </View>
  );
};