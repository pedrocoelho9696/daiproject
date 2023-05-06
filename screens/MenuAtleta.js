import React, {useState, useEffect} from 'react'
import {  KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core'
// import { set } from 'react-native-reanimated';

function MenuAtleta () {
      
    const [modalVisible, setModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [icon, setIcon] = useState('plus');
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');

    const navigation = useNavigation()


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setUser(user);
          } else{
            setUser(null);            
          }
        });
        return unsubscribe;
      }, []);

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
        navigation.navigate("Home");
    };

    const relatorio = () => {
        navigation.navigate("Quizz");
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
                        <TouchableOpacity onPress={handleOpenModal}>
                            <FontAwesome name={icon} size={20} color="black" style={styles.icon} />
                        </TouchableOpacity>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={isModalVisible}
                            onRequestClose={handleCloseModal}>
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={handleCloseModal}
                                activeOpacity={1}
                            >                                                          
                                    <TouchableOpacity onPress={() => console.log('Botão 2 pressionado')}>
                                        <Text
                                            style={{ color: 'black', width: 130, height: 70, position: 'absolute', top: 480, left: 75, fontSize: 18}}>Questionários
                                        </Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity onPress={() => console.log('Botão 2 pressionado')}>
                                        <Text
                                            style={{ color: 'black', width: 130, height: 70, position: 'absolute', top: 510, left: 75, fontSize: 18}}>Relatórios
                                        </Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity onPress={handleCloseModal}>
                                        <FontAwesome name="close" size={30} color="black" style={styles.icon2}/>
                                    </TouchableOpacity>
                                    
                                    </TouchableOpacity> 
                                </Modal>  
                            <Image
                                source={require('../assets/guimaraes.png')}
                                style={{ width: 50, height: 75, position: 'absolute', top: 50, right: 20 }} />
                            <Text
                                style={{ color: '#ABABAB', width: 120, height: 120, position: 'absolute', top: 90, left: 20, fontSize: 20, fontWeight: 500 }}>ID: X
                        </Text>
                        <Text
                            style={{ color: 'black', width: 120, height: 120, position: 'absolute', top: 130, left: 20, fontSize: 20, fontWeight: 500 }}>name
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
                                source={require('../assets/Saude.png')}
                                style={{ width: 35, height: 40, position: 'absolute', top: 390, left: 38, backgroundColor: 'white'}}
                            />
                            <Text
                                style={{ color: 'black', width: 120, height: 120, position: 'absolute', top: 395, left: 90, fontSize: 20, fontWeight: 300}}>Saude
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
                        <TouchableOpacity>
                            <Image
                                source={require('../assets/Definicoes.png')}
                                style={{ width: 25, height: 25, position: 'absolute', top: 290, left: 38, backgroundColor: 'white'}}
                            />
                            <Text
                                style={{ color: 'black', width: 120, height: 120, position: 'absolute', top: 288, left: 80, fontSize: 20, fontWeight: 300}}>Definições
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require('../assets/Pessoa.png')}
                                style={{ width: 80, height: 40, position: 'absolute', top: 330, left: 15, backgroundColor: 'white'}}
                            />
                            <Text
                                style={{ color: 'black', width: 120, height: 120, position: 'absolute', top: 340, left: 90, fontSize: 20, fontWeight: 300}}>Perfil
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
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
                style={{ color: 'black', width: 120, height: 120, position: 'absolute', top: 170, left: 120, fontSize: 20, fontWeight: 500 }}>Olá, X!
            </Text>
            <Image
                source={require('../assets/Tarefas.png')}
                style={{ width: 115, height: 22, position: 'absolute', top: 260, left: 40 }} />
            <Image
                source={require('../assets/LinhaAmarela.png')}
                style={{ width: 420, height: 40, position: 'absolute', top: 300, right: 0 }} />
            <Image
                source={require('../assets/LinhaPreta.png')}
                style={{ width: 420, height: 400, position: 'absolute', top: 340, right: 0 }} />
            <Image
                source={require('../assets/LinhaAmarela.png')}
                style={{ width: 420, height: 40, position: 'absolute', top: 450, right: 0 }} />
            <Image
                source={require('../assets/LinhaAmarela.png')}
                style={{ width: 420, height: 40, position: 'absolute', top: 590, right: 0 }} />
        </KeyboardAvoidingView>
    )
  }

  export default MenuAtleta;

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