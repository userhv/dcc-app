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
import RNFS from 'react-native-fs';
import { anexoOff } from '../../../anexos/anexoOff';
import { IAnexo } from '../../../anexos/IAnexo';
import { Divisor } from '../../../../components/Divisor/Divisor';
import { BoxUpload } from '../../../usuario/pages/BoxUpload/BoxUpload';
import { EnumAnexo } from '../../../anexos/EnumAnexo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Perfil = (props: any) => {
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = perfilStyle(colors);
	const colorScheme = useColorScheme();

	const {navigation, route} = props;

	const user = route.params.user;
	
	const [curriculo, setCurriculo] = useState<IAnexo | undefined>(undefined);
	const [historico, setHistorico] = useState<IAnexo | undefined>(undefined);

	const [nomeCurriculo, setNomeCurriculo] = useState<string | undefined>(undefined);
	const [nomeHistorico, setNomeHistorico] = useState<string | undefined>(undefined);
	const [uriCurriculo, setUriCurriculo] = useState<string | undefined>(undefined);
	const [uriHistorico, setUriHistorico] = useState<string | undefined>(undefined);

	const { showModal, showSnackBar, showDialog } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;

	const style = Platform.OS === 'ios' ? styleIOS : null;

	useEffect(() => {
		const retornaArquivos = async() => {
			const curriculo = await anexoOff.retornaAnexo(user.email, EnumAnexo.CURRICULO) as IAnexo[];
			const historico = await anexoOff.retornaAnexo(user.email, EnumAnexo.HISTORICO) as IAnexo[];
			setCurriculo(curriculo.length > 0 ? curriculo[0] : undefined);
			setNomeCurriculo(curriculo.length > 0 ? curriculo[0].nome : '');
			setHistorico(historico.length > 0 ? historico[0] : undefined);
			setNomeHistorico(historico.length > 0 ? historico[0].nome : '');
		}
		retornaArquivos();
	},[])


	const selecionaCurriculo = async () => {
		try {
		const res = await DocumentPicker.pickSingle({
			type: [DocumentPicker.types.pdf],
		});
		setNomeCurriculo(res.name ?? '');
		setUriCurriculo(res.uri);
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
		});
		setNomeHistorico(res.name ?? '');
		setUriHistorico(res.uri);
		} catch (err) {

			if (DocumentPicker.isInProgress(err)) 
				console.log('User progress')
				
			if (DocumentPicker.isCancel(err)) 
				console.log('User cancelled')
			 else 
				throw err;
		}
	}

	const converteBase = async(path: string | undefined) => {
		if(path)
			return await RNFS.readFile(path, 'base64');
		else
			return undefined;
	}

	const montarCurriculoParaSalvar = async () => {
		const base64Curriculo = await converteBase(uriCurriculo as string);
		if(base64Curriculo){
			const curriculoNovo = {
				...curriculo,
				email: user?.email,
				nome:  nomeCurriculo,
				base64: base64Curriculo,
				tipo: EnumAnexo.CURRICULO,
			}
			return curriculoNovo;
		}
		else
			undefined;
	}

	const montarHistoricoParaSalvar = async () => {
		const base64Historico = await converteBase(uriHistorico as string);
		if(base64Historico){
			const historicoNovo = {
				...historico,
				email: user?.email,
				nome: nomeHistorico,
				base64: base64Historico,
				tipo: EnumAnexo.HISTORICO,
			}
			return historicoNovo;
		}
		else
			undefined;
	}


	const salvaCadastro = async () => {
		try {
			const curriculo = await montarCurriculoParaSalvar();
			curriculo ? await anexoOff.salvaCadastro(curriculo) : undefined;
			const historico = await montarHistoricoParaSalvar();
			historico ? await anexoOff.salvaCadastro(historico) : undefined;
		} catch (error) {
			console.log(error);
		}
	}

	const modalSalvarDados = async () => {
		showModal({
			renderedComponent: (_props: any) => (
			  <ModalConfirmacao
				handleCancela={_props.onDismiss}
				handleConfirma={async() => await salvaCadastro()}
				texto='Todos os seus documentos serão salvos localmente.'
				titulo='Salvar documentos?'
				labelConfirmar='Salvar'
			  	{...{ showSnackBar, showDialog }}/>
			)
			});
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
				onPress={async() => {
					await modalSalvarDados()}}> 
				<Text style={{color: !nomeCurriculo || !nomeHistorico ?  colors.cinza60 : colors.branco}}> Salvar documentos</Text>
			</Button>
		</View>
		
	</ScrollView>
	</GestureHandlerRootView>
			
			
	  	</View>
	);
};
