import React, {useState, useEffect} from 'react'
import {  KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Image, Modal, FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core'
import { collection, addDoc, query, getDocs, onSnapshot, where} from 'firebase/firestore';
import { db } from '../firebase';

function Perfil () {
    const [modalVisible, setModalVisible] = useState(false); 
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [userEscalaoS, setUserEscalaoS] = useState('');
    const [newReportData, setNewReportData] = useState('');
    const [newReportLocal, setNewReportLocal] = useState('');
    const [newReportAdversario, setNewReportAdversario] = useState('');


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setUser(user);
            fetchUserName(user.email);
            fetchEmail(user.email);
            fetchID(user.email);
            fetchEscalaoS(user.email);
          } else {
            setUser(null);
            setUserName('');
            setUserEmail('');
            setUserId('');
            setUserEscalaoS('');
    }
    })
        return unsubscribe;
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

    const fetchEmail = async (email) => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setUserEmail(userData.email);
  }
};

    const fetchID = async (email) => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setUserId(userData.userId);
  }
};

    const fetchEscalaoS = async (email) => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
        setUserEscalaoS(userData.EscalaoS);
  }
};

   
    const openModal = () => {
        setModalVisible(true);
    };
    
    const closeModal = () => {
        setModalVisible(false);
    }; 
    
    const agenda = () => {
        navigation.navigate("Home");
    };

    const relatorio = () => {
        navigation.navigate("CriarRelatorioScreen");
    };

    const MenuTreinador = () => {
        navigation.navigate("MenuTreinador");
    };

    const EditarTreinador = () => {
        navigation.navigate("EditarTreinador");
    };

    const voltar = () => {
        navigation.navigate("MenuAtleta");
    };

    return(
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
                                style={{ color: '#ABABAB', width: 120, height: 30, position: 'absolute', top: 90, left: 20, fontSize: 20, fontWeight: 500 }}>ID: {userId}
                        </Text>
                        <Text
                            style={{ color: 'black', width: 120, height: 120, position: 'absolute', top: 130, left: 16, fontSize: 16, fontWeight: 600 }}> {userName}
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
                        <TouchableOpacity onPress={relatorio}>
                            <Image
                                source={require('../assets/Relatorio.png')}
                                style={{ width: 25, height: 32, position: 'absolute', top: 240, left: 38, backgroundColor: 'white'}}
                            />
                            <Text
                                style={{ color: 'black', width: 120, height: 120, position: 'absolute', top: 242, left: 85, fontSize: 20, fontWeight: 300}}>Relatorio
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => setModalVisible(false)}>
                            <Image
                                source={require('../assets/Definicoes.png')}
                                style={{ width: 25, height: 25, position: 'absolute', top: 345, left: 38, backgroundColor: 'white'}}
                            />
                            <Text
                                style={{ color: 'black', width: 120, height: 120, position: 'absolute', top: 343, left: 80, fontSize: 20, fontWeight: 300}}>Definições
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={MenuTreinador}>
                            <Image
                                source={require('../assets/Pessoa.png')}
                                style={{ width: 80, height: 40, position: 'absolute', top: 385, left: 15, backgroundColor: 'white'}}
                            />
                            <Text
                                style={{ color: 'black', width: 120, height: 120, position: 'absolute', top: 390, left: 90, fontSize: 20, fontWeight: 300}}>Perfil
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={voltar}>
                            <Image
                                source={require('../assets/Terminar.png')}
                                style={{ width: 35, height: 35, position: 'absolute', top: 600, left: 40, backgroundColor: 'white'}}
                            />
                            <Text
                                style={{ color: 'black', width: 190, height: 100, position: 'absolute', top: 600, left: 85, fontSize: 20, fontWeight: 300}}>Voltar
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
            <View>
                <Image
                    source={require('../assets/BolaDeVolei.png')}
                    style={{ width: 50, height: 50, position: 'absolute', top: 70, right: 50 }} />
                <Image
                    source={require('../assets/VoleiSC.png')}
                    style={{ width: 209, height: 24, position: 'absolute', top: 90, left: 70 }} />
                <Image
                    source={require('../assets/LinhaPreta2.png')}
                    style={{ width: 420, height: 2, position: 'absolute', top: 130, right: 0 }} />
                <Image
                    source={require('../assets/Retangulo.png')}
                    style={{ width: 140, height: 97, position: 'absolute', top: 170, left: 25 }} />
                <Text
                    style={{ color: 'black', width: 230, height: 200, position: 'absolute', top: 170, left: 210, fontSize: 20, fontWeight: 600}}> 
                </Text>
                <TouchableOpacity onPress={EditarTreinador}>
                    <Image
                        source={require('../assets/RetanguloPreto.png')}
                        style={{ width: 100, height: 32, position: 'absolute', top: 290, right: 35 }} />
                    <Text
                        style={{ color: 'white', width: 230, height: 200, position: 'absolute', top: 290, right: -117, fontSize: 20, fontWeight: 400}}>Editar
                    </Text>
                </TouchableOpacity>        
                <Image
                    source={require('../assets/BarraCinzenta.png')}
                    style={{ width: 720, height: 39, position: 'absolute', top: 335, right: 0 }} />
                <Image
                    source={require('../assets/LinhaPreta.png')}
                    style={{ width: 720, height: 600, position: 'absolute', top: 375, right: 0 }} />  
                <Image
                    source={require('../assets/LinhaPreta2.png')}
                    style={{ width: 420, height: 2, position: 'absolute', top: 375, right: 0 }} />
                <Image
                    source={require('../assets/LinhaPreta2.png')}
                    style={{ width: 420, height: 2, position: 'absolute', top: 435, right: 0 }} />      
                <Image
                    source={require('../assets/LinhaPreta2.png')}
                    style={{ width: 420, height: 2, position: 'absolute', top: 495, right: 0 }} />
                <Image
                    source={require('../assets/LinhaPreta2.png')}
                    style={{ width: 420, height: 2, position: 'absolute', top: 555, right: 0 }} />
                <Text
                    style={{ color: 'black', width: 60, height: 450, position: 'absolute', top: 340, right: 170, fontSize: 23, fontWeight: 500}}>Perfil 
                </Text>
                <Text
                    style={{ color: 'black', width: 80, height: 450, position: 'absolute', top: 170, right: 130, fontSize: 20, fontWeight: 500}}>{userName}
                </Text>
                <Text
                    style={{ color: 'white', width: 290, height: 200, position: 'absolute', top: 395, right: 90, fontSize: 20, fontWeight: 400}}>Email: {userEmail}
                </Text>
                <Text
                    style={{ color: 'white', width: 290, height: 200, position: 'absolute', top: 450, right: 90, fontSize: 20, fontWeight: 400}}>Palavra-Passe: *******
                </Text>
                <Text
                    style={{ color: 'white', width: 290, height: 200, position: 'absolute', top: 510, right: 90, fontSize: 20, fontWeight: 400}}>Escalão Selecionado: {userEscalaoS}
                </Text>
                <Text
                    style={{ color: 'white', width: 290, height: 200, position: 'absolute', top: 570, right: 90, fontSize: 20, fontWeight: 400}}>Escalões:
                </Text>
                <Text
                    style={{ color: 'white', width: 290, height: 200, position: 'absolute', top: 570, right: -30, fontSize: 18, fontWeight: 300}}>
                </Text>
                <Text
                    style={{ color: 'white', width: 290, height: 200, position: 'absolute', top: 597, right: -30, fontSize: 18, fontWeight: 300}}>
                </Text>                 

            </View>


        </KeyboardAvoidingView>    
    )
}

  export default Perfil;

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