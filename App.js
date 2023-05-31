import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calendar from './screens/CalendarScreen';
import LoginScreen from './screens/LoginScreen';
import SigninScreen from './screens/SigninScreen';
import QuizzScreen from './screens/QuizzScreen';
import MenuAtleta from './screens/MenuAtleta';
import SigninFotoScreen from './screens/SigninFotoScreen';
import AfterSigninScreen from './screens/AfterSigninScreen';
import DadoAdicionaisScreen from './screens/DadoAdicionaisScreen';
import Admin from './screens/Admin';
import GerirContas from './screens/GerirContas';
import GerirEscaloes from './screens/GerirEscaloes'
import MenuTreinador from './screens/MenuTreinador';
import EditarTreinador from './screens/EditarTreinador';
import PerfilTreinador from './screens/PerfilTreinador';
import PerfilJogador from './screens/PerfilJogador';
import CriarRelatorio from './screens/CriarRelatorioScreen';
import RelatorioPessoal from './screens/RelatorioPessoalScreen';
import AtletaRelatorio from './screens/AtletaRelatorio'
import { useState, useEffect } from 'react';
import { auth } from 'firebase/auth';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false}} name="Signin" component={SigninScreen} />
        <Stack.Screen options={{ headerShown: false }} name="MenuAtleta" component={MenuAtleta} />
        <Stack.Screen options={{ headerShown: false }} name="MenuTreinador" component={MenuTreinador} />
        <Stack.Screen options={{ headerShown: false }} name="PerfilTreinador" component={PerfilTreinador} />
        <Stack.Screen options={{ headerShown: false }} name="EditarTreinador" component={EditarTreinador} />
        <Stack.Screen options={{ headerShown: false }} name="PerfilJogador" component={PerfilJogador} />
        <Stack.Screen options={{ headerShown: false }} name="SigninFotoScreen" component={SigninFotoScreen} />
        <Stack.Screen options={{ headerShown: false }} name="AfterSigninScreen" component={AfterSigninScreen} />
        <Stack.Screen options={{ headerShown: false }} name="DadoAdicionaisScreen" component={DadoAdicionaisScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Admin" component={Admin} />
        <Stack.Screen options={{ headerShown: false }} name="GerirContas" component={GerirContas} />
        <Stack.Screen options={{ headerShown: false }} name="GerirEscaloes" component={GerirEscaloes} />
        <Stack.Screen  name="CriarRelatorio" component={CriarRelatorio} />
        <Stack.Screen options={{ headerShown: false }} name="RelatorioPessoal" component={RelatorioPessoal} />
        <Stack.Screen options={{ headerShown: false }} name="AtletaRelatorio" component={AtletaRelatorio} />
        

        <Stack.Screen name="Calendario" component={Calendar} />
        <Stack.Screen name="Quizz" component={QuizzScreen} />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
