import * as React from 'react';
import { FlatList, StatusBar, View } from 'react-native';
import { Text, IconButton, Divider, List } from 'react-native-paper';
import { theme } from '../../../paper/theme';
import { modalAreasStyle } from './style/ModalAreasStyle';

interface IModalAreas {
    handleClose: () => void;
    areas: string[];
    setArea: React.Dispatch<React.SetStateAction<string>>;
}

export const ModalAreas = (props: IModalAreas) => {
    const { handleClose, areas, setArea } = props;

    return (
        <View style={modalAreasStyle.container}>
            <StatusBar hidden/>
            <View style={modalAreasStyle.containerTopo}>
                <Text variant='titleMedium'> Selecione a área de pesquisa</Text>
                <IconButton
                    accessible={true}
                    accessibilityLabel='Toque para fechar a página'
                    accessibilityRole='button' 
                    icon='close'
                    iconColor={theme.colors.azul}
                    size={24}
                    style={modalAreasStyle.iconeFechar}
                    onPress={handleClose}
                />
            </View>
            <View>
            <FlatList 
              data={areas}
              renderItem={({item}) => 
              <>
                <List.Item onPress={() => {
                    setArea(item);
                    handleClose();
                }} 
                    title={item}
                    rippleColor={theme.colors.azulOpacoMenuOportunidades}/>
                  <Divider style={modalAreasStyle.divisor} />

                </>
        }
              keyExtractor={(item) => item}
              removeClippedSubviews
              initialNumToRender={8}
            />
            </View>


        </View>
    )
}