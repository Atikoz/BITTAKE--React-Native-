import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';



const LoadingModal = ({ visible }) => {
  
  const translation = useTranslation().t;

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => { }}>
      <View style={style.modalContainer}>
        <View style={style.modalContent}>

          <View style={style.textContainer}>
            <Text style={{ fontWeight: '700', fontSize: '16' }}>{translation('transferCoin')}</Text>
          </View>

          <ActivityIndicator size="large" color="#58FFAF" />
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: 120,
    width: '75%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  textContainer: {
  height: '55%',
  width: '100%',
  alignItems: 'center',
}
});

export default LoadingModal;