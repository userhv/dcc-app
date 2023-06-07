import {Dimensions, StatusBar, View} from 'react-native';
import WebView from 'react-native-webview';
import {webViewRNStyle} from './WebiewRNStyle';
import { IconButton, Text } from 'react-native-paper';
import { theme } from '../../paper/theme';
import React, { useState } from 'react';

interface IWebViewRN {
  url: string;
  handleClose: () => void;
}

export const WebViewRN = (props: IWebViewRN) => {
  const {url, handleClose} = props;
  const {width, height} = Dimensions.get('window');
  const [urlWebView, setUrlWebView] = useState<string>("");
  
  return (
    <View style={webViewRNStyle.containerComponente}>
      <StatusBar backgroundColor={theme.colors.cinzaEscuro} barStyle={'light-content'}/>
      <View style={webViewRNStyle.containerSuperior}>
        <View style={webViewRNStyle.containerBotaoFechar}>
          <IconButton
            accessible={true}
            accessibilityLabel='Toque para fechar a página'
            accessibilityRole='button' 
            icon='close'
            iconColor={theme.colors.branco}
            size={24}
            style={webViewRNStyle.botaoFechar}
            onPress={handleClose}
          />
          </View>
          <View style={webViewRNStyle.containerTitulo}>
            <Text  numberOfLines={1} 
            style={webViewRNStyle.texto}> {urlWebView} </Text>
          </View>
      </View>
      <View style={{height, width}}>
      <WebView source={{uri: url}} style={webViewRNStyle.container}   
              onNavigationStateChange={(e) => {
                    setUrlWebView(e.url)
        }}/>
      </View>
    </View>
  );
};
