import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Pay = ({navigation}) => {
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');


  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Dữ liệu trong AsyncStorage đã được xóa thành công');
    } catch (error) {
      console.error('Lỗi xóa dữ liệu trong AsyncStorage:', error);
    }
  };

  const handlePay = () =>{
    clearAsyncStorage();
     navigation.navigate('Home');

  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* <Image source={require('../../assets/us.jpg')} style={styles.logo} /> */}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tên khách hàng</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập họ tên"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />
      </View>


      
      <TouchableOpacity style={styles.button} onPress={handlePay}>
        <Text style={styles.buttonText}>Thanh toán</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  paymentOptions: {
    marginBottom: 20,
  },
  paymentLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
 
  button: {
    backgroundColor: '#ee4d2d',
    paddingVertical: 12,
    borderRadius: 5,
    // position: 'absolute',
    // bottom: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', 
  },
});

export default Pay;