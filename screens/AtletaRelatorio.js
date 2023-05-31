import { KeyboardAvoidingView,  ScrollView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Modal, TextInput, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, updateDoc, getDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

function AtletaRelatorioScreen() {
  const route = useRoute();
  const { relatorio } = route.params;
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [icon, setIcon] = useState('plus');
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [newReportText, setNewReportText] = useState('');

  const handleOpenModal = (userEmail) => {
    setSelectedUserEmail(userEmail);
    setIsModalVisible(true);
    setIcon('minus');
  };
  
  
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIcon('plus');
  };

  useEffect(() => {
    const q = query(collection(db, 'users'), where('role', '==', 'Jogadora'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => doc.data());
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);



  const handleSaveReport = async () => {
    try {
      const reportRef = doc(db, 'reports', relatorio.id);
      const reportDoc = await getDoc(reportRef);
  
      if (reportDoc.exists()) {
        const reportData = reportDoc.data();
        const additionalData = reportData.additionalData || [];
        const updatedAdditionalData = [...additionalData, { email: selectedUserEmail, text: newReportText }];
  
        const updatedReport = {
          ...relatorio,
          additionalData: updatedAdditionalData,
        };
  
        await setDoc(reportRef, updatedReport);
        console.log('Report saved successfully!');
        // Reset the input fields
        setNewReportText('');
      } else {
        console.error('Report does not exist');
      }
    } catch (error) {
      console.error('Error saving report:', error);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/LinhaAmarela.png')}
        style={{ width: 420, height: 40, position: 'absolute', top: -47, right: 0 }}
      />
      <Image
        source={require('../assets/LinhaPreta.png')}
        style={{ width: 420, height: 700, position: 'absolute', top: -7, right: 0 }}
      />
      {users.map((user, index) => (
        <TouchableOpacity 
        key={index}
        onPress={() => {
            console.log(user);
            handleOpenModal(user.email);
        }}
        style={styles.userContainer}
      >
      
          <View>
            <Text style={styles.text}>Name: {user.name}</Text>
            <Text style={styles.text}>Email: {user.email}</Text>
          </View>
          {index !== users.length && (
            <Image
              source={require('../assets/LinhaAmarela.png')}
              style={{ width: 420, height: 6, top: 7, right: 30 }}
            />
          )}
        </TouchableOpacity>
      ))}
      <Modal visible={isModalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
          <FontAwesome name="angle-double-left" size={48} color="black" />
        </TouchableOpacity>
        <View style={{ marginLeft: 20, marginRight: 20 }}>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              placeholder="Relatorio"
              style={styles.input}
              value={newReportText}
              onChangeText={setNewReportText}
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
    </View>
  );
}

export default AtletaRelatorioScreen;

const styles = StyleSheet.create({
    container: {
      marginTop: 47,
      marginLeft: 10,
      marginRight: 0,
    },
   
    userContainer: {
      marginBottom: 10,
    },
   
    text: {
        color: 'white',
      },
  });