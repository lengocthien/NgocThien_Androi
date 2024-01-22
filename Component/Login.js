import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

const Main = ({navigation}) => {
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        getUserItems();
        
      }, []);
      const getUserItems = async () => {
        try {
          const existingUserItems = await AsyncStorage.getItem('userItems');
    
          if (existingUserItems) {
            const parsedUserItems = JSON.parse(existingUserItems);
            setUser(parsedUserItems);
          }
        } catch (error) {
          console.log('Error retrieving cart items:', error);
        }
      };

      const handleLogin = () =>{
        if(email === "" || password === ""){
            // Alert.alert('Vui lòng nhập email và password');
            alert('Vui lòng nhập email và password');
        }
        else
        {
            const matchedUser = user.find((userData) => userData.email === email && userData.password === password);
            if (matchedUser) {
                // Alert.alert('Login successful');
                alert('Đăng nhập thành công');
                navigation.replace('Home');
              } else {
                // Alert.alert('Invalid email or password');
                alert('Sai mật khẩu hoặc email');
              }
        }
      }

    return (
        
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={require('../assets/home.jpg')}
                    style={styles.image}
                />
                <Text> Welcome Back!</Text>
                <Text>Please sign in to your acount</Text>
                <TextInput
                    style={styles.input}
                    placeholder="User Name"
                    keyboardType="input your email-address"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />
                <TextInput
                   style={styles.input}
                   placeholder="Password"
                   secureTextEntry
                   value={password}
                   onChangeText={(value) => setPassword(value)}
                />
                
                <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                
               
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        color: 'gray',
        backgroundColor: '#ffff',
        margin:10,
        borderRadius: 20,
        height: 70,
        width: '70%',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
       
    },
    buttonUserName:{
justifyContent:'left',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 16,
    },
    text: {
        fontSize: 18,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '70%',
        marginTop:30,
        alignItems: 'center',
    },
    buttonSignInGoole: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '70%',
        marginTop:30,
        alignItems: 'center',
    },
    buttonSignInFaceBook: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '70%',
        marginTop:30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#DDDDDD',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#888',
    },
});

export default Main;