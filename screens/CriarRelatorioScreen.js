import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView,  ScrollView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Modal, TextInput, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';


function CriarRelatorioScreen() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [icon, setIcon] = useState('plus');
  const [reports, setReports] = useState([]);
  const [newReportData, setNewReportData] = useState('');
  const [newReportLocal, setNewReportLocal] = useState('');
  const [newReportAdversario, setNewReportAdversario] = useState('');
  const [newReportEmail, setNewReportEmail] = useState('');
  const [newReportText, setNewReportText] = useState('');


  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const usersCollectionRef = collection(db, 'users');
          const q = query(usersCollectionRef, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty()) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              console.log('User Name:', userData.name);
            });
          } else {
            console.log('User document not found.');
          }
        } catch (error) {
          console.error('Error getting user:', error);
        }
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);


  const handleOpenModal = () => {
    setIsModalVisible(true);
    setIcon('minus');
  };

  const atletaRelatorio = (item) => {
    navigation.navigate('AtletaRelatorio', { relatorio: item });
  };
  
  
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIcon('plus');
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const handleSaveReport = async () => {
    const newReport = {
      data: newReportData,
      local: newReportLocal,
      adversario: newReportAdversario,
    };
  
    try {
      // Save the new report to the database
      await addDoc(collection(db, 'reports'), newReport);
      console.log('Report saved successfully!');
      // Reset the input fields
      setNewReportData('');
      setNewReportLocal('');
      setNewReportAdversario('');
      setNewReportEmail('');
      setNewReportText('');
    } catch (error) {
      console.error('Error saving report:', error);
    }
  };
  

  const renderReport = ({ item }) => (
    <TouchableOpacity onPress={() => atletaRelatorio(item)}>
      <View style={[styles.reportContainer, { width: '100%' }]}>
        <Image
          source={require('../assets/LinhaPreta.png')}
          style={{ width: '100%', height: 180, position: 'absolute' }}
        />
        <Image
          source={require('../assets/LinhaAmarela.png')}
          style={{ width: '100%', height: 3, position: 'absolute' }}
        />
        <Text style={{ fontSize: 18, color: 'white' }}>Data: {item.data}</Text>
        <Text style={{ fontSize: 18, color: 'white' }}>Local: {item.local}</Text>
        <Text style={{ fontSize: 18, color: 'white' }}>Adversario: {item.adversario}</Text>
      </View>
    </TouchableOpacity>
  );
  
  
  
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={{ flex: 1 }}>
      <Image
          source={require('../assets/LinhaAmarela.png')}
          style={{ width: '100%', height: 4, position: 'absolute', top: 95, left: 0 }}
        />
        <View style={{ marginTop: 40, marginLeft: 20, marginRight: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            width: 120,
            height: 45,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            top: -12,
            left: 225,
          }}
          onPress={handleOpenModal}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Criar</Text>
        </TouchableOpacity>

          <FlatList
            data={reports}
            renderItem={renderReport}
            keyExtractor={(item) => item.id}
            style={{ width: 1200, height: 2000, position: 'absolute', top: 55, left: -20}}
          />
        </View>
      </View>
      <Modal visible={isModalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
          <FontAwesome name="angle-double-left" size={48} color="black" />
        </TouchableOpacity>
        <View style={{ marginLeft: 20, marginRight: 20 }}>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              placeholder="Data"
              style={styles.input}
              value={newReportData}
              onChangeText={setNewReportData}
            />
            <TextInput
              placeholder="Local"
              style={styles.input}
              value={newReportLocal}
              onChangeText={setNewReportLocal}
            />
            <TextInput
              placeholder="Adversário"
              style={styles.input}
              value={newReportAdversario}
              onChangeText={setNewReportAdversario}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              width: 120,
              height: 45,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              top: -12,
              left: 225,
            }}
            onPress={() => {handleSaveReport(); handleCloseModal();}}
          >
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Salvar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
    
  </KeyboardAvoidingView>)}

export default CriarRelatorioScreen;

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
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
})