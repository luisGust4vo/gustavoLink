import React, { useState } from 'react';
import {TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform,Modal, ActivityIndicator} from 'react-native';

import{ LinearGradient } from 'expo-linear-gradient';
import StatusBarPage from '../../components/StatusBarPage';
import Menu from '../../components/Menu';
import ModalLink from '../../components/ModalLinks';

import{ Feather } from '@expo/vector-icons';
import { ContainerLogo, Logo, ContainerContent, Title, SubTitle, ContainerInput,
         BoxIcon, Input, ButtonLink, ButtonLinkTxt} from './styles';

import api from  '../../services/API'
import {saveLink } from '../../utils/storeLinks';


export default function Home(){
    
    const [loading, setLoading] = useState(false);
    const [input, setInput]=useState('');
    const [modalVisible, setModalVisible]= useState(false);
    const [data,setData] = useState ({})

    async function  handleShortLink(){
       setLoading(true);
       
        try{
        const response = await api.post('/shorten',{
            long_url: input
        })
        
        setData(response.data);
        setModalVisible(true);
        
        saveLink('luis', response.data);

        Keyboard.dismiss(); 
        setLoading(false);
        setInput('');
    }catch{
        alert('Ops! parece que deu algo errado');
        Keyboard.dismiss(); 
        setInput('');
        setLoading(false);
       }
    }
    
    return(
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <LinearGradient
                colors={['#1ddbb9','#132742']}
                style={{flex:1,justifyContent:'center'}}

            >
                <StatusBarPage
                    barStyle="light-content"
                    backgroudColor="#1ddbb9"
                />
                
                <Menu/>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'android' ? 'padding' : 'position' }
                    enabled
                >
                    <ContainerLogo>
                        <Logo source ={require('../../assets/Logo.png')} resizeMode = "contain"/>
                    </ContainerLogo>
                
                    <ContainerContent>
                        <Title>GustavoLinks</Title>
                        <SubTitle>Cole seu Link para encurtar</SubTitle>
                        <ContainerInput>
                            <BoxIcon>
                                <Feather name="link" size={22} color="#FFF"/>
                            </BoxIcon>
                            <Input
                                placeholder="Cole seu link aqui..."
                                placeholderTextColor="white"
                                autoCapitalize="none"
                                autoCorrect={false}
                                KeyboardType="url"
                                value={input}
                                onChangeText={ (text) => setInput(text) }
                            />
                        </ContainerInput>
                        
                        <ButtonLink onPress={ handleShortLink }>
                            {
                                loading ?(
                                    <ActivityIndicator color="#121212" size={24}/>
                                ):(
                                    <ButtonLinkTxt>Gerar Link</ButtonLinkTxt>
                                )
                            }
                            
                        </ButtonLink>
                    
                    </ContainerContent>
                </KeyboardAvoidingView>
                <Modal visible={modalVisible} transparent animationType="slide">
                    <ModalLink onClose={()=> setModalVisible(false)} data={data}/>
                </Modal>
            
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}