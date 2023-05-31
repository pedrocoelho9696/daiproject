import { useNavigation } from '@react-navigation/core'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { auth } from '../firebase'

const Admin = () => {
  const [escalao, setEscalao] = useState('')

  const navigation = useNavigation()

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='height'
    >
      <TouchableOpacity
          onPress={() => navigation.navigate('GerirContas')}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Gerir Contas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('GerirEscaloes')}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Gerir Escalões</Text>
        </TouchableOpacity>

      <View style={styles.buttonContainer}>
      
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Admin

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