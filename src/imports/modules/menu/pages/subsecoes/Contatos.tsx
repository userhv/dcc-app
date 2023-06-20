import {View} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { subSecoesStyle } from '../style/SubSecoesStyle';
import { HeaderBar } from '../../../../components/HeaderBar/HeaderBar';
import { TextInput, Text, Button } from 'react-native-paper';
import { contatosStyle } from '../style/ContatosStyle';
import { theme } from '../../../../paper/theme';
import { useState } from 'react';
import { Linking } from 'react-native';
import qs from 'qs';
import { ScrollView } from 'react-native-gesture-handler';

interface IContatos {
    navigation: NativeStackNavigationProp<any>;
  }

export const Contatos = (props: IContatos) => {

    const { navigation } = props;

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

  return (
    <View style={subSecoesStyle.container}>
      <HeaderBar navigation={navigation} titulo='Fale conosco'/>
      <ScrollView style={{flex: 1}}>
        <View style={contatosStyle.boxAlerta}>
          <View style={contatosStyle.descricao}>
              <Text variant='labelLarge' style={{color: theme.colors.vermelhoVivo, paddingLeft: 5}} numberOfLines={4}> 
              Ao enviar, você será redirecionado para o seu provedor de email padrão. </Text>
          </View>
        </View>
          <View style={contatosStyle.form}>
              <View style={contatosStyle.labelForm}>
                <Text variant='labelLarge'> Escreva o seu feedback  </Text>
              </View>
            <TextInput
                value={text}
                onChangeText={text => setText(text)}
                multiline
                mode='outlined'
                selectionColor={theme.colors.azul}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                activeOutlineColor={theme.colors.azul}
                numberOfLines={10}
                textColor={theme.colors.preto}
                contentStyle={{borderRadius: 8, padding: 5}}
            />
            <View style={{paddingTop: 10,flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button
                mode='contained'
                icon='send'
                disabled={text === ""}
                style={{backgroundColor: text== "" ? theme.colors.cinza90: theme.colors.azul}}
                onPress={async() => await enviarEmail()}>
                Enviar
              </Button>
            </View>
          </View>
      </ScrollView>

    </View>
  );
};