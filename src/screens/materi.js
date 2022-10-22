import React, { useEffect } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { customStyle } from "../utils/style";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/actions/auth-actions";
import Loader from "../components/loader";

const Materi = ({navigation}) => {

    const dispatch = useDispatch();

    const {load_auth, profile} = useSelector((state) => state.userReducer);

    const loadData = async() => {
        await dispatch(getProfile());
    }

    useEffect(() => {
        loadData();
    }, []);

    console.log("profile : ", profile);

    return load_auth ? (
        <Loader/>
    ) : (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`py-2 px-4 rounded-full shadow bg-white`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>Materi Pembelajaran</Text>
                <View></View>
            </View>

            <ScrollView style={tw`h-full p-4 bg-white`}>
                <View style={tw`flex flex-row items-center bg-teal-500 mx-4 rounded-lg my-5`}>
                    <Image
                        style={[tw`rounded-lg w-40 h-40 m-4`, customStyle.aspectSquare, customStyle.w20]}
                        source={require('../assets/images/add-materi.jpg')}
                    />
                    <Text style={[tw`text-white`, customStyle.w80]}>Kelola materi pembelajaran siswa</Text>
                </View>
                <View style={tw`flex flex-row flex-wrap justify-around`}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ListMateri')}
                        style={[tw`w-1/2 py-2 px-2 my-2 items-center rounded-xl border border-gray-500`, customStyle.w45]}
                    >
                        <Image
                            style={[tw`rounded-lg w-20 h-20 m-4`, customStyle.aspectSquare]}
                            source={require('../assets/images/materi2.jpg')}
                        />
                        <Text style={tw`font-semibold text-black text-center my-2`}>Daftar Materi</Text>
                    </TouchableOpacity>
                    {profile.id_jabatan == 1 || profile.id_jabatan == 2 ? (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('TambahMateri')}
                            style={[tw`w-1/2 py-2 px-2 my-2 items-center rounded-xl border border-gray-500`, customStyle.w45]}
                        >
                            <Image
                                style={[tw`rounded-lg w-20 h-20 m-4`, customStyle.aspectSquare]}
                                source={require('../assets/images/add-materi.jpg')}
                            />
                            <Text style={tw`font-semibold text-black text-center my-2`}>Tambah Materi</Text>
                        </TouchableOpacity>
                    ) : null}
                    
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