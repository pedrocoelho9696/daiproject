import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { KeyboardAvoidingView, Button,  StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'

const EscalaoScreen = () => {
 // const [escaloes, setEscaloes] = useState([]);
  const [nomeEscalao, setNomeEscalao] = useState('');
  const navigation = useNavigation()





  const handleAddEscalao = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (user) {
          const doc = await addDoc(usersRef, {
            nomeEscalao
          });
          navigation.navigate('DadoAdicionaisScreen', { userId: user.uid }); 
        } else {
          throw new Error('User not found');
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };
/*
  useEffect(() => {
    const unsubscribe = db.collection('escaloes').onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEscaloes(data);
    });

    return unsubscribe;
  }, []);

  const handleAddEscalao = () => {
    db.collection('escaloes')
      .add({
        nome: nomeEscalao,
      })
      .then(() => {
        setNomeEscalao('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteEscalao = (escalaoId) => {
    db.collection('escaloes')
      .doc(escalaoId)
      .delete()
      .catch((error) => {
        console.error(error);
      });
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>{item.nome}</Text>
      <TouchableOpacity onPress={() => handleDeleteEscalao(item.id)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
*/
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Adicionar Escalão</Text>
        <TextInput
          value={nomeEscalao}
          onChangeText={(text) => setNomeEscalao(text)}
          placeholder="Nome do Escalão"
          style={styles.input}
        />
        <TouchableOpacity
          onPress={handleAddEscalao}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Admin')}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  };
export default EscalaoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  headerContainer: {
    alignItems: 'center',
  },
  headerImage: {
    width: 150,
    height: 200,
    alignSelf: 'center'
  },
  headerText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center',
  },
  inputContainer: {
    width: '80%'
  },
  secondContainer: {
    width: '50%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#FFD700',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop:20,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  abuttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  secondText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center',
  },
  buttonOutlineText: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 16,
  },
})