
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CategoryItem = ({ image, title, navigation }) => {
  return (
    <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('ProductCategory')}>
      <Image source={image} style={styles.categoryImage} />
      <Text style={styles.categoryTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const Categories = () => {
  const categories = [

    { id: 1, title: 'Điện Thoại', image: require('../../assets/ip.png'),name:'smartphones' },
    { id: 2, title: 'Máy Tính', image: require('../../assets/mt.png'),name:'laptops' },
    { id: 3, title: 'Thuc Pham', image: require('../../assets/mbb.png'),name:'groceries' },


    // Add more categories as needed
  ];

  const navigation = useNavigation();

  return (
    <View style={styles.container} >
      {categories.map((category,index) => (
        // <CategoryItem 
        //   key={category.id}
        //   title={category.title}
        //   image={category.image}
        //   navigation = {navigation}
        // />
        <TouchableOpacity key={index} style={styles.categoryItem} onPress={() => navigation.navigate('Product',{titleCategory:category.name})}>
          <Image source={category.image} style={styles.categoryImage} />
          <Text style={styles.categoryTitle}>{category.title}</Text>
        </TouchableOpacity>

      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  categoryItem: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  categoryTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Categories;