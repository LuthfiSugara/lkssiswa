import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, signOut } from '../redux/actions/auth-actions';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({navigation}) => {

  const dispatch = useDispatch();

  const {loading, profile} = useSelector((state) => state.userReducer);

  const loadData = async() => {
      await dispatch(getProfile());
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
      
  return (
    <View>
      <View style={tw`p-4`}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
          data={data}
          search={false}
          maxHeight={300}
          labelField="label"
          valueField={profile?.nama_lengkap}
          placeholder={!isFocus ? profile?.nama_lengkap : '...'}
          value={profile?.nama_lengkap}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setIsFocus(false);
            if(item.label == "Logout"){
              dispatch(signOut());
            }else if(item.label == "Profile"){
              redirectToDetail(profile?.id, profile.id_jabatan);
            }
          }}
        />
      </View>
      <ScrollView style={tw`h-full p-4 bg-white`}>
        <View style={tw`flex flex-row flex-wrap justify-center`}>
          <Pressable
            onPress={() => navigation.navigate('User')}
            style={[styles.shadow, tw`w-2/5 px-4 py-8 m-2 items-center rounded-xl`]}
          >
            <Icon name={'users'} size={30} color="#0096FF" />
            <Text style={tw`text-lg font-semibold text-black`}>Data User</Text>
          </Pressable>
          <Pressable 
            onPress={() => navigation.navigate('Materi')}
            style={[styles.shadow, tw`w-2/5 px-4 py-8 m-2 items-center rounded-xl`]}
          >
            <Icon name={'book'} size={30} color="#0096FF" />
            <Text style={tw`text-lg font-semibold text-black`}>Materi</Text>
          </Pressable>
          <View style={[styles.shadow, tw`w-2/5 px-4 py-8 m-2 items-center rounded-xl`]}>
            <Icon name={'file-signature'} size={30} color="#0096FF" />
            <Text style={tw`text-lg font-semibold text-black`}>Ujian</Text>
          </View>
          <Pressable 
            onPress={() => navigation.navigate('Setting')}
            style={[styles.shadow, tw`w-2/5 px-4 py-8 m-2 items-center rounded-xl`]}
          >
            <Icon name={'cog'} size={30} color="#0096FF" />
            <Text style={tw`text-lg font-semibold text-black`}>Pengaturan</Text>
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

export default Home