import React from "react";
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { customStyle } from "../utils/style";

const Setting = ({navigation}) => {
    return (
        <View style={tw`bg-white h-full`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>Pengaturan</Text>
                <View></View>
            </View>
            <ScrollView style={tw`p-4 mt-4`}>
                <View style={tw`flex flex-row items-center bg-teal-500 mx-4 rounded-lg my-5`}>
                    <Image
                        style={[tw`rounded-lg w-40 h-40 m-4`, customStyle.aspectSquare, customStyle.w20]}
                        source={require('../assets/images/exam.jpg')}
                    />
                    <Text style={[tw`text-white`, customStyle.w80]}>Pengaturan</Text>
                </View>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('ListKelas')}
                    style={tw`flex flex-row justify-between bg-gray-100 p-4 mb-4 rounded-lg items-center`}
                >
                    <View style={tw`flex flex-row items-center`}>
                        <Icon name={'users-cog'} size={25} color="#14b8a6" />
                        <View style={tw`ml-4`}>
                            <Text style={tw`text-lg text-black`}>Kelas</Text>
                            <Text>Daftar kelas</Text>
                        </View>
                    </View>
                    <Icon name={'angle-right'} size={25} color="#14b8a6" />
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => navigation.navigate('ListMapel')}
                    style={tw`flex flex-row justify-between bg-gray-100 p-4 mb-4 rounded-lg items-center`}
                >
                    <View style={tw`flex flex-row items-center`}>
                        <Icon name={'book'} size={25} color="#14b8a6" />
                        <View style={tw`ml-4`}>
                            <Text style={tw`text-lg text-black`}>Mata Pelajaran</Text>
                            <Text>Daftar Mata Pelajaran</Text>
                        </View>
                    </View>
                    <Icon name={'angle-right'} size={25} color="#14b8a6" />
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Setting;