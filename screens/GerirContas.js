import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Image, Modal, TextInput, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

function GerirContas() {
  const [icon, setIcon] = useState('plus');
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const reportList = [];
      snapshot.forEach((doc) => {
        const reportData = doc.data();
        const report = {
          id: doc.id,
          ...reportData,
        };
        reportList.push(report);
      });
      setUsers(reportList);
    });

    return unsubscribe;
  }, []);

  const renderReport = ({ item }) => (
    <>
      <View style={[styles.reportContainer, { width: '100%' }]}>
        <Image
          source={require('../assets/LinhaPreta.png')}
          style={{ width: '100%', height: 180, position: 'absolute' }}
        />
        <Image
          source={require('../assets/LinhaAmarela.png')}
          style={{ width: '100%', height: 3, position: 'absolute' }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: 'white', marginRight: 30 }}>Nome: {item.name}</Text>

          <TouchableOpacity onPress={() => handleButton1Press(item.id)}>
            <Image source={require('../assets/certo.png')} style={{ width: 20, height: 20, marginLeft: 50 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButton2Press(item.id)}>
            <Image source={require('../assets/errado.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 18, color: "white" }}>Role: {item.role}</Text>
      </View>
    </>
  );

  const handleButton1Press = (userId) => {
    // Lógica para lidar com o pressionar do botão 1
    console.log('Botão 1 pressionado para o usuário:', userId);
  };

  const handleButton2Press = (userId) => {
    // Lógica para lidar com o pressionar do botão 2
    console.log('Botão 2 pressionado para o usuário:', userId);
  };

  const handleVoltarPress = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={{ flex: 1 }}>
        <Image
          source={require('../assets/LinhaAmarela.png')}
          style={{ width: '100%', height: 4, position: 'absolute', top: 95, left: 0 }}
        />
        <View style={{ marginTop: 40, marginLeft: 20, marginRight: 20 }}>
          <FlatList
            data={users}
            renderItem={renderReport}
            keyExtractor={(item) => item.id}
            style={{ width: 1200, height: 2000, position: 'absolute', top: 55, left: -20 }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={handleVoltarPress}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export default GerirContas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reportContainer: {
    // Estilos do container do relatório
  },
  backButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

