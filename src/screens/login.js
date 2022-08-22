import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedIn, signIn } from "../redux/actions/auth-actions"
import tw from 'twrnc';
import { Formik } from 'formik';
import * as Yup from "yup";
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { baseUrl } from '../utils/global';


const Login = ({navigation}) => {

    const dispatch = useDispatch();

    const {loading, token, sign_out, is_logged_in} = useSelector(state => state.userReducer);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const userLogin = async() => {
        console.log("login");
        let token = "123123";
        await dispatch(signIn(token));
    }
    console.log("url : ",baseUrl);

    return (
        <View style={tw`bg-white flex-1 justify-center px-4`}>
            <View style={tw`self-center mb-10`}>
                <Image
                    source={require('../assets/images/logo.png')}
                    style={tw`w-20 h-20`}
                />
            </View>
            <Formik
                initialValues={{ 
                    username: '',
                    password: '',
                    device_name: DeviceInfo.getBrand()
                }}
                onSubmit={(values) => {
                    dispatch(signIn(values));
                }}
                validationSchema={Yup.object().shape({
                    username: Yup
                        .string()
                        .required("Tidak boleh kosong!"),
                    password: Yup
                        .string()
                        .min(6, "Minimal 6 karakter")
                        .required("Tidak boleh kosong"),
                })}
            >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <View>
                    <View style={tw`mb-4`}>
                        <Text>Username</Text>
                        <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                            <Icon name={'user'} size={20} color="#0096FF" style={tw`px-4`} />
                            <TextInput
                                value={values.username}
                                onChangeText={handleChange('username')}
                                onBlur={() => setFieldTouched('username')}
                                placeholder="Username"
                                style={tw`w-full border-l border-gray-300 pl-2`}
                            />
                        </View>
                        {touched.username && errors.username &&
                            <Text style={tw`text-xs text-red-600`}>{errors.username}</Text>
                        }
                    </View>    
                    
                    <View style={tw`mb-4`}>
                        <Text>password</Text>
                        <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                            <Icon name={'lock'} size={20} color="#0096FF" style={tw`px-4`} />
                            <TextInput
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={() => setFieldTouched('password')}
                                placeholder="password"
                                secureTextEntry
                                style={tw`w-full border-l border-gray-300 pl-2`}
                            />
                        </View>
                        {touched.password && errors.password &&
                            <Text style={tw`text-xs text-red-600`}>{errors.password}</Text>
                        }
                    </View>
                    
                    <Pressable 
                        style={tw`bg-blue-500 p-2 rounded-md`}
                        onPress={handleSubmit}
                    >
                        <Text style={tw`text-white font-semibold text-center text-lg`}>Login</Text>
                    </Pressable>
                </View>
                )}
            </Formik>
            
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    }
})

export default Login