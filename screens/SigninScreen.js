import { useNavigation } from '@react-navigation/core'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState, useSelector } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, usersRef } from '../firebase'
import {addDoc } from "firebase/firestore"


const SigninScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
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
          name,
          password,
          email,
          role,
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
      <View style={styles.inputContainer}>
      <TextInput
          placeholder="Name"
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
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <Text style={styles.input}>Role </Text>
      <TouchableOpacity 
        onPress={() => handleOptionPress('Jogadora')}
        style={{ 
          backgroundColor: role === 'Jogadora' ? '#1abc9c' : '#ecf0f1',
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: role === 'Jogadora' ? '#fff' : '#2c3e50' }}>Jogadora</Text>
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
          onPress={handleSignUp}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Go back</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

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
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})