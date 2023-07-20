import {Platform, View, useColorScheme} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { subSecoesStyle } from '../style/SubSecoesStyle';
import { HeaderBar } from '../../../../components/HeaderBar/HeaderBar';
import { TextInput, Text, Button, useTheme } from 'react-native-paper';
import { contatosStyle } from '../style/ContatosStyle';
import { useState } from 'react';
import { Linking } from 'react-native';
import qs from 'qs';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { styleIOS } from '../../../../paper/stylesIOS';
import { Alerta } from '../../../../components/Alerta/Alerta';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IContatos {
    navigation: NativeStackNavigationProp<any>;
  }

export const Contatos = (props: IContatos) => {

    const { navigation } = props;
    
    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const stylesSubSecao = subSecoesStyle(colors);
    const styles = contatosStyle(colors);
    const colorScheme = useColorScheme();

    const [text, setText] = useState("");

    const enviarEmail = async () => {
      let url = `mailto:dcc.ufmg@gmail.com`;
      const query = qs.stringify({
        subject: "Feedback do aplicativo",
        body: text,
      });

      if (query.length) {
        url += `?${query}`;
      }
      return Linking.openURL(url);
    }

  const style = Platform.OS === 'ios' ? styleIOS : null;

  return (
    <View style={{...stylesSubSecao.container, ...style}}>
      <HeaderBar navigation={navigation} titulo='Fale conosco'/>
      <GestureHandlerRootView style={{flex: 1}}>
        <ScrollView>
          <Alerta detalhes={
              <Text variant='labelLarge' style={{color: colorScheme === 'dark' ? colors.vermelhoVivoForte : colors.vermelhoVivo}} numberOfLines={4}> 
              Ao enviar, você será redirecionado para o seu provedor de email padrão. </Text>
          } />
            <View style={styles.form}>
                <View style={styles.labelForm}>
                  <Text variant='labelLarge'> Escreva o seu feedback  </Text>
                </View>
              <TextInput
                  accessible={true}
                  accessibilityLabel='Digite o feedback'
                  accessibilityRole='text'
                  value={text}
                  onChangeText={text => setText(text)}
                  multiline
                  mode='outlined'
                  selectionColor={colorScheme === 'dark' ? colors.branco: colors.preto}
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  activeOutlineColor={colors.accent}
                  numberOfLines={10}
                  textColor={colorScheme === 'dark' ? colors.branco: colors.preto}
                  contentStyle={{borderRadius: 8, padding: 5, minHeight: Platform.OS === `ios`? 250 : null}}
              />
              <View style={{paddingTop: 10,flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Button
                  accessible={true}
                  accessibilityLabel='Toque para enviar o feedback'
                  accessibilityRole='button'
                  mode='contained'
                  icon={() => <Icon name='send' size={20} color={text== "" ? colors.cinza60 : colors.branco}/>}
                  disabled={text === ""}
                  style={{backgroundColor: text== "" ? colorScheme === 'dark' ? colors.cinza40 : colors.cinza90 : colors.accent, width: 120}}
                  textColor={text === "" ? colors.cinza60 : colors.branco}
                  onPress={async() => await enviarEmail()}>
                  Enviar
                </Button>
              </View>
            </View>
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};