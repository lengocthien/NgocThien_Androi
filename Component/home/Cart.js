<<<<<<< HEAD

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
=======
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

>>>>>>> 588824857e84aea27a7c4e3b57e78d393c96fb79
  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    try {
      const existingCartItems = await AsyncStorage.getItem('cartItems');

      if (existingCartItems) {
        const parsedCartItems = JSON.parse(existingCartItems);
        setCartItems(parsedCartItems);
      }
    } catch (error) {
      console.log('Error retrieving cart items:', error);
    }
  };

  const removeCartItem = async (itemId) => {
    try {
<<<<<<< HEAD
      const existingCartItems = await AsyncStorage.getItem('cartItems');

      if (existingCartItems) {
        const parsedCartItems = JSON.parse(existingCartItems);

        const updatedCartItems = parsedCartItems.filter(item => item.id !== itemId);

        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

=======
      // Lấy danh sách sản phẩm từ AsyncStorage
      const existingCartItems = await AsyncStorage.getItem('cartItems');

      if (existingCartItems) {
        // Chuyển danh sách sản phẩm thành mảng
        const parsedCartItems = JSON.parse(existingCartItems);

        // Lọc ra sản phẩm cần xóa dựa trên itemId
        const updatedCartItems = parsedCartItems.filter(item => item.id !== itemId);

        // Cập nhật danh sách sản phẩm mới vào AsyncStorage
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        // Cập nhật danh sách sản phẩm trong state
>>>>>>> 588824857e84aea27a7c4e3b57e78d393c96fb79
        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.log('Error removing cart item:', error);
    }
  };

  const renderCartItem = ({ item }) => {
    return (
      <View style={styles.cartItem}>
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        <Text style={styles.productName}>{item.title}</Text>
<<<<<<< HEAD
        <Text style={styles.productPrice}>{item.price}$</Text>
=======
        <Text style={styles.productPrice}>{item.price}</Text>
>>>>>>> 588824857e84aea27a7c4e3b57e78d393c96fb79
        <TouchableOpacity onPress={() => removeCartItem(item.id)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
<<<<<<< HEAD
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
        />
        
        
      ) : (
        <Text style={styles.emptyText}>Giỏ hàng trống</Text>
        
      )}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Payment')}>
        <Text style={styles.buttonText}>Thanh Toán</Text>
      </TouchableOpacity>
=======
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
      />
>>>>>>> 588824857e84aea27a7c4e3b57e78d393c96fb79
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
<<<<<<< HEAD
  emptyText: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 20,
  },
=======
>>>>>>> 588824857e84aea27a7c4e3b57e78d393c96fb79
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  removeButton: {
    backgroundColor: '#ff0000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
  },
<<<<<<< HEAD
  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
=======
>>>>>>> 588824857e84aea27a7c4e3b57e78d393c96fb79
});

export default Cart;