import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const Main = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleRegister = () => {
        if (email === "" || password === "" || confirmPassword === "") {
            Alert.alert('Vui lòng nhập đầy đủ thông tin !');
        }
        else {
            if (password !== confirmPassword) {
                Alert.alert('Mật khẩu không khớp !');
            }
            else {
                const newAccount = {
                    email: email,
                    password: password,
                };
                addRegister(newAccount);
            }
        }
    }

    const addRegister = async (itemAccount) => {
        try {
            const existingUserItems = await AsyncStorage.getItem('userItems');
            let userItems = [];
            if (existingUserItems) {
                userItems = JSON.parse(existingUserItems);
            }

            // Kiểm tra xem email đã tồn tại trong danh sách đăng ký chưa
            const existingUserIndex = userItems.findIndex(
                (item) => item.email === itemAccount.email
            );

            if (existingUserIndex !== -1) {
                Alert.alert('Tài khoản đã tồn tại');
            } else {
                const newAccount = {
                    ...itemAccount
                };
                userItems.push(newAccount);
                await AsyncStorage.setItem('userItems', JSON.stringify(userItems));
                console.log('aaa', userItems);
                alert('Đăng ký tài khoản thành công');
                navigation.navigate('Login');
            }
        } catch (error) {
            console.log('Error adding account:', error);
        }
    };
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <Image
                        source={require('../assets/home.jpg')}
                        style={styles.image}
                    />         
                    <Text>Please sign in to your account</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="User Name"
                        keyboardType="input your email-address"
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                       
                    />
                    {/* <TextInput
                        style={styles.input}
                        placeholder="User Name"
                    /> */}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />
                    <TextInput
                       style={styles.input}
                       placeholder="confirmPassword"
                       secureTextEntry
                       value={confirmPassword}
                       onChangeText={(value) => setConfirmPassword(value)}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRegister}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
    },
    input: {
        color: 'gray',
        backgroundColor: '#ffff',
        margin: 10,
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 16,
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
        marginTop: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#DDDDDD',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Main;