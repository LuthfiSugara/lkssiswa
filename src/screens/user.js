import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';

const User = ({navigation}) => {
    return (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center text-lg mr-5`}>User</Text>
                <View></View>
            </View>
            <ScrollView style={tw`h-full p-4 bg-white`}>
                <View style={tw`flex flex-row flex-wrap justify-center`}>
                    <Pressable
                        onPress={() => navigation.navigate('ListGuru')}
                        style={[styles.shadow, tw`w-2/5 px-4 py-8 m-2 items-center rounded-xl`]}
                    >
                        <Icon name={'user-clock'} size={30} color="#0096FF" />
                        <Text style={tw`text-lg font-semibold text-black`}>Guru</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate('ListSiswa')}
                        style={[styles.shadow, tw`w-2/5 px-4 py-8 m-2 items-center rounded-xl`]}
                    >
                        <Icon name={'user-graduate'} size={30} color="#0096FF" />
                        <Text style={tw`text-lg font-semibold text-black`}>Murid</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate('ListAdmin')}
                        style={[styles.shadow, tw`w-2/5 px-4 py-8 m-2 items-center rounded-xl`]}
                    >
                        <Icon name={'user-secret'} size={30} color="#0096FF" />
                        <Text style={tw`text-lg font-semibold text-black`}>Admin</Text>
                    </Pressable>
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