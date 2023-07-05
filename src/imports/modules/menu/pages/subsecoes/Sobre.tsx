import {Linking, Platform, View} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CardSecaoInterno } from '../../components/CardSecaoInterno';
import { getVersion } from 'react-native-device-info';
import { subSecoesStyle } from '../style/SubSecoesStyle';
import { HeaderBar } from '../../../../components/HeaderBar/HeaderBar';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../../components/GeneralComponents/GeneralComponents';
import { useContext } from 'react';
import { WebViewRN } from '../../../../components/WebViewRN/WebViewRN';
import { styleIOS } from '../../../../paper/stylesIOS';
import { ModalVersao } from '../../../alunos/components/ModalVersao';

interface ISobre {
    navigation: NativeStackNavigationProp<any>;
  }

export const Sobre = (props: ISobre) => {

    const { navigation } = props;

    const { showModal, showSnackBar, showDialog } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;

    const abreWebViewPrivacidade = () => {
      showModal({
        isFullScreen: true,
        renderedComponent: (_props: any) => (
          <WebViewRN url={'https://dcc.ufmg.br/politica-de-privacidade/'} handleClose={_props.onDismiss} navigation={navigation}/>
        )
      });
    }
    

    const abreModalNotasVersao = () => {
      showModal({
        renderedComponent: (_props: any) => (
          <ModalVersao handleClose={_props.onDismiss}
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
    <View style={{...subSecoesStyle.container, ...style}}>
      <HeaderBar navigation={navigation} titulo='Sobre o aplicativo'/>
        <CardSecaoInterno titulo='Política de privacidade'
                          onPress={() => abreWebViewPrivacidade()}/>
        <CardSecaoInterno titulo='Notas da versão'
                          onPress={() => abreModalNotasVersao()}/>
        <CardSecaoInterno titulo='Versão do aplicativo' descricao={getVersion()} 
                          onPress={async () => abrirLoja()}/>
    </View>
  );
};