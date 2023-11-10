import React, { useEffect, useState } from 'react';
import { View, useColorScheme, Image } from 'react-native';
import { Text, useTheme, Button, TextInput } from 'react-native-paper';
import { modalAutenticacaoStyle } from './AutenticacaoStyle';
import axios from 'axios';
import {IAsyncStorageUser, tituloDicionario } from '../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_ASYNC_COLLECTION } from '../../config/storageConfig';
import { cadastroOff } from '../../modules/usuario/api/cadastroOff';

interface IModalAutenticacao {
    handleLogin:() => Promise<any>;
    handleCancela: () => void;
    navigation: any;
    setUser: React.Dispatch<React.SetStateAction<IAsyncStorageUser | undefined>>;
}

interface User {
  brPersonCPF: string;
  displayName: string;
  mail: string;
  title: string;
  uid: string;
}

export const ModalAutenticacao = (props: IModalAutenticacao) => {
    const { handleCancela, handleLogin, navigation, setUser } = props;

    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const styles = modalAutenticacaoStyle(colors);
    const colorScheme = useColorScheme();
    const [username, setUsername] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");   
    const [error, setError] = useState<number> (0); 
    const [msgError, setMsgError] = useState<string | undefined>(undefined);


    const autenticaUsuario = () => {
      axios.post('https://www.app.dcc.ufmg.br/auth',  {
        user: username,
        pwd: pwd
      })
        .then(async(data) => {
          if(data.data === 49 || data.data === 34){
            setError(data.data);
          }
          else if(username !== '' && pwd !== '')
            await formataUsuario(data.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    

    useEffect(() => {
      setUsername('');
      setPwd('');
      if(error === 2)
       setMsgError('Seu usuário não foi autenticado pois seus dados não estão completos, consulte o CRC.');
      else if(error === 49 || error === 34)
        setMsgError('Suas credencias são inválidas, digite novamente.');
    }, [error])


    useEffect(() => {
      if(username !== '' || pwd !== '')
        setError(0);
    },[username, pwd])



    const formataUsuario = async (user: string) => {
      const json = JSON.parse(user);
      const usuarioTratado: any = {}
      json.forEach((props: any) => 
        usuarioTratado[props.type] = props.values[0]
      )
      await validaUsuario(usuarioTratado);
    }

    const validaUsuario = async (user: User) => {
      if(user.brPersonCPF !== ''){
        const transformaTitulo = user.title.replace('-', '');
        const userDoc ={
          _id: user.brPersonCPF,
          nome: user.displayName,
          email: user.mail,
          titulo: tituloDicionario[transformaTitulo],
          uid: user.uid
        }
        setUser(userDoc)
        await configuraUsuarioAsyncStorage({...userDoc});
        await cadastroOff.insert({...userDoc});
        await handleLogin();
        handleCancela();
      }else if(user.brPersonCPF === ''){
        setError(2);
      }
    }

    const configuraUsuarioAsyncStorage = async (user: IAsyncStorageUser) => {
      try {
        const userJsonString = JSON.stringify(user);
        await AsyncStorage.clear();
        await AsyncStorage.setItem(USER_ASYNC_COLLECTION, userJsonString);
      } catch (e: any) {
        console.log(e)
      }
    };

    return (
        <View style={{...styles.container, backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco}}>
             <Image source={colorScheme === 'dark' ? require( '../../../img/DCC-Oficial-Dark.png') : require('../../../img/DCC-Oficial-Light.png')} 
             style={{height: 100, width: 300, alignSelf: 'center'}} resizeMode='cover' />
             <Text style={{textAlign: 'center', paddingTop: 10}} variant='titleMedium'> Conecte com a sua conta do DCC</Text>
             {error ? (
              <Text style={{textAlign: 'center', paddingTop: 10, color: colors.vermelhoVivoForte}} variant='labelLarge'> 
                  {msgError}
              </Text>
             ): null }
           <View style={styles.form}>
             <View style={styles.labelForm}>
                 <Text variant='labelLarge'> Seu usuário  </Text>
             </View>

             <TextInput
                mode="outlined"
                accessible={true}
                autoCapitalize='none'
                accessibilityLabel='Digite seu usuário'
                accessibilityRole='text'
                selectionColor={colorScheme === 'dark' ? colors.branco: colors.preto}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                activeOutlineColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}
                numberOfLines={1}
                textColor={colorScheme === 'dark' ? colors.branco: colors.preto}
                contentStyle={{borderRadius: 8, padding: 5}}
                value={username}
                onChangeText={username => setUsername(username)}
            />

            <View style={styles.labelForm}>
                <Text variant='labelLarge'> Sua senha </Text>
            </View>

            <TextInput
              mode="outlined"
              autoCapitalize='none'
              secureTextEntry={true}
              accessible={true}
              accessibilityLabel='Digite sua senha'
              accessibilityRole='text'
              selectionColor={colorScheme === 'dark' ? colors.branco: colors.preto}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              activeOutlineColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}
              numberOfLines={1}
              textColor={colorScheme === 'dark' ? colors.branco: colors.preto}
              contentStyle={{borderRadius: 8, padding: 5}}
              value={pwd}
              onChangeText={pwd => setPwd(pwd)}
              />
            <View style={{paddingTop: 20,flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20}}>
            <Button
                buttonColor={colors.accent}
                onPress={handleCancela}
                accessible={true}
                accessibilityLabel='Cancelar'
                mode='contained'>
                    Cancelar
              </Button>
              <Button 
                  mode='contained'
                  accessible={true}
                  accessibilityLabel='Autenticar'
                  buttonColor={colors.accent}
                  onPress={autenticaUsuario}>
                  Autenticar
              </Button> 
              </View>
        </View>
        </View>
    )
}