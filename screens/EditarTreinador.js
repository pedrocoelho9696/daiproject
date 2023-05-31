import React, {useState, useEffect} from 'react'
import {  KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core'



function Perfil () {
    const [modalVisible, setModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [icon, setIcon] = useState('plus');   
    const [user, setUser] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
          if (user) {
            setUser(user);
          } else {
            setUser(null);
          }
        });
    }, []);

    const PerfilTreinador = () => {
        navigation.navigate("PerfilTreinador");
    };

    const AddEscalao = () => {
        navigation.navigate("AddEscalao");
    };

    const openModal = () => {
        setModalVisible(true);
    };
    
    const closeModal = () => {
        setModalVisible(false);
    };

    return(
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <View>
            <TouchableOpacity onPress={openModal}>   
                <Image
                    source={require('../assets/RetanguloPretoGrande.png')}
                    style={{ width: 227, height: 65, position: 'absolute', top: 190, right: 80 }} />
                <Text
                    style={{ color: 'white', width: 230, height: 200, position: 'absolute', top: 197, right: 5, fontSize: 26, fontWeight: 400}}>Email
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openModal}>   
                <Image
                    source={require('../assets/RetanguloPretoGrande.png')}
                    style={{ width: 227, height: 65, position: 'absolute', top: 290, right: 80 }} />
                <Text
                    style={{ color: 'white', width: 230, height: 200, position: 'absolute', top: 297, right: 44, fontSize: 26, fontWeight: 400}}>Palavra-passe
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={PerfilTreinador}>   
                <Image
                    source={require('../assets/RetanguloPreto.png')}
                    style={{ width: 125, height: 40, position: 'absolute', top: 740, right: 20 }} />
                <Text
                    style={{ color: 'white', width: 230, height: 200, position: 'absolute', top: 746, right: -90, fontSize: 20, fontWeight: 400}}>Não Guardar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={PerfilTreinador}>   
                <Image
                    source={require('../assets/RetanguloPreto.png')}
                    style={{ width: 125, height: 40, position: 'absolute', top: 740, left: 20 }} />
                <Text
                    style={{ color: 'white', width: 230, height: 200, position: 'absolute', top: 746, right: 120, fontSize: 20, fontWeight: 400}}>Guardar
                </Text>
            </TouchableOpacity> 
            <Modal visible={modalVisible} transparent={true} onRequestClose={closeModal}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={closeModal}
                        activeOpacity={1}
                    >
                    <View style={{backgroundColor: 'white', width: 390, height: 800, position: 'absolute', top: 200, left: 0  }}> 
                        <Image
                            source={require('../assets/guimaraes.png')}
                            style={{ width: 50, height: 75, position: 'absolute', top: 50, right: 20 }} />
                        </View>
                        <TouchableOpacity onPress={closeModal}>   
                            <Image
                                source={require('../assets/RetanguloPreto.png')}
                                style={{ width: 125, height: 40, position: 'absolute', top: 740, right: 20 }} />
                            <Text
                                style={{ color: 'white', width: 230, height: 200, position: 'absolute', top: 746, right: -120, fontSize: 20, fontWeight: 400}}>Voltar
                                </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>


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