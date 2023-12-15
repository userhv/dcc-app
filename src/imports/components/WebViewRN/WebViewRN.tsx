import {Dimensions, Platform, Share, StatusBar, View} from 'react-native';
import WebView from 'react-native-webview';
import {webViewRNStyle} from './WebiewRNStyle';
import { IconButton, ProgressBar, Text, useTheme } from 'react-native-paper';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loading } from '../Loading/Loading';

export const WebViewRN = (propsNavegacao: any) => {

  const url = propsNavegacao.route.params.url;
  const handleClose =  propsNavegacao.navigation.goBack;
  const {width, height} = Dimensions.get('window');
  const [urlWebView, setUrlWebView] = useState<string>("");

  const theme = useTheme<{[key:string]: any}>();
  const { colors } = theme;
  const styles = webViewRNStyle(colors);


  const compartilharNoticia = async () => {
    try {
      await Share.share({
        message: urlWebView
      });
    } catch (error) {
        console.warn(`Erro ao compartilhar a notícia: ${error}`)
    }
  }

  const carregamento = () => {
    return(
      <View style={styles.loading}>
        <Loading/>
      </View>
    )
  }


  const style = Platform.OS === 'ios' ? { backgroundColor: colors.quasePreto} : styles.container;

  return (
    <SafeAreaView style={{...style}}>
        <View >
          <StatusBar backgroundColor={colors.quasePreto} barStyle={'light-content'}/>
          <View style={styles.containerSuperior}>
            <View style={styles.containerBotaoFechar}>
              <IconButton
                accessible={true}
                accessibilityLabel='Toque para fechar a página'
                accessibilityRole='button' 
                icon='close'
                iconColor={colors.branco}
                size={28}
                style={styles.botaoFechar}
                onPress={handleClose}
              />
              </View>
              <View style={styles.containerTitulo}>
                <Text numberOfLines={1} style={styles.texto} variant='bodyMedium'> {urlWebView} </Text>
              </View>
              <View style={styles.containerCompartilhar}>
                <IconButton icon='share-variant-outline' iconColor={colors.branco} 
                        size={28} onPress={compartilharNoticia} accessibilityLabel='Compartilhe o link' accessible={true}
                        accessibilityRole='button'  />
                </View>
          </View>
          <View style={{height, width}}>
          <WebView source={{uri: url}} style={styles.container}
                  startInLoadingState={true}
                  renderLoading={carregamento}
                  onNavigationStateChange={(e) => {
                        setUrlWebView(e.url)
            }}/>
          </View>
      </View>
    </SafeAreaView>
  );
};
