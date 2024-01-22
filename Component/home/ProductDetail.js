
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const navigation = useNavigation();

  const handleBuyNow = () => {
    // Xử lý khi nhấn nút "Mua ngay"
  };

  const handleAddToCart = async () => {
    try {
      // Lấy danh sách sản phẩm từ AsyncStorage
      const existingCartItems = await AsyncStorage.getItem('cartItems');

      let updatedCartItems = [];

      if (existingCartItems) {
        // Nếu đã có sản phẩm trong giỏ hàng, chuyển danh sách sản phẩm thành mảng
        updatedCartItems = JSON.parse(existingCartItems);
      }

      // Thêm sản phẩm mới vào danh sách sản phẩm trong giỏ hàng
      updatedCartItems.push(product);

      // Lưu danh sách sản phẩm mới vào AsyncStorage
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      // Chuyển hướng đến trang giỏ hàng
      navigation.navigate('Cart');
    } catch (error) {
      console.log('Error adding to cart:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.images[0] }} style={styles.productImage} />
      <Text style={styles.productName}>{product.title}</Text>
      <Text style={styles.productPrice}>{product.price}$</Text>
      <Text style={styles.productdiscountPercentage}>discount:{product.discountPercentage}$</Text>
      

      <Text style={styles.productDescription}>Mô tả: {product.description}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pay')}>
        <Text style={styles.buttonText}>Mua ngay</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 10,
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
});

export default ProductDetail;