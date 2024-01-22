import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    try {
      const existingCartItems = await AsyncStorage.getItem('cartItems');
  
      if (existingCartItems) {
        const parsedCartItems = JSON.parse(existingCartItems);
  
        const updatedCartItems = parsedCartItems.reduce((updatedItems, item) => {
          const existingItem = updatedItems.find(i => i.id === item.id);
          if (existingItem) {
            // Sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
            existingItem.quantity += 1;
          } else {
            // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới
            updatedItems.push({ ...item, quantity: 1 });
          }
          return updatedItems;
        }, []);
  
        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.log('Error retrieving cart items:', error);
    }
  };
  const removeCartItem = async (itemId) => {
    try {
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
  
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  
      setCartItems(updatedCartItems);
    } catch (error) {
      console.log('Error removing cart item:', error);
    }
  };
  
  
  const decreaseQuantity = (itemId) => {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
  
    if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity = updatedCartItems[itemIndex].quantity - 1;
      setCartItems(updatedCartItems);
    }
  };
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const renderCartItem = ({ item }) => {
    return (
      <View style={styles.cartItem}>
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.title}</Text>
          <Text style={styles.productPrice}>{item.price}$</Text>
        </View>
        <View style={styles.quantityContainer}>
          <Text >Số lượng</Text>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
            {/* <Text style={styles.quantityButtonText}>-</Text> */}
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
            {/* <Text style={styles.quantityButtonText}>+</Text> */}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => removeCartItem(item.id)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
          />
          
        </>
      ) : (
        <Text style={styles.emptyText}>Giỏ hàng trống</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pay')}>
        <Text style={styles.buttonText}>Thanh Toán</Text>
      </TouchableOpacity>
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
  emptyText: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5, // Đóng khung
    paddingHorizontal: 10, // Thêm padding ngang
    marginBottom: 10, // Thêm margin dưới
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // quantityButton: {
  //   backgroundColor: 'red', // Màu cam
  //   paddingHorizontal: 10,
  //   paddingVertical: 5,
  //   borderRadius: 5,
  //   marginRight: 5,
  // },
  quantityButtonText: {
    color: '#fff',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  removeButton: {
    backgroundColor: 'red', // Màu cam
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'black',
  },
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
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  totalText: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalPrice: {
    fontWeight: 'bold',
  },
});

export default Cart;

