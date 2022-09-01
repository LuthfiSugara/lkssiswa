import React, { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from "react-redux";
import { dataMapel } from "../redux/actions/setting-actions";

const Materi = ({navigation}) => {
    const dispatch = useDispatch();

    const {loading, data_mapel} = useSelector((state) => state.settingReducer);

    const loadData = async() => {
        await dispatch(dataMapel());
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`py-2 px-4 rounded-full shadow bg-white`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center text-lg mr-5`}>Materi</Text>
                <View></View>
            </View>

            <ScrollView style={tw`h-full p-4 bg-white`}>
                <View style={tw`flex flex-row flex-wrap justify-center`}>
                    <Pressable
                        onPress={() => navigation.navigate('ListMateri')}
                        style={[styles.shadow, tw`w-2/5 px-4 py-8 m-2 items-center rounded-xl`]}
                    >
                        <Icon name={'book'} size={30} color="#0096FF" />
                        <Text style={tw`text-lg font-semibold text-black`}>Materi</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate('TambahMateri')}
                        style={[styles.shadow, tw`w-2/5 px-4 py-8 m-2 items-center rounded-xl`]}
                    >
                        <Icon name={'book'} size={30} color="#0096FF" />
                        <Text style={tw`text-lg font-semibold text-black`}>Tambah Materi</Text>
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

export default Materi;