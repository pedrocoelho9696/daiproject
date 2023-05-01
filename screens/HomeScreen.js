import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { getAuth, signOut } from 'firebase/auth'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Modal, TextInput, Button, Image} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";


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
  const [selectedTime, setSelectedTime] = useState('');
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
    setSelectedStartDate(date);
    hideStartTimePicker();
    setSelectedEndDate(date);
  };

  const showEndTimePicker = () =>setEndTimePickerVisibility(true);
   

  const hideEndTimePicker = () =>  setEndTimePickerVisibility(false);
  

  const handleEndTimeConfirm = (date) => {
    setSelectedEndDate(date);
    hideEndTimePicker();
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setIsCreating(true);
    setModalVisible(true);
    setEventName('');
    setEventPlace('');
    
  };

  const onSaveEvent = () => {
    const newEvent = {
      date: selectedDate,
      name: eventName,
      place: eventPlace,
    };
    setEventList([...eventList, newEvent]);
    setEventName('');
    setEventPlace('');
    setSelectedTime('');
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

  /*const onDeleteEvent = () => {
    const updatedEventList = eventList.filter((event) => event !== editingEvent);
    setEventList(updatedEventList);
    setEditingEvent(null);
    setEditModalVisible(false);
  }; */

  const onEventPress = (event) => {
    setSelectedDate(event.date);
    setSelectedTime(event.time);
    setEventName(event.name);
    setEventPlace(event.place);
    setEditingEvent(event);
    setIsCreating(false);
    setEditModalVisible(true);
  };

  const markedDates = eventList.reduce((obj, event) => {
    obj[event.date] = { marked: true };
    return obj;
  }, {});

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
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
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
             mode="datetime"
             onConfirm={handleStartTimeConfirm}
             onCancel={hideStartTimePicker}
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
            <TouchableOpacity style={[styles.button, styles.canc]} onPress={onSaveEvent}>
          <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          </View>
              {eventList.map((event, index) => {
                if (event.date === selectedDate) {
                  return (
                    <View key={index} style={styles.eventContainer}>
                      <Text style={styles.eventText}>{event.name}{}</Text>
                      <Button
                        title="Editar"
                        onPress={() => onEventPress(event)}
                        color="#337ab7"
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
          <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.buttonEvent, styles.eventButton]}>
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
});