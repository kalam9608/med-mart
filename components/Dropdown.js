import React, { useState } from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import colors from "../configs/colors";

const MyComponent = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const items = [
    { label: 'Item 1', value: 'item1' },
    { label: 'Item 2', value: 'item2' },
    { label: 'Item 3', value: 'item3' }
  ];

  const handleSelect = (itemValue) => {
    setSelectedValue(itemValue);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.selectedValue}>{selectedValue || 'Select an item'}</Text>
        </View>
      </TouchableWithoutFeedback>
      
      <Modal visible={modalVisible} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        
        <View style={styles.modalContent}>
          {items.map((item) => (
            <TouchableWithoutFeedback
              key={item.value}
              onPress={() => handleSelect(item.value)}
            >
              <View style={styles.item}>
                <Text>{item.label}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedValue: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default MyComponent;
