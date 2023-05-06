import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const QuizzScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(new Array(6).fill(false));
  const [selectedWaterOption, setSelectedWaterOption] = useState(null); // New state variable for second question
  
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

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
          setShowModal(true);
        }}
      >
        <Text style={styles.quizzText}>Semana {i + 1}</Text>
        <Text style={styles.quizzSecondText}>0% concluido</Text>
      </TouchableOpacity>
    );
  }
  // Options for the question
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

  const waterOptionButtons = waterOptions.map((option, index) => (
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
  ));

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{currentMonth}</Text>
      {quizzButtons}
      <Modal
        visible={showModal}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
        <Text style={styles.modalText}>1. Que refeições, habitualmente foram feitas por dia?</Text>
        {optionButtons}
        <Text style={styles.modalText}>2. Que refeições, habitualmente foram feitas por dia?</Text>
        {waterOptionButtons}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setShowModal(false)}
        >
          <Text style={styles.closeButtonText}>Fechar</Text>
        </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default QuizzScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 20,
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
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
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