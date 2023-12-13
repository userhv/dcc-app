import * as React from 'react';
import { Dimensions, FlatList, View, useColorScheme } from 'react-native';
import { Text, List, useTheme, IconButton, RadioButton } from 'react-native-paper';
import { modalAreasStyle } from './style/ModalAreasStyle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Divisor } from '../../../components/Divisor/Divisor';

interface IModalAreas {
    handleClose: () => void;
    areas: string[];
    area: string;
    setArea: React.Dispatch<React.SetStateAction<string>>;
}

export const ModalAreas = (props: IModalAreas) => {
    const { handleClose, areas, setArea, area } = props;
    const {width, height} = Dimensions.get('window');
    const [checked, setChecked] = React.useState(area ?? '');
    
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
                    <IconButton icon='close' iconColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto} onPress={handleClose}/>
                    <Text variant='titleSmall' numberOfLines={2}> Selecione a área de interesse</Text>
                </View>
                <Divisor/>
                <View style={{flex: 1}}>
                    <FlatList 
                        data={areas} 
                        renderItem={({item}) => 
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                  <RadioButton
                                        value={item}
                                        status={ checked === item ? 'checked' : 'unchecked' }
                                        onPress={() => {
                                            setChecked(item)
                                            setArea(item)
                                            handleClose()}}
                                        color={colors.accentClaro}
                                        uncheckedColor={colors.accentClaro}
                                    />
                                <List.Item  
                                    title={item}/>
                            </View>
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