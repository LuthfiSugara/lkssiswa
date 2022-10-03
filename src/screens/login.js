import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from "../redux/actions/auth-actions"
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFormik } from 'formik';
import * as Yup from "yup";
import DeviceInfo from 'react-native-device-info';
import { customStyle } from '../utils/style';
import { useState } from 'react';
import Statusbar from '../components/status-bar';


const Login = () => {

    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(true);

    const changeIconPassword = () => {
        showPassword === false ? setShowPassword(true) : setShowPassword(false);
    }

    const {values, setFieldValue, handleSubmit, handleReset, errors, touched} = useFormik({
        initialValues: {
            username: '',
            password: '',
            device_name: DeviceInfo.getBrand(),
        },
        onSubmit: values => {
            dispatch(signIn(values));
        },
        validationSchema: Yup.object().shape({
            username: Yup
                .string()
                .required("Tidak boleh kosong!"),
            password: Yup
                .string()
                .min(6, "Minimal 6 karakter")
                .required("Tidak boleh kosong!"),
        }),
    });

    return (
        <View style={tw`bg-teal-600 justify-center`}>
            <Statusbar page="login" />
            <ScrollView style={tw``}>
                <View style={tw`bg-teal-600`}>
                    <Text style={tw`text-white text-center text-4xl font-bold mt-10 mb-5`}>Log-In</Text>
                </View>
                <View style={[tw`bg-white rounded-t-3xl px-4`, customStyle.shadow]}>
                    <View style={tw`my-10 w-full`}>
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={[tw`w-30 h-30 mx-auto`, customStyle.aspectSquare]}
                        />
                    </View>
                    <View style={tw`h-full`}>
                        <View style={tw`mb-4`}>
                            <Text style={tw`text-black mb-1`}>Username</Text>
                            <TextInput
                                value={values.username}
                                onChangeText={(e) => setFieldValue('username', e)}
                                placeholder="user"
                                style={[tw`w-full border border-gray-300 rounded-lg px-2`]}
                            />
                            {touched.username && errors.username &&
                                <Text style={tw`text-xs text-red-600`}>{errors.username}</Text>
                            }
                        </View>
                        
                        <View style={tw`mb-4`}>
                            <Text style={tw`text-black mb-1`}>Password</Text>
                            <View style={tw`flex flex-row justify-between items-center border border-gray-300 rounded-lg`}>
                                <TextInput
                                    value={values.password}
                                    onChangeText={(e) => setFieldValue('password', e)}
                                    placeholder="******"
                                    secureTextEntry={showPassword}
                                    style={[tw`px-2`, customStyle.w85]}
                                />
                                <Icon name={showPassword ? "eye-slash" : "eye"} size={15} color="#9e9e9e" style={[tw`px-4 py-3`, customStyle.w15]} onPress={changeIconPassword} />
                            </View>
                            {touched.password && errors.password &&
                                <Text style={tw`text-xs text-red-600`}>{errors.password}</Text>
                            }
                        </View>
                        <TouchableOpacity 
                            style={tw`bg-teal-600 p-2 mt-10 rounded-md`}
                            onPress={handleSubmit}
                        >
                            <Text style={tw`text-white font-semibold text-center text-lg`}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Login