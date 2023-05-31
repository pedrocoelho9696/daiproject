import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView,  ScrollView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Modal, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { FontAwesome } from '@expo/vector-icons';
import { db, auth } from '../firebase';
import { collection, addDoc, onSnapshot} from 'firebase/firestore';

function RelatorioPessoal() {
  const [user, setUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [icon, setIcon] = useState('plus');
  const [reports, setReports] = useState([]);
  const [selectedReportText, setSelectedReportText] = useState('');

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  
    const unsubscribeReports = onSnapshot(collection(db, 'reports'), (snapshot) => {
      const reportList = [];
      snapshot.forEach((doc) => {
        const reportData = doc.data();
        const report = {
          id: doc.id,
          ...reportData,
        };
        reportList.push(report);
      });
      setReports(reportList);
    });
  
    return () => {
      unsubscribeAuth();
      unsubscribeReports();
    };
  }, []);
  
   

  const handleOpenModal = (reportText) => {
    setSelectedReportText(reportText);
    setIsModalVisible(true);
    setIcon('minus');
  };
  
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIcon('plus');
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  

  const renderReport = ({ item }) => {
    if (user && item.additionalData) {
      const userReport = item.additionalData.find(data => data.email === user.email);
      if (userReport) {
        return (
          <TouchableOpacity onPress={() => handleOpenModal(userReport.text)}>
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
      }
    }
    
    return null; // If no matching user report is found, don't render anything
  };
  
  
  
  
  
  
return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={{ flex: 1 }}>
      <Image
        source={require('../assets/LinhaAmarela.png')}
        style={{ width: 420, height: 50, position: 'absolute', top: 0, right: 0 }}
      />
      <Text
            style={{ color: 'black', width: 1300, height: 110, position: 'absolute', top: 8, left: 100, fontSize: 28, fontWeight: 'bold'}}>Escolher Evento
      </Text>
        <View style={{ marginTop: 40, marginLeft: 20, marginRight: 20 }}>
          <FlatList
            data={reports}
            renderItem={renderReport}
            keyExtractor={(item) => item.id}
            style={{ width: 1200, height: 2000, position: 'absolute', top: 10, left: -20}}
          />
        </View>
      </View>
      <Modal visible={isModalVisible} animationType='slide'>
      <View style={styles.modalContainer}>
        
      <Image
        source={require('../assets/LinhaAmarela.png')}
        style={{ width: 420, height: 50, position: 'absolute', top: 0, right: 0 }}
      />
      <Image
        source={require('../assets/LinhaPreta.png')}
        style={{ width: 420, height: 750, position: 'absolute', top: 50, right: 0 }}
      />
      <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
          <FontAwesome name='angle-double-left' size={48} color='black' />
        </TouchableOpacity>
        <Text
            style={{ color: 'black', width: 130, height: 110, position: 'absolute', top: 8, left: 135, fontSize: 28, fontWeight: 'bold'}}>Relatório
        </Text>
        <Text style={{ color: 'white', width: 380, height: 1100, position: 'absolute', top: 64, left: 15, fontSize: 20, fontWeight: 'bold'}}>Relatorio: {selectedReportText}.</Text>
      </View>
    </Modal>
    
  </KeyboardAvoidingView>)}

export default RelatorioPessoal;

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

  container: {
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
  },

  selectedReportText: {
    fontSize: 20, 
    color: 'white', 
  },
})