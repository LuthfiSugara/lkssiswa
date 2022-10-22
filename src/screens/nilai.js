import { View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, signOut } from '../redux/actions/auth-actions';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dataKelas, dataMapel } from '../redux/actions/setting-actions';
import { customStyle } from '../utils/style';


const Nilai = ({navigation}) => {

  const dispatch = useDispatch();

  const {loading, profile} = useSelector((state) => state.userReducer);
  const {data_kelas, data_mapel} = useSelector((state) => state.settingReducer);

  const loadData = async() => {
      await dispatch(getProfile());
      await dispatch(dataKelas());
      await dispatch(dataMapel());
  }
  const [step, setStep] = useState(1);
  const [idKelas, setIdKelas] = useState(0);

  useEffect(() => {
    loadData();
  }, []);
    
      
  return (
    <View style={tw`h-full bg-white`}>
      <View style={tw`flex flex-row justify-between items-center p-2`}>
          <Pressable style={tw`py-2 px-4 rounded-full shadow bg-white`} onPress={() => {
            step == 2 ? setStep(1) : navigation.goBack();
          }}>
              <Icon name={'angle-left'} size={25} color="#000000" />
          </Pressable>
          <Text style={tw`text-center mr-5`}>Nilai</Text>
          <View></View>
      </View>

      <ScrollView style={tw`mt-4`}>
        <View style={tw`flex flex-row items-center bg-teal-500 mx-4 rounded-lg my-5`}>
          <Image
            style={[tw`rounded-lg w-40 h-40 m-4`, customStyle.aspectSquare, customStyle.w20]}
            source={require('../assets/images/exam.jpg')}
          />
            <Text style={[tw`text-white`, customStyle.w80]}>Kelola data nilai siswa</Text>
        </View>
        <View style={tw`flex flex-row flex-wrap justify-center`}>
          {step == 1 ? (
            data_kelas.map((kelas, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setStep(2);
                    setIdKelas(kelas.id);
                  }}
                  style={[styles.shadow, tw`w-2/5 px-4 py-8 m-2 items-center rounded-xl`]}
                >
                  <Icon name={'users'} size={30} color="#14b8a6" />
                  <Text style={tw`text-lg font-semibold text-black`}>{kelas.name}</Text>
                </TouchableOpacity>
              )
            })
          ) : (
            data_mapel.map((kelas, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate('NilaiSiswa', {
                    id_kelas: idKelas,
                    id_mapel: kelas.id,
                  })}
                  style={[styles.shadow, tw`w-2/5 px-4 py-8 m-2 items-center rounded-xl`]}
                >
                  <Icon name={'users'} size={30} color="#14b8a6" />
                  <Text style={tw`text-lg font-semibold text-black`}>{kelas.name}</Text>
                </TouchableOpacity>
              )
            })
          )}
          
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