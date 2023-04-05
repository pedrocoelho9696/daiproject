import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { getAuth, signOut } from 'firebase/auth'

const HomeScreen = () => {
const navigation = useNavigation()

  const handleSignOut = () => {
      auth.
      signOut().then(()=> {
      navigation.replace("Login")
    })
    .catch(error => alert(error.message))

  }

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
     
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
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
})