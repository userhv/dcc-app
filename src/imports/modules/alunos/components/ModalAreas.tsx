import * as React from 'react';
import { Dimensions, FlatList, View, useColorScheme } from 'react-native';
import { Text, List, useTheme, IconButton } from 'react-native-paper';
import { modalAreasStyle } from './style/ModalAreasStyle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Divisor } from '../../../components/Divisor/Divisor';

interface IModalAreas {
    handleClose: () => void;
    areas: string[];
    setArea: React.Dispatch<React.SetStateAction<string>>;
}

export const ModalAreas = (props: IModalAreas) => {
    const { handleClose, areas, setArea } = props;
    const {width, height} = Dimensions.get('window');
    
    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const styles = modalAreasStyle(colors);
    const colorScheme = useColorScheme();

    return (
        <View style={{...styles.container, height: height}}>
            <GestureHandlerRootView onTouchStart={handleClose}>
                <View style={{backgroundColor: 'transparent', height: height/2 }}/>
            </GestureHandlerRootView>
            <View style={{...styles.boxAreas,  height: height/2}}>
                <View style={styles.indicadorToqueCentral} />
                <View style={styles.containerTopo}>
                    <IconButton icon='close' iconColor={colors.accent} onPress={handleClose}/>
                    <Text variant='titleSmall' numberOfLines={2}> Selecione a área de interesse</Text>
                </View>
                <Divisor/>
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
                                    rippleColor={colorScheme === 'dark' ? colors.accentOpacoDark: colors.accentOpaco}/>
                                <Divisor/>
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