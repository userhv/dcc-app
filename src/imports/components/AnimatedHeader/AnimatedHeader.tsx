import React from 'react';
import { Animated, StatusBar, View } from 'react-native';
import { theme } from '../../paper/theme';
import {  IconButton, Text } from 'react-native-paper';
import { animatedHeaderStyle } from './AnimatedHeaderStyle';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

      return (
       <Animated.View
          style={[
            animatedHeaderStyle.header,
            {
              height: animateHeaderHeight,
              backgroundColor: theme.colors.branco,
            },
          ]}>

        <StatusBar backgroundColor={theme.colors.branco}/>
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
      );
};

