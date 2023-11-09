import React, { useContext, useEffect, useState } from 'react';
import { Platform, View, useColorScheme  } from 'react-native';
import {  perfilStyle } from '../style/PerfilStyle';
import { HeaderBar } from '../../../../components/HeaderBar/HeaderBar';
import { styleIOS } from '../../../../paper/stylesIOS';
import { Button, useTheme, Text } from 'react-native-paper';
import { Alerta } from '../../../../components/Alerta/Alerta';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../../components/GeneralComponents/GeneralComponents';
import { ModalConfirmacao } from '../../../../components/ModalConfirmacao/ModalConfirmacao';
import { anexoOff } from '../../../anexos/anexoOff';
import { IAnexo } from '../../../anexos/IAnexo';
import { Divisor } from '../../../../components/Divisor/Divisor';
import { BoxUpload } from '../../../usuario/pages/BoxUpload/BoxUpload';
import { EnumAnexo } from '../../../anexos/EnumAnexo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import storage from '@react-native-firebase/storage';

export const Perfil = (props: any) => {
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = perfilStyle(colors);
	const colorScheme = useColorScheme();

	const {navigation, route} = props;

	const user = route.params.user;	
	const [curriculo, setCurriculo] = useState<IAnexo | undefined>( undefined);
	const [historico, setHistorico] = useState<IAnexo | undefined>(undefined);

	const [nomeCurriculo, setNomeCurriculo] = useState<string | undefined>(route.params.nomeCurriculo ?? undefined) ;
	const [nomeHistorico, setNomeHistorico] = useState<string | undefined>(route.params.nomeHistorico ?? undefined);
	const [uriCurriculo, setUriCurriculo] = useState<string | undefined>(undefined);
	const [uriHistorico, setUriHistorico] = useState<string | undefined>(undefined);

	const { showModal, showSnackBar, showDialog } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;

	const style = Platform.OS === 'ios' ? styleIOS : null;

	useEffect(() => {
		const retornaArquivos = async() => {
			const curriculo = await anexoOff.retornaAnexo(user.email, EnumAnexo.CURRICULO) as IAnexo[];
			const historico = await anexoOff.retornaAnexo(user.email, EnumAnexo.HISTORICO) as IAnexo[];
			setCurriculo(curriculo.length > 0 ? curriculo[0] : undefined);
			setHistorico(historico.length > 0 ? historico[0] : undefined);
		}
		retornaArquivos();
	},[])


	const selecionaCurriculo = async () => {
		try {
		const res = await DocumentPicker.pickSingle({
			type: [DocumentPicker.types.pdf],
			copyTo: 'documentDirectory',
		});
		
		setNomeCurriculo(res.name ?? '');
		setUriCurriculo(res.fileCopyUri ?? undefined);
		} catch (err) {
			if (DocumentPicker.isInProgress(err)) 
				console.log('User progress')
				
			if (DocumentPicker.isCancel(err)) 
				console.log('User cancelled')
			 else 
				throw err;
			
		}
	}

	const selecionaHistorico = async () => {
		try {
		const res = await DocumentPicker.pickSingle({
			type: [DocumentPicker.types.pdf],
			copyTo: 'documentDirectory',
		});
		setNomeHistorico(res.name ?? '');
		setUriHistorico(res.fileCopyUri ?? undefined);
		} catch (err) {

			if (DocumentPicker.isInProgress(err)) 
				console.log('User progress')
				
			if (DocumentPicker.isCancel(err)) 
				console.log('User cancelled')
			 else 
				throw err;
		}
	}

	const montarDocumentoParaSalvar = (doc: IAnexo | undefined, nomeDoc: string | undefined, url:string, tipo: EnumAnexo) =>{
		const documento = {
			...doc,
			email: user?.email,
			nome: nomeDoc,
			link: url,
			tipo: tipo,
		}
		return documento;

	}
	const modalSalvarDados = () => {
		showModal({
		   renderedComponent: (_props: any) => (
			 <ModalConfirmacao
				 navigation={navigation}
			   handleCancela={_props.onDismiss}
			   handleConfirma={async() => {
					await salvaCadastro() 
					navigation.goBack();
				}}
			   texto='Todos os seus documentos serão salvos localmente.'
			   titulo='Salvar documentos?'
			   labelConfirmar='Salvar'
				 {...{ showSnackBar, showDialog }}/>
		   )
		   });
   }

	const salvaCadastro = async () => {
		const referenciaCurriculo = storage().ref(`curriculo_${user._id}_${user.nome.replaceAll(' ', '_')}.pdf`);
		const referenciaHistorico = storage().ref(`historico_${user._id}_${user.nome.replaceAll(' ', '_')}.pdf`);
		if(uriCurriculo){
			await referenciaCurriculo.putFile(uriCurriculo);
			const urlCurriculo = await referenciaCurriculo.getDownloadURL();
			const curriculoDoc =  montarDocumentoParaSalvar(curriculo, nomeCurriculo, urlCurriculo, EnumAnexo.CURRICULO);
			await anexoOff.salvaCadastro(curriculoDoc);
			
		}
		if(uriHistorico){
			await referenciaHistorico.putFile(uriHistorico);
			const urlHistorico = await referenciaHistorico.getDownloadURL();
			const historicoDoc =  montarDocumentoParaSalvar(historico, nomeHistorico, urlHistorico, EnumAnexo.HISTORICO);
			await anexoOff.salvaCadastro(historicoDoc);
		}	
	}

	return (
		<View style={{...styles.container, ...style}}>
		<HeaderBar navigation={navigation} titulo='Meus documentos'/>
		<GestureHandlerRootView style={{flex: 1}}>
		<ScrollView style={{flex: 1}}>		
			<Alerta detalhes={
				<Text 	variant='labelLarge' 
						style={{color: colorScheme === 'dark' ? colors.vermelhoVivoForte : colors.vermelhoVivo}} 
						numberOfLines={4}> 
					Anexe arquivos em formato PDF para serem utilizados no cadastro da oportunidade. </Text>
            } />
			<View  style={{...styles.areaUpload, backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco}}>

				<BoxUpload 
					labelBotaoAcao='Upload do currículo'
					acao={setNomeCurriculo}
					selecionaAcao={selecionaCurriculo}
					tipoUpload={nomeCurriculo}
					tituloUpload='Meu currículo'
				/>
				<Divisor style={{marginBottom: 10}}/>

				<BoxUpload 
					labelBotaoAcao='Upload do histórico'
					acao={setNomeHistorico}
					selecionaAcao={selecionaHistorico}
					tipoUpload={nomeHistorico}
					tituloUpload='Histórico escolar'
				/>
			</View>
			<View style={{...styles.boxBotoesSalvar, justifyContent: 'center'}}>
			<Button mode='contained' 
				style={{backgroundColor: !nomeCurriculo || !nomeHistorico ? (colorScheme === 'dark' ? colors.cinza40 : colors.cinza90) : colorScheme === 'dark' ? colors.accentOpacoDark: colors.accent}}
				disabled={!nomeCurriculo || !nomeHistorico}
				icon={() => <Icon name='file-check-outline' size={20} color={!nomeCurriculo || !nomeHistorico ? colors.cinza60 : colors.branco}/>}
				onPress={() => {
					  modalSalvarDados();
					 }}> 
				<Text style={{color: !nomeCurriculo || !nomeHistorico ?  colors.cinza60 : colors.branco}}> Salvar documentos</Text>
			</Button>
		</View>
		
	</ScrollView>
	</GestureHandlerRootView>
			
			
	  	</View>
	);
};
