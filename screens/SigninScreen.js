import { useNavigation } from '@react-navigation/core'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState, useSelector } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, Modal, TouchableOpacity, View } from 'react-native'
import { auth, usersRef } from '../firebase'
import {addDoc } from "firebase/firestore"
import { db } from "firebase/firestore"
import { useRoute } from '@react-navigation/native';


const SigninScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [dia, setDia] = useState(0);
  const [mes, setMes] = useState(0);
  const [ano, setAno] = useState(0);
  const [altura, setAltura] = useState(0);
  const [peso, setPeso] = useState(0);
  const [esc, setEsc] = useState(0);
  const [pos, setPos] = useState(0);
  const [val, setVal] = useState(0);
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation()
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionPress = (option) => {
    setRole(option);
    setPos(option);
  }

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

 /* useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if (user) {
        if (role === "Equipa Técnica"){
          navigation.replace("MenuTreinador");
        }
        else{
          navigation.replace("MenuAtleta");
        }
       
      }
    })
    return unsubscribe
  }, []) */ 

  const menutreinador = () => {
    navigation.replace("MenuTreinador");
  }

  const menuatleta = () => {
    navigation.replace("MenuAtleta");
  }

  const handleSignUpA = async () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        const doc = addDoc(usersRef, {
          name,
          password,
          email,
          role: "Atleta",
          dia,
          mes,
          ano,
          altura,
          peso,
          esc,
          pos,
          val,
          //photoURL: require('../assets/Pessoa.png'),
          userId: user.uid,
        });
      } else {
        throw new Error('User not found');
      }
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
    setName('');
    setPassword('');
    setRole('');
    setEmail('');
    setVal('');
    setDia('');
    setMes('');
    setAno('');
    setAltura('');
    setPeso('');
    setPos('');
    setEsc('');
  }
  
  const handleSignUpE = async () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        const doc = addDoc(usersRef, {
          name,
          password,
          email,
          role,
          val,
          //photoURL: require('../assets/Pessoa.png'),
          userId: user.uid,
        });
      } else {
        throw new Error('User not found');
      }
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
    setName('');
    setPassword('');
    setRole('');
    setEmail('');
    setVal('');
  }
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior= 'height'
    >

<View style={styles.headerContainer}>

<Text style={styles.headerText}>SI-VOLEI VSC</Text>


<View style={styles.secondContainer}>

<Text style={styles.secondText}>Registo do Atleta</Text>

</View>

    
  </View>
      
      <View style={styles.inputContainer}>
      <TextInput
          placeholder="Nome"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Palavra-Passe"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <Text style={styles.input}>Papel </Text>
      <TouchableOpacity 
        onPress={() => handleOptionPress('Atleta')}
        style={{ 
          backgroundColor: role === 'Atleta' ? '#1abc9c' : '#ecf0f1',
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: role === 'Atleta' ? '#fff' : '#2c3e50' }}>Atleta</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => handleOptionPress('Equipa Técnica')}
        style={{ 
          backgroundColor: role === 'Equipa Técnica' ? '#1abc9c' : '#ecf0f1',
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: role === 'Equipa Técnica' ? '#fff' : '#2c3e50' }}>Equipa Técnica</Text>
        
      </TouchableOpacity>
      

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity

         onPress={() => {
          if (role === 'Atleta') {
              openModal();
            } else {
              handleSignUpE();
              navigation.navigate('SigninFotoScreen');
            }
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <KeyboardAvoidingView
      style={styles.container}
      behavior= 'height'
    >

<View style={styles.headerContainer}>
        <Text style={styles.headerText}>SI-VOLEI VSC</Text>

        <View style={styles.secondContainer}>

<Text style={styles.secondText}>Registo do Atleta</Text>

</View>
        
      </View>


      <View style={styles.inputContainer}>
  <View style={styles.dateContainer}>
    <TextInput
      placeholder="Dia de nascimento"
      value={dia}
      onChangeText={text => setDia(text)}
      style={styles.dateInput}
    />
    <TextInput
      placeholder="Mês de nascimento"
      value={mes}
      onChangeText={text => setMes(text)}
      style={styles.dateInput}
    />
    <TextInput
      placeholder="Ano de nascimento"
      value={ano}
      onChangeText={text => setAno(text)}
      style={styles.dateInput}
    />
  </View>
  <TextInput
    placeholder="Altura"
    value={altura}
    onChangeText={text => setAltura(text)}
    style={styles.input}
  />
  <TextInput
    placeholder="Peso"
    value={peso}
    onChangeText={text => setPeso(text)}
    style={styles.input}
  />

  <View style={styles.row}>

  <Text style={styles.input}>Posição </Text>
    <TextInput
      placeholder="Escalão"
      value={esc}
      onChangeText={text => setEsc(text)}
      style={[styles.input, {width: '45%'}]}
    />
  
    </View>
      <TouchableOpacity 
        onPress={() => handleOptionPress('Levantador')}
        style={{ 
          backgroundColor: pos === 'Levantador' ? '#1abc9c' : '#ecf0f1',
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: pos === 'Levantador' ? '#fff' : '#2c3e50' }}>Levantador</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => handleOptionPress('Líbero')}
        style={{ 
          backgroundColor: pos === 'Líbero' ? '#1abc9c' : '#ecf0f1',
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: pos === 'Líbero' ? '#fff' : '#2c3e50' }}>Líbero</Text>
        
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => handleOptionPress('Central')}
        style={{ 
          backgroundColor: pos === 'Central' ? '#1abc9c' : '#ecf0f1',
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: pos === 'Central' ? '#fff' : '#2c3e50' }}>Central</Text>
        
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => handleOptionPress('Oposto')}
        style={{ 
          backgroundColor: pos === 'Oposto' ? '#1abc9c' : '#ecf0f1',
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: pos === 'Oposto' ? '#fff' : '#2c3e50' }}>Oposto</Text>
        
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => handleOptionPress('Ponta esquerda')}
        style={{ 
          backgroundColor: pos === 'Ponta esquerda' ? '#1abc9c' : '#ecf0f1',
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: pos === 'Ponta esquerda' ? '#fff' : '#2c3e50' }}>Ponta esquerda</Text>
        
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => handleOptionPress('Ponta direita')}
        style={{ 
          backgroundColor: pos === 'Ponta direita' ? '#1abc9c' : '#ecf0f1',
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: pos === 'Ponta direita' ? '#fff' : '#2c3e50' }}>Ponta direita</Text>
        
      </TouchableOpacity>
  
</View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            handleSignUpA();
            onPress={closeModal}
            navigation.navigate('SigninFotoScreen');
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={closeModal}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default SigninScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
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
  headerText: {
    color: '#FFD700',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center',
  },
  secondText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center',
  },
  button: {
    backgroundColor: '#FFD700',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center',
    marginTop:10,
  },
  inputContainer: {
    width: '80%'
  },
  secondText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign:'center',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: '30%',
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
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: '100%',
  },
  button: {
    backgroundColor: '#FFD700',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 16,
  },
})