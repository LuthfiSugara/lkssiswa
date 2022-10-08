import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { customStyle } from "../utils/style";

const User = ({navigation}) => {
    return (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>Data Pengguna</Text>
                <View></View>
            </View>
            <ScrollView style={tw`h-full bg-white`}>
                <View style={tw`flex flex-row items-center bg-teal-500 mx-4 rounded-lg mt-5`}>
                    <Image
                        style={[tw`rounded-lg w-40 h-40 m-4`, customStyle.aspectSquare, customStyle.w20]}
                        source={require('../assets/images/teacher.jpg')}
                    />
                    <Text style={[tw`text-white`, customStyle.w80]}>Kelola data Guru, Murid dan Admin</Text>
                </View>
                <View style={tw`flex flex-row flex-wrap justify-around mx-2 mt-5`}>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('ListGuru')}
                        style={[customStyle.w45, tw` p-4 m-2 items-center border border-gray-500 rounded-xl`]}
                    >
                        <Image
                            style={[tw`rounded-lg w-30 h-30 m-4`, customStyle.aspectSquare]}
                            source={require('../assets/images/teacher.jpg')}
                        />
                        <Text style={tw`text-lg font-semibold text-black`}>Guru</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ListSiswa')}
                        style={[customStyle.w45, tw` p-4 m-2 items-center border border-gray-500 rounded-xl`]}
                    >
                        <Image
                            style={[tw`rounded-lg w-30 h-30 m-4`, customStyle.aspectSquare]}
                            source={require('../assets/images/student.jpg')}
                        />
                        <Text style={tw`text-lg font-semibold text-black`}>Murid</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ListAdmin')}
                        style={[customStyle.w45, tw` p-4 m-2 items-center border border-gray-500 rounded-xl`]}
                    >
                        <Image
                            style={[tw`rounded-lg w-30 h-30 m-4`, customStyle.aspectSquare]}
                            source={require('../assets/images/admin.jpg')}
                        />
                        <Text style={tw`text-lg font-semibold text-black`}>Admin</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    shadow: {  
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 10, height: 0},
      shadowRadius: 20,
      elevation: 10,
      backgroundColor: 'white'
    }
  });

export default User;