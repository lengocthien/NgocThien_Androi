// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import Header from './Component/Header';
// import Footer from './Component/Footer';
// import Main from './Component/Main';
// import Home from './Component/Home';
// import ProductDetail from './Component/home/ProductDetail';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// export default function App() {
//   return (
//     // <View style={styles.container}>
//     // <Header></Header>
//     /* <Main></Main> */
//     /* <Home/>
//     <Footer></Footer>
//     </View> */
//     <NavigationContainer>
//     <Stack.Navigator>
//       <Stack.Screen name="Login" component={Main} />
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Detail" component={ProductDetail} />
//     </Stack.Navigator>
//   </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
  
//   },
// });
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Component/Home';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Register from './Component/Register';

import Setting from './Component/home/Setting';

import Profile from './Component/home/Profile';
import Nofication from './Component/home/Nofication';
import Pay from './Component/home/Payment';
import Product from './Component/ProductCategory/Product';
import SearchProduct from './Component/Search/SearchProduct';





import Login from './Component/Login';
import ProductDetail from './Component/home/ProductDetail';
import Cart from './Component/Cart/Cart';

const Stack = createStackNavigator();

export default function App() {
  return (
    
    
    <NavigationContainer>
      <Header/>
      <Stack.Navigator>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Nofication" component={Nofication} />
      <Stack.Screen name="Pay" component={Pay} />
      <Stack.Screen name="SearchProduct" component={SearchProduct} />



      <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
      <Footer/>
    </NavigationContainer>
  
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
