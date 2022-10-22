import React, { useEffect } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux'
import { getAllAdmin } from '../redux/actions/auth-actions';
import { baseUrl } from "../utils/global";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../components/loader";

const ListAdmin = ({navigation}) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const {load_auth, list_admin} = useSelector((state) => state.userReducer);

    const loadData = async() => {
        await dispatch(getAllAdmin());
    }

    useEffect(() => {
        loadData();
    }, [isFocused]);

    const redirectToDetail = (id, idJabatan) => {
        navigation.navigate('ProfileUser', {
            userId: id,
            idJabatan: idJabatan
        })
    }

    return load_auth ? (
        <Loader/>
    ) : (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>Admin</Text>
                <Pressable 
                    onPress={() => navigation.navigate('TambahAdmin', {
                            'idJabatan' : 1,
                    })}
                    style={tw`py-2 px-4`}
                >
                    <Icon name={'plus-square'} size={25} color="#000000" />
                </Pressable>
            </View>

            <ScrollView>
                {list_admin.map((user, index) => {
                    return (
                        <Pressable 
                            onPress={() => redirectToDetail(user.id, user.id_jabatan)} 
                            style={tw`flex flex-row justify-between pr-4 items-center rounded-lg m-4`} key={index}
                        >
                            <View style={tw`flex flex-row items-center`}>
                                <View style={tw`mr-2`}>
                                    <Image 
                                        style={tw`w-20 h-20 rounded-lg`}
                                        source={{uri: baseUrl + user.foto}}
                                    />
                                </View>
                                <View style={tw`ml-2`}>
                                    <Text style={tw`text-lg text-black font-bold`}>{user.nama}</Text>
                                    <Text style={tw`text-xs font-semibold`}>{user.username}</Text>
                                </View>
                            </View>
                            <Icon name={'angle-right'} size={25} color="#000000" />
                        </Pressable>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default ListAdmin;