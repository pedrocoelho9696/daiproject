import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageToFirebase } from '../firebase'; // Assuming you have a function to upload the image to Firebase.



const SigninFotoScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation()

  const handleImageSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      // Handle permission denied case
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };
  
  {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedImage} />}

  return (
    
    <KeyboardAvoidingView
    style={styles.container}
    behavior='height'
  >
   
    <View style={styles.buttonContainer}>
    <TouchableOpacity
  style={styles.uplbutton}
  onPress={handleImageSelection}
>
  <Text style={styles.buttonText}>Carregar Foto</Text>
</TouchableOpacity>


      <TouchableOpacity
       onPress={() => navigation.navigate('MenuAtleta')}
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
  </KeyboardAvoidingView>

) 
}

export default SigninFotoScreen

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
    selectedImage: {
      width: 250,
      height: 250,
      marginTop: 20,
    },    
    headerText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign:'center',
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
    uplbutton: {
      height: 125,
      width: 125,
      borderRadius: 125 / 2,
      justifyContent: 'center',
      alignItems: 'center',
     borderStyle: 'dashed',
     borderWidth: 1,
     overflow: 'hidden',
     marginBottom:100,
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
    buttonOutlineText: {
      color: '#FFD700',
      fontWeight: '700',
      fontSize: 16,
    },
  }
)
