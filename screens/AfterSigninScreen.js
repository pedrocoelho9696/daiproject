import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'


const AfterSigninScreen = () => {
  const navigation = useNavigation()


  return (
    <KeyboardAvoidingView style={styles.container} behavior='height'>
      <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Conta registada com sucesso!
O acesso à aplicação vai ser garantido após uma análise do registo.</Text>
        <Text style={styles.headerText}>Quando o acesso for concedido irá ser notificado por email.</Text>
        <Image source={require('../assets/VitoriaGuimaraes.png')} style={styles.headerImage} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default AfterSigninScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
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
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})