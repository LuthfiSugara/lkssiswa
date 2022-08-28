import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, signOut } from '../redux/actions/auth-actions';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dataKelas } from '../redux/actions/setting-actions';


const Nilai = ({navigation}) => {

  const dispatch = useDispatch();

  const {loading, profile} = useSelector((state) => state.userReducer);
  const {data_kelas} = useSelector((state) => state.settingReducer);

  const loadData = async() => {
      await dispatch(getProfile());
      await dispatch(dataKelas());
  }
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    loadData();
  }, []);
    

  const data = [
    { label: 'Profile', value: profile?.nama_lengkap },
    { label: 'Logout', value: profile?.nama_lengkap },
  ];

  const redirectToDetail = (id, idJabatan) => {
    navigation.navigate('ProfileUser', {
      userId: id,
      idJabatan: idJabatan,
    });
  }
  console.log(data_kelas);
      
  return (
    <View>
      <ScrollView style={tw`h-full p-4 bg-white`}>
          <View style={tw`flex flex-row flex-wrap justify-center`}>
        {data_kelas.map((kelas, index) => {
            return (
                <View
                    // onPress={() => navigation.navigate('User')}
                    style={[styles.shadow, tw`w-2/5 px-4 py-8 m-2 items-center rounded-xl`]}
                >
                    <Icon name={'users'} size={30} color="#0096FF" />
                    <Text style={tw`text-lg font-semibold text-black`}>{kelas.name}</Text>
                </View>
            )
        })}
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

export default Nilai