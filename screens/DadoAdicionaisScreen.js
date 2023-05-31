import { useNavigation } from '@react-navigation/core'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState, useSelector } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, usersRef } from '../firebase'
import {addDoc } from "firebase/firestore"


const DadoAdicionaisScreen = () => {
  const [dia, setDia] = useState('')
  const [mes, setMes] = useState('')
  const [ano, setAno] = useState('')
  const [altura, setAltura] = useState('')
  const [peso, setPeso] = useState('')
  const [esc, setEsc] = useState('')
  const [pos, setPos] = useState('')
  const navigation = useNavigation()

  const handleOptionPress = (option) => {
    setRole(option);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if (user) {
        navigation.replace("Home")
      }
    })
    return unsubscribe
  }, [])


  const handleSignUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        const doc = addDoc(usersRef, {
          dia,
          mes,
          ano,
          altura,
          peso,
          esc,
          pos,
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
  };

  

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
    <TextInput
      placeholder="Escalão"
      value={esc}
      onChangeText={text => setEsc(text)}
      style={[styles.input, {width: '45%'}]}
    />
    <TextInput
      placeholder="Posição"
      value={pos}
      onChangeText={text => setPos(text)}
      style={[styles.input, {width: '45%'}]}
    />
  </View>
</View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SigninFoto')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signin')}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default DadoAdicionaisScreen

const styles = StyleSheet.create({
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
  },
  inputContainer: {
    width: '80%'
  },
  secondText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
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
    marginTop: 40,
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