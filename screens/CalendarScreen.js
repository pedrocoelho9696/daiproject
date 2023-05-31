import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { getAuth, signOut } from 'firebase/auth'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Modal, TextInput, Button, Image} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, getDocs } from 'firebase/firestore';




moment.locale('pt-br');

LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt';



const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventPlace, setEventPlace] = useState('');
  const [eventList, setEventList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isCreating, setIsCreating] = useState(true);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const showStartTimePicker = () => setStartTimePickerVisibility(true);
    
  const hideStartTimePicker = () => setStartTimePickerVisibility(false);
  
  const handleStartTimeConfirm = (date) => {
    const selectedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSelectedStartTime(selectedTime);
    setSelectedStartDate(selectedTime);
    hideStartTimePicker();
    setSelectedEndDate(selectedTime);
  };

  const showEndTimePicker = () =>setEndTimePickerVisibility(true);
   

  const hideEndTimePicker = () =>  setEndTimePickerVisibility(false);
  

  const handleEndTimeConfirm = (date) => {
    const selectedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSelectedEndTime(selectedTime)
    setSelectedEndDate(selectedEndTime);
    hideEndTimePicker();
  };
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setIsCreating(true);
    setModalVisible(true);
    setEventName('');
    setEventPlace('');
  };

  const onButtonPress = () => {
  setIsCreating(true);
  setModalVisible(true);
  setEventName('');
  setEventPlace('');
  setSelectedStartDate('');
  setSelectedEndDate('');
  setSelectedStartTime('');
  setSelectedDate('');
  setSelectedStartTime('');
};
  
const onSaveEvent = () => {
    
  const newEvent = {
    date: selectedDate,
    eventName: eventName,
    eventPlace: eventPlace,
    startTime: selectedStartTime,
    endTime: selectedEndTime,
  };

  try {
    
    const docRef =  addDoc(collection(db, 'eventos'), newEvent);
    console.log('Evento adicionado com ID: ', docRef.id);

    

  } catch (error) {
    console.error('Erro a adicionar evento: ', error);
  }


  setEventList([...eventList, newEvent]);
  setEventName('');
  setEventPlace('');
  setSelectedStartTime('');
  setSelectedDate('');
  setSelectedEndDate('');
  setSelectedStartDate('');
  setModalVisible(false);
  setEditingEvent(null); 

};
const onEditEvent = () => {
  const updatedEventList = eventList.map((event) => {
    if (event === editingEvent) {
      return {
        ...event,
        name: eventName,
        place: eventPlace,
      };
    }
    return event;
  });
  setEventList(updatedEventList);
  setEventName('');
  setEventPlace('');
  setEditingEvent(null);
  setEditModalVisible(false);
};
const onEventPress = (event) => {
  setSelectedDate(event.date);
  setSelectedStartTime(event.time);
  
  setEventName(event.name);
  setEventPlace(event.place);
  setEditingEvent(event);
  setIsCreating(false);
  setEditModalVisible(true);
};

  // buscar calendarios na base de dados
 const markedDates = eventList.reduce((obj, event) => {
    obj[event.date] = { marked: true };
    return obj;
  }, {});
  const [markedDates2, setMarkedDates2] = useState({});
  
 /* const fetchEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'eventos'));
    const updatedMarkedDates = { ...markedDates };

    querySnapshot.forEach((doc) => {
      const event = doc.data();
      const eventDate = new Date(event.date);

      // Check if eventDate is a valid date
      if (!isNaN(eventDate.getTime())) {
        // Convert eventDate to a string in the format 'YYYY-MM-DD'
        const formattedDate = eventDate.toISOString().split('T')[0];

        // Add the event to the markedDates object if it doesn't exist already
        if (!updatedMarkedDates[formattedDate]) {
          updatedMarkedDates[formattedDate] = { marked: true };
        }
      } else {
        console.error('Invalid date for event:', event);
      }
    });

    // Update the markedDates object
    setMarkedDates(updatedMarkedDates);
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

useEffect(() => {
  fetchEvents();
}, []); */

  
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    const source = {uri: result.uri};
    console.log(source);
    setImage(source);
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri)
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
    var ref = firebase.storage().ref().child(filename).put(blob);

    try {
      await ref;
    } catch (e) {
      console.log(e);
    }
    setUploading(false);
    Alert.alert(
      'Foto carregada..!!'
    );
    setImage(null);
  }; 

  return (
    <View style={styles.container}>
      {modalVisible ? (
        <View style={styles.modalContainer}>
          {editingEvent ? (
            <>
                <TextInput
                  placeholder=" Novo Nome"
                  style={styles.input}
                  value={eventName}
                  onChangeText={setEventName}
                />
                <View style={styles.separator} />
                <View style={styles.inputContainer}>
                  <Image
                  source={require('../assets/17736.png')}
                  style={styles.leftIcon}
                  />
                    <TextInput
                    placeholder="Novo Local"
                    style= {styles.input}
                    value={eventPlace}
                    onChangeText={setEventPlace}
                    />
                </View>
                <>
          <TouchableOpacity onPress={showStartTimePicker}>
            <Text style={styles.dateText}>
              {selectedStartDate ? selectedStartDate.toLocaleString() : 'Início'}
             </Text>
          </TouchableOpacity>
            <DateTimePickerModal
             isVisible={isStartTimePickerVisible}
             mode="time"
             onConfirm={handleStartTimeConfirm}
             onCancel={hideStartTimePicker}
             format="HH:mm"
      />

          <TouchableOpacity onPress={showEndTimePicker}>
            <Text style={styles.dateText}>
            {selectedEndDate ? selectedEndDate.toLocaleString() : 'Fim'}
            </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndTimePickerVisible}
              mode="time"
              onConfirm={handleEndTimeConfirm}
              onCancel={hideEndTimePicker}
            />
         </>
                <View style = {styles.inputContainer}>
              <Image
              source={require('../assets/cam.png')}
            style={styles.leftIcon}
            />
            </View>
                <SafeAreaView>
        <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
          <Text style={styles.buttonText}>
            Pick Video
          </Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {image && <Image source={{uri: image.uri}} style={{ width:250, height:250}} />}
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>
              Upload Video
            </Text>
          </TouchableOpacity>
        </View>
   </SafeAreaView>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]}
                onPress={() => setEditingEvent(null)}
                >
                <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={onEditEvent}  >
                    <Text style={styles.buttonText}>Guardar</Text>
                  </TouchableOpacity>
              </View>
            </>
            ) : (
            <>
              <TextInput
                placeholder="Título"
                style={styles.input}
                value={eventName}
                onChangeText={setEventName}
              />
              <View style={styles.separator} />
            <>
          <TouchableOpacity onPress={showStartTimePicker}>
            <Text style={styles.dateText}>
              {selectedStartDate ? selectedStartDate.toLocaleString() : 'Início'}
             </Text>
          </TouchableOpacity>
            <DateTimePickerModal
             isVisible={isStartTimePickerVisible}
             mode="time"
             onConfirm={handleStartTimeConfirm}
             onCancel={hideStartTimePicker}
             format="HH:mm"
      />

          <TouchableOpacity onPress={showEndTimePicker}>
            <Text style={styles.dateText}>
            {selectedEndDate ? selectedEndDate.toLocaleString() : 'Fim'}
            </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndTimePickerVisible}
              mode="time"
              onConfirm={handleEndTimeConfirm}
              onCancel={hideEndTimePicker}
            />
         </>
            <View style={styles.inputContainer}>
              <Image
              source={require('../assets/17736.png')}
            style={styles.leftIcon}
            />
              <TextInput
                placeholder="Local"
                style= {styles.input}
                value={eventPlace}
                onChangeText={setEventPlace}
            />
            </View>
            <View>
              <Image
              source={require('../assets/cam.png')}
            style={styles.leftIcon}
            />
            </View>


            <View style={styles.buttonContainer}>
            <TouchableOpacity
           style={[styles.button, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
              >
             <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={onSaveEvent}>
          <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          </View>
              {eventList.map((event, index) => {
                if (event.date === selectedDate) {
                  return (
                    <View key={index} style={styles.eventContainer}>
                      <Text style={styles.eventText}>{event.eventName}{}</Text>
                      <Button
                        title="Editar"
                        onPress={() => onEventPress(event)}
                        color="black"
                      />
                    </View>
                  );
                }
              })}
            </>
          )}
        </View>
      ) : (
        <View style={styles.calendarContainer}>
        <Calendar markedDates={markedDates} onDayPress={onDayPress} />
        {!modalVisible && (
          <TouchableOpacity onPress={() => onButtonPress} style={[styles.buttonEvent, styles.eventButton]}>
            <Text style={styles.buttonTextEvent}>+</Text>
          </TouchableOpacity>
        )}
        <View style={styles.separatorCalendar} />
      </View>
    )}
    {!modalVisible && (
      <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.buttonEvent, styles.bottomButton]}>
        <Text style={styles.buttonTextEvent}>+</Text>
      </TouchableOpacity>
    )}
  </View>
);
};

export default CalendarScreen;

/* 
            <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
          <Text style={styles.buttonText}>
            Pick Video
          </Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {image && <Image source={{uri: image.uri}} style={{ width:300, height:300}} />}
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>
              Upload Video
            </Text>
          </TouchableOpacity>
        </View>
   </SafeAreaView>
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  calendarContainer: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: '115%',
  },
  buttonContainer2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    alignItems: 'center',
    borderRadius: 0,
    height: 50,
    justifyContent: 'center',
    width: '50%',
  },
  cancelButton: {
    backgroundColor: 'black',
  },
  saveButton: {
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 10,
  },
  leftIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  dateText: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    fontSize: 18,
  },
  buttonEvent: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  eventButton: {
    backgroundColor: 'white',
  },
  buttonTextEvent: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  separatorCalendar: {
    borderBottomWidth: 2.5,
    borderBottomColor: 'orange',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'black',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // pedro
  selectButton: {
    borderRadius:5,
    width:150,
    height:50,
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
    marginLeft: 100
  },

  uploadButton: {
    borderRadius:5,
    width:150,
    height:50,
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center', 
    
  },

  imageContainer: {
    marginTop:30,
    marginBottom:50,
    alignItems:'center'
  }
});