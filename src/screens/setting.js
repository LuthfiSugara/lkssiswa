import React from "react";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import Icon from 'react-native-vector-icons/FontAwesome5';

const Setting = ({navigation}) => {
    return (
        <View style={tw`bg-white h-full`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center text-lg mr-5`}>Pengaturan</Text>
                <View></View>
            </View>
            <ScrollView style={tw`p-4 mt-4`}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('ListKelas')}
                    style={tw`flex flex-row justify-between bg-gray-100 p-4 mb-4 rounded-lg items-center`}
                >
                    <View style={tw`flex flex-row items-center`}>
                        <Icon name={'school'} size={25} color="#2196f3" />
                        <View style={tw`ml-4`}>
                            <Text style={tw`text-lg text-black`}>Kelas</Text>
                            <Text>Daftar kelas</Text>
                        </View>
                    </View>
                    <Icon name={'angle-right'} size={25} color="#2196f3" />
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => navigation.navigate('ListMapel')}
                    style={tw`flex flex-row justify-between bg-gray-100 p-4 mb-4 rounded-lg items-center`}
                >
                    <View style={tw`flex flex-row items-center`}>
                        <Icon name={'book'} size={25} color="#2196f3" />
                        <View style={tw`ml-4`}>
                            <Text style={tw`text-lg text-black`}>Mata Pelajaran</Text>
                            <Text>Daftar Mata Pelajaran</Text>
                        </View>
                    </View>
                    <Icon name={'angle-right'} size={25} color="#2196f3" />
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Setting;