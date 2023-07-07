import * as React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { Text, Divider, List } from 'react-native-paper';
import { theme } from '../../../paper/theme';
import { modalAreasStyle } from './style/ModalAreasStyle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface IModalAreas {
    handleClose: () => void;
    areas: string[];
    setArea: React.Dispatch<React.SetStateAction<string>>;
}

export const ModalAreas = (props: IModalAreas) => {
    const { handleClose, areas, setArea } = props;
    const {width, height} = Dimensions.get('window');

    return (
        <View style={{...modalAreasStyle.container, height: height}}>
            <GestureHandlerRootView onTouchStart={handleClose}>
                <View style={{backgroundColor: 'transparent', height: height/2 }}/>
            </GestureHandlerRootView>
            <View style={{...modalAreasStyle.boxAreas,  height: height/2}}>
                <View style={modalAreasStyle.containerTopo}>
                    <Text variant='titleSmall' numberOfLines={2}> Selecione a área de interesse</Text>
                </View>
                <Divider style={modalAreasStyle.divisor} />
                <View style={{flex: 1}}>
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
        </View>


    )
}