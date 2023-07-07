import {Dimensions, Platform, Share, StatusBar, View} from 'react-native';
import WebView from 'react-native-webview';
import {webViewRNStyle} from './WebiewRNStyle';
import { IconButton, Text } from 'react-native-paper';
import { theme } from '../../paper/theme';
import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IWebViewRN {
  url: string;
  navigation?: NativeStackNavigationProp<any> | null;
  handleClose?: () => void;
}

export const WebViewRN = (props: IWebViewRN) => {
  const {url, navigation, handleClose} = props;
  const {width, height} = Dimensions.get('window');
  const [urlWebView, setUrlWebView] = useState<string>("");


  const compartilharNoticia = async () => {
    try {
      await Share.share({
        message: urlWebView
      });
    } catch (error) {
        console.warn(`Erro ao compartilhar a notícia: ${error}`)
    }
  }


  const style = Platform.OS === 'ios' ? {paddingTop: 100, backgroundColor: theme.colors.quasePreto} : webViewRNStyle.container;
  
  return (
    <SafeAreaView style={{...style}}>
        <View >
          <StatusBar backgroundColor={theme.colors.quasePreto} barStyle={'light-content'}/>
          <View style={webViewRNStyle.containerSuperior}>
            <View style={webViewRNStyle.containerBotaoFechar}>
              <IconButton
                accessible={true}
                accessibilityLabel='Toque para fechar a página'
                accessibilityRole='button' 
                icon='close'
                iconColor={theme.colors.branco}
                size={28}
                style={webViewRNStyle.botaoFechar}
                onPress={handleClose}
              />
              </View>
              <View style={webViewRNStyle.containerTitulo}>
                <Text numberOfLines={1} style={webViewRNStyle.texto} variant='bodyMedium'> {urlWebView} </Text>
              </View>
              <View style={webViewRNStyle.containerCompartilhar}>
                <IconButton icon='share-variant-outline' iconColor={theme.colors.branco} 
                        size={28} onPress={compartilharNoticia} accessibilityLabel='Compartilhe o link' accessible={true}
                        accessibilityRole='button'  />
                </View>
          </View>
          <View style={{height, width}}>
          <WebView source={{uri: url}} style={webViewRNStyle.container} 
                  onNavigationStateChange={(e) => {
                        setUrlWebView(e.url)
            }}/>
          </View>
      </View>
    </SafeAreaView>
  );
};
