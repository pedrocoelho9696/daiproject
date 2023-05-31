import React, {useState, useEffect} from 'react'
import {  KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/core'
import { initializeApp, firebase } from "firebase/app";
import { collection, addDoc, query, getDocs, onSnapshot, where} from 'firebase/firestore';
import 'firebase/firestore';
import "firebase/auth";

const firebaseConfig = {
    // Your Firebase configuration object goes here
    apiKey: "AIzaSyD2IjBIpJ5P42Wlj019I4MOOT7hL6BqVVM",
    authDomain: "projetodai-73129.firebaseapp.com",
    projectId: "projetodai-73129",
    storageBucket: "projetodai-73129.appspot.com",
    messagingSenderId: "567881372928",
    appId: "1:567881372928:web:482112f08dc25814428fe5",
    measurementId: "G-4B95SDGKKE"
};

initializeApp(firebaseConfig);

function MenuTreinador () {
    
    const [modalVisible, setModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [icon, setIcon] = useState('plus');
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');

    
    const navigation = useNavigation();
   

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setUser(user);
            fetchUserName(user.email);
          } else {
            setUser(null);
            setUserName('');
    }
    })
    return  unsubscribe();
    }, []);

    const fetchUserName = async (email) => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          setUserName(userData.name); 
        }
    }; 
      
      const terminarsessao = () => {
        auth.signOut()
            navigation.replace("Login")
          };
      


    const handleOpenModal = () => {
        setIsModalVisible(true);
        setIcon('minus');
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setIcon('plus');
    };
    
    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const agenda = () => {
        navigation.navigate("Calendario");
    };

    const relatorio = () => {
        navigation.navigate("Quizz");
    };

    const PerfilTreinador = () => {
        navigation.navigate("PerfilTreinador");
    };

    const MenuTreinador = () => {
        navigation.navigate("MenuTreinador");
    };

    const CriarRelatorio = () => {
        navigation.navigate("CriarRelatorio");
    };
    
    


    return (
        <KeyboardAvoidingView style={styles.container} behavior="height"> 
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={openModal}>
                    <Image
                        source={require('../assets/3%20traços.png')}
                        style={{ width: 50, height: 50, position: 'absolute', top: 70, left: 0 }}
                />
                </TouchableOpacity>
                <Modal visible={modalVisible} transparent={true} onRequestClose={closeModal}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={closeModal}
                        activeOpacity={1}
                    >
                    <View style={{backgroundColor: 'white', width: 240, height: 800, position: 'absolute', top: 40, left: 0  }}> 
                            <Image
                                source={require('../assets/guimaraes.png')}
                                style={{ width: 50, height: 75, position: 'absolute', top: 50, right: 20 }} />
                            <Text
                                style={{ color: '#ABABAB', width: 120, height: 30, position: 'absolute', top: 90, left: 20, fontSize: 20, fontWeight: 500 }}>ID: {user.uid}
                        </Text>
                        <Text
                            style={{ color: 'black', width: 120, height: 120, position: 'absolute', top: 130, left: 20, fontSize: 20, fontWeight: 500 }}> {userName}
                        </Text> 
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Image
                                source={require('../assets/setaEsquerda.png')}
                                style={{ width: 50, height: 50, position: 'absolute', top: 30, left: 0, backgroundColor: 'white'}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={agenda}>
                            <Image
                                source={require('../assets/Agenda.png')}
                                style={{ width: 40, height: 30, position: 'absolute', top: 190, left: 30, backgroundColor: 'white'}}
                            />
                            <Text
                                style={{ color: 'black', width: 120, height: 120, position: 'absolute', top: 190, left: 80, fontSize: 20, fontWeight: 300}}>Agenda
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require('../assets/Camisola7.png')}
                                style={{ width: 35, height: 35, position: 'absolute', top: 290, left: 38, backgroundColor: 'white'}}
                            />
                            <Text
                                style={{ color: 'black', width: 120, height: 120, position: 'absolute', top: 295, left: 90, fontSize: 20, fontWeight: 300}}>Plantel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={CriarRelatorio}>
                            <Image
                                source={require('../assets/Relatorio.png')}
                                style={{ width: 25, height: 32, position: 'absolute', top: 240, left: 38, backgroundColor: 'white'}}
                            />
                            <Text
                                style={{ color: 'black', width: 120, height: 120, position: 'absolute', top: 242, left: 85, fontSize: 20, fontWeight: 300}}>Relatorio
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={PerfilTreinador}>
                            <Image
                                source={require('../assets/Definicoes.png')}
                                style={{ width: 25, height: 25, position: 'absolute', top: 345, left: 38, backgroundColor: 'white'}}
                            />
                            <Text
                                style={{ color: 'black', width: 120, height: 120, position: 'absolute', top: 343, left: 80, fontSize: 20, fontWeight: 300}}>Definições
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Image
                                source={require('../assets/Pessoa.png')}
                                style={{ width: 80, height: 40, position: 'absolute', top: 385, left: 15, backgroundColor: 'white'}}
                            />
                            <Text
                                style={{ color: 'black', width: 120, height: 120, position: 'absolute', top: 390, left: 90, fontSize: 20, fontWeight: 300}}>Perfil
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={terminarsessao}>
                            <Image
                                source={require('../assets/Terminar.png')}
                                style={{ width: 35, height: 35, position: 'absolute', top: 600, left: 40, backgroundColor: 'white'}}
                            />
                            <Text
                                style={{ color: 'black', width: 190, height: 100, position: 'absolute', top: 600, left: 85, fontSize: 20, fontWeight: 300}}>Terminar Sessão
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
            <Image
                source={require('../assets/BolaDeVolei.png')}
                style={{ width: 50, height: 50, position: 'absolute', top: 70, right: 60 }} />
            <Image
                source={require('../assets/VoleiSC.png')}
                style={{ width: 209, height: 24, position: 'absolute', top: 90, left: 70 }} />
            <Image
                source={require('../assets/Linha.png')}
                style={{ width: 420, height: 2, position: 'absolute', top: 130, right: 0 }} />
            <Image
                source={require('../assets/Pessoa.png')}
                style={{ width: 120, height: 120, position: 'absolute', top: 130, left: 10 }} />
            <Text
                style={{ color: 'black', width: 120, height: 120, position: 'absolute', top: 170, left: 120, fontSize: 20, fontWeight: 500 }}>Olá, {userName}!
            </Text>
            <Text
                style={{ color: 'grey', width: 120, height: 120, position: 'absolute', top: 250, left: 25, fontSize: 20, fontWeight: 400 }}>Tarefas
            </Text>
            <Image
                source={require('../assets/LinhaPreta.png')}
                style={{ width: 420, height: 510, position: 'absolute', top: 280, right: 0 }} />
            <Image
                source={require('../assets/BarraCinzenta.png')}
                style={{ width: 420, height: 40, position: 'absolute', top: 540, right: 0 }} />
            <Text
                style={{ color: 'white', width: 120, height: 120, position: 'absolute', top: 320, left: 25, fontSize: 17, fontWeight: 300 }}>Escalão: 
            </Text>
            <Text
                style={{ color: 'white', width: 170, height: 120, position: 'absolute', top: 345, left: 25, fontSize: 17, fontWeight: 300 }}>Atletas Inscritos: 
            </Text>
            <Text
                style={{ color: 'white', width: 170, height: 120, position: 'absolute', top: 372, left: 25, fontSize: 17, fontWeight: 300 }}>Estatísticas principais: 
            </Text>
            <Text
                style={{ color: 'white', width: 220, height: 120, position: 'absolute', top: 410, left: 60, fontSize: 17, fontWeight: 300 }}>Numero de jogos realizados: 
            </Text>
            <Text
                style={{ color: 'white', width: 420, height: 200, position: 'absolute', top: 450, left: 60, fontSize: 50, fontWeight: 400 }}>5 V 
            </Text>
            <Text
                style={{ color: 'white', width: 420, height: 200, position: 'absolute', top: 450, left: 220, fontSize: 50, fontWeight: 400 }}>3 D 
            </Text>
            <Text
                style={{ color: 'white', width: 220, height: 120, position: 'absolute', top: 590, left: 25, fontSize: 19, fontWeight: 400 }}>Tipo de treino 
            </Text>
            <Text
                style={{ color: 'white', width: 220, height: 120, position: 'absolute', top: 615, left: 25, fontSize: 19, fontWeight: 400 }}>Local: 
            </Text>
            <Text
                style={{ color: 'white', width: 220, height: 120, position: 'absolute', top: 640, left: 25, fontSize: 19, fontWeight: 400 }}>Horário: 
            </Text>
            <Text
                style={{ color: 'black', width: 220, height: 120, position: 'absolute', top: 545, left: 15, fontSize: 22, fontWeight: 700 }}>Data 
            </Text>            
        </KeyboardAvoidingView>
    )
  }

  export default MenuTreinador;

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        top: 400,
        left: 200, 
    },
    icon2: {
        position: 'absolute',
        top: 425,
        left: 200,

    },
})