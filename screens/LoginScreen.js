import { useNavigation } from '@react-navigation/core'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { auth, db } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, query, getDocs, onSnapshot, where} from 'firebase/firestore';


const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [user, setUser] = useState('');

  const navigation = useNavigation()


  const fetchRole = async (email) => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        setRole(userData.role);
      }
    } catch (error) {
      console.log('Error retrieving user:', error);
    }
  };
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchRole(user.email);
      } else {
        // Handle the case when the user is not logged in
      }
    });
    return unsubscribe;
  }, []);
  
  useEffect(() => {
    if (role === 'Equipa Técnica') {
      navigation.replace('MenuTreinador');
    } else if (role === 'Jogadora') {
      navigation.replace('MenuAtleta');
    }
  }, [role]);


  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged with: ', user.email);
    })
    .catch(error => alert(error.message))
}

  return (
      <KeyboardAvoidingView style={styles.container} behavior='height'>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
          <Image source={require('../assets/Logo.png')} style={styles.secondImage} />
            <Text style={styles.headerText}>SI-VOLEI VSC</Text>
    
          </View>
    
          <View style={styles.secondContainer}>
            <Text style={styles.secondText}>SUPORTE À GESTÃO DAS ATIVIDADES DESPORTIVAS NA CATEGORIA DE VOLEIBOL</Text>
          </View>
    
          <Image source={require('../assets/VitoriaGuimaraes.png')} style={styles.headerImage} />
        </View>
    

      <View style={styles.inputContainer}>
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
      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity
       onPress={handleLogin}
  style={styles.button}
>

          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signin')}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Criar conta</Text>
        </TouchableOpacity>
    
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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
  secondImage: {
    width: 75,
    height: 75,
    marginRight: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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