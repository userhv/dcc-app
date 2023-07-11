import React, { useContext } from 'react';
import { Animated, StatusBar, View } from 'react-native';
import { theme } from '../../paper/theme';
import {  IconButton, Text } from 'react-native-paper';
import { animatedHeaderStyle } from './AnimatedHeaderStyle';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NetInfoContext } from '../../context/NetInfoContext';
import { BoxConexaoInternet } from '../BoxConexaoInternet/BoxConexaoInternet';

interface IAnimatedHeader {
  mensagemTitulo: string;
  animatedValue: Animated.Value;
  navigation?: NativeStackNavigationProp<any>;
  disableIcon?: boolean;
  renderIcon?: any;
}

export const AnimatedHeader = (props: IAnimatedHeader) => {

  const { animatedValue, navigation, mensagemTitulo, disableIcon } = props;

      const Header_Maximum_Height = 130;
      const Header_Minimum_Height = 50;

      const animateHeaderHeight =
      animatedValue.interpolate({
          inputRange: [0, Header_Maximum_Height],
          outputRange: [Header_Maximum_Height, Header_Minimum_Height],
          extrapolate: 'clamp',
        });

    const temConexao = useContext(NetInfoContext);

      return (
        <>
          <BoxConexaoInternet temConexao={temConexao} />
          <Animated.View
              style={[
                animatedHeaderStyle.header,
                {
                  height: animateHeaderHeight,
                  backgroundColor: theme.colors.branco,
                },
              ]}>

            <StatusBar backgroundColor={theme.colors.branco} barStyle='dark-content' />
            <View>
              {!disableIcon ? (
                <IconButton
                  accessible={true}
                  accessibilityLabel='Toque para voltar a página'
                  accessibilityRole='button' 
                  icon='arrow-left'
                  iconColor={theme.colors.azul}
                  size={24}
                  onPress={navigation?.goBack}
                />
              ): null}
              </View>
              <View style={animatedHeaderStyle.texto}>
                <Text variant='headlineMedium' numberOfLines={1}> {mensagemTitulo} </Text>
              </View>
            </Animated.View>
          </>
      );
};