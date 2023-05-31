import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, KeyboardAvoidingView } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, getDocs } from 'firebase/firestore';

const QuizzScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(new Array(6).fill(false));
  const [selectedWaterOption, setSelectedWaterOption] = useState(null); // New state variable for second question
  const [selectedSleepOption, setSelectedSleepOption] = useState(null);
  const [selectedGameOption, setSelectedGameOption] = useState(null);
  const [selectedEnergyOption, setSelectedEnergyOption] = useState(null);
  const [selectedTimeOption, setSelectedTimeOption] = useState(null);
  const [selectedPersonalOption, setSelectedPersonalOption] = useState(null);
  const [Notas, setNotas] = useState("");
  
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

  const handleNextButton = () => {
    setShowModal(false);
    setShowSecondModal(true);
  };
  const handleBackButton = () => {
    setShowModal(true);
    setShowSecondModal(false);
  };

  const weeksInMonth = Math.ceil((new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() + new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()) / 7);
  
  const quizzButtons = [];
  for (let i = 0; i < weeksInMonth; i++) {
    quizzButtons.push(
      <TouchableOpacity
        key={i}
        style={[
          styles.quizzButton,
          i === weeksInMonth - 1 && styles.lastQuizzButton 
        ]}
        onPress={() => {
          setSelectedWeek(i + 1);
          setSelectedOptions(new Array(6).fill(false));
          setSelectedWaterOption(null);
          setSelectedSleepOption(null);
          setSelectedGameOption(null);
          setSelectedEnergyOption(null);
          setSelectedTimeOption(null);
          setSelectedPersonalOption(null);
          setNotas('')
          setShowModal(true);
        }}
      >
        <Text style={styles.quizzText}>Semana {i + 1}</Text>
        <Text style={styles.quizzSecondText}>0% concluido</Text>
      </TouchableOpacity>
    );
  }
  const options = [
    'Pequeno almoço',
    'Lanche de manhã',
    'Almoço',
    'Lanche da tarde',
    'Jantar',
    'Ceia'
  ];

  const waterOptions = [
    0.5,
    1,
    2,
    3,
    4
  ];

  const sleepOptions =[
    'Menos de 4',
    '4-6',
    '6-8',
    '8-10',
    '10'
  ];

  const gameOptions =[
    '1',
    '2',
    '3',
    '4',
    '5'
  ];
  
  const energyOptions=[
    '1',
    '2',
    '3',
    '4',
    '5'
  ];

  const timeOptions=[
    '1',
    '2',
    '3',
    '4',
    '5'
  ];
  
  const personalOptions=[
    '1',
    '2',
    '3',
    '4',
    '5'
  ];

  // Render the options as touchable opacity components
  const optionButtons = options.map((option, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.optionButton,
        selectedOptions[index] && styles.selectedOption // Add custom style to the selected option
      ]}
      onPress={() => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = !selectedOptions[index];
        setSelectedOptions(newSelectedOptions);
      }}
    >
      <View style={styles.optionButtonCircle}>
        {selectedOptions[index] && <View style={styles.optionButtonSelectedCircle} />}
      </View>
      <Text style={styles.optionButtonText}>{option}</Text>
    </TouchableOpacity>
  ));

  const waterOptionButtons = (
    <View style={styles.optionsContainer}>
      {waterOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedWaterOption === option && styles.selectedOption // Add custom style to the selected option
          ]}
          onPress={() => {
            setSelectedWaterOption(option);
          }}
        >
          <View style={styles.optionButtonCircle}>
            {selectedWaterOption === option && <View style={styles.optionButtonSelectedCircle} />}
          </View>
          <Text style={styles.optionButtonText}>{option}L</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const sleepOptionButtons= (
    <View style={styles.optionsContainer}>
      {sleepOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedSleepOption === option && styles.selectedOption 
          ]}
          onPress={() => {
            setSelectedSleepOption(option);
          }}
        >
          <View style={styles.optionButtonCircle}>
            {selectedSleepOption === option && <View style={styles.optionButtonSelectedCircle} />}
          </View>
          <Text style={styles.optionButtonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const gameOptionButtons= (
    <View style={styles.optionsContainer}>
      {gameOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedGameOption === option && styles.selectedOption 
          ]}
          onPress={() => {
            setSelectedGameOption(option);
          }}
        >
          <View style={styles.optionButtonCircle}>
            {selectedGameOption === option && <View style={styles.optionButtonSelectedCircle} />}
          </View>
          <Text style={styles.optionButtonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  const energyOptionButtons= (
    <View style={styles.optionsContainer}>
      {energyOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedEnergyOption === option && styles.selectedOption // Add custom style to the selected option
          ]}
          onPress={() => {
            setSelectedEnergyOption(option);
          }}
        >
          <View style={styles.optionButtonCircle}>
            {selectedEnergyOption === option && <View style={styles.optionButtonSelectedCircle} />}
          </View>
          <Text style={styles.optionButtonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  
  const timeOptionButtons= (
    <View style={styles.optionsContainer}>
      {timeOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedTimeOption === option && styles.selectedOption // Add custom style to the selected option
          ]}
          onPress={() => {
            setSelectedTimeOption(option);
          }}
        >
          <View style={styles.optionButtonCircle}>
            {selectedTimeOption === option && <View style={styles.optionButtonSelectedCircle} />}
          </View>
          <Text style={styles.optionButtonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const personalOptionButtons= (
    <View style={styles.optionsContainer}>
      {personalOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedPersonalOption === option && styles.selectedOption // Add custom style to the selected option
          ]}
          onPress={() => {
            setSelectedPersonalOption(option);
          }}
        >
          <View style={styles.optionButtonCircle}>
            {selectedPersonalOption === option && <View style={styles.optionButtonSelectedCircle} />}
          </View>
          <Text style={styles.optionButtonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
      

  const onSaveRelatorio = async () => {
    const newRelatorio = {
      refeicoes: selectedOptions,
      agua: selectedWaterOption,
      horas_Sono: selectedSleepOption,
      prestacao: selectedGameOption,
      energia: selectedEnergyOption,
      qualidade_descanso: selectedTimeOption,
      nivel_pessoal: selectedPersonalOption,
      notas: Notas
    };
  
    try {
      
      const docRef = await addDoc(collection(db, 'relatorios'), newRelatorio);
      console.log('Relatorio adicionado com ID:', docRef.id);
  
      // Clear the input field
      setSelectedOptions(new Array(6).fill(false));
      setSelectedWaterOption(null);
      setSelectedSleepOption(null);
      setSelectedGameOption(null);
      setSelectedEnergyOption(null);
      setSelectedTimeOption(null);
      setSelectedPersonalOption(null);
      setNotas(''); 
      setShowSecondModal(false); 
       } catch (error) {
      
    }
  }; 


  return (
    <KeyboardAvoidingView style={styles.container2} behavior="position">
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{currentMonth}</Text>
      {quizzButtons}
      <Modal visible={showModal} animationType="slide">
        {/* First Modal Content */}
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>1. Que refeições, habitualmente foram feitas por dia?</Text>
          {optionButtons}
          <Text style={styles.modalText}>2. Que refeições, habitualmente foram feitas por dia?</Text>
          {waterOptionButtons}
          <Text style={styles.modalText}>3. Qual foi, em média, o número de horas de sono por noite?</Text>
          {sleepOptionButtons}
          <Text style={styles.modalText}>4. Como avalia, durante esta semana, o seu desempenho durante os treinos e jogos?</Text>
          {gameOptionButtons}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.closeButton, styles.button]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.closeButton, styles.button]}
              onPress={handleNextButton}
            >
              <Text style={styles.buttonText}>Seguinte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
 {/*SECOND MOLD A PARTIR DAQUI*/}
      <Modal visible={showSecondModal} animationType="slide">
        {/* Second Modal Content */}
        <View style={styles.modalContainer}>
        <Text style={styles.modalText}>5. Como avalia o seu nível dde energia durante os treinos e jogos?</Text>
          {energyOptionButtons}
          <Text style={styles.modalText}>6. Como avalia a quantiade do tempo de descanso entre momentos da prática desportiva</Text>
          {timeOptionButtons}
          <Text style={styles.modalText}>7. Como avalia o seu nível de pressão e ansiedade relacionados com o seu desempenho</Text>
          {personalOptionButtons}
          <Text style={styles.modalText}>8. Notas</Text>
          <View style={styles.inputContainer}>
        <TextInput
          value={Notas}
          onChangeText={text => setNotas(text)}
          style={styles.input}
        />
        </View>
          
          {/* Add your content here */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.closeButton, styles.button]}
              onPress={handleBackButton}
            >
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.closeButton, styles.button]}
              onPress={onSaveRelatorio}
            >
              <Text style={styles.buttonText}>Submeter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </KeyboardAvoidingView>
  );
};

export default QuizzScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    height: 200,
    width: '100%',
    
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow options to wrap to the next line if needed
    marginTop: 3 // Add margin to separate from the previous question
  },
  quizzButton: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'orange',
    paddingRight: '75%',
    backgroundColor: '#393939',
  },
  quizzText: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    borderRadius: 0,
    height: 50,
    justifyContent: 'center',
    width: '50%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quizzSecondText:{
    color:"white",
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#393939',
    
  },
  modalText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 3,
    color: 'white',
  },
  closeButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginRight: 10, // Add margin to create space between options
    minWidth: 80, // Set a minimum width for each option
  },
  selectedOption: {
    borderColor: 'orange',
  },
  optionButtonCircle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButtonSelectedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'white',
  },
  lastQuizzButton:{
    borderBottomColor:'white',  
  }

})