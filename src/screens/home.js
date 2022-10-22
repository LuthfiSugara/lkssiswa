import { View, Text, StyleSheet, Pressable, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, signOut } from '../redux/actions/auth-actions';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Statusbar from '../components/status-bar';
import { baseUrl } from '../utils/global';
import { customStyle } from '../utils/style';
import Loader from '../components/loader';


const Home = ({navigation}) => {

  const dispatch = useDispatch();

  const {load_auth, profile} = useSelector((state) => state.userReducer);

  const loadData = async() => {
      await dispatch(getProfile());
  }

  useEffect(() => {
    loadData();
  }, []);

  const redirectToDetail = (id, idJabatan) => {
    navigation.navigate('ProfileUser', {
      userId: id,
      idJabatan: idJabatan,
    });
  }
      
  return load_auth ? (
    <Loader/>
  ) : ( 
    <View style={tw`bg-white pb-8`}>
      <ScrollView style={tw`h-full bg-white`}>
        <Statusbar page="home" />
        <View style={tw`border border-gray-500 rounded-lg mx-4 my-6`}>
          <View style={tw`flex flex-row rounded-t-lg bg-teal-50 p-4 items-center border-b border-gray-500`}>
            <View style={[tw`flex flex-col`, customStyle.w70]}>
              <Text style={tw`text-lg font-bold`}>Selamat Datang</Text>
              <View style={tw`flex flex-row`}>
                <Text style={tw`bg-teal-500 py-1 px-4 rounded-lg text-white`}>{profile.nama}</Text>
              </View>
            </View>
            <View style={[tw`ml-1`, customStyle.w15]}>
              <Image
                style={tw`w-20 h-20 rounded-lg`}
                source={{uri: baseUrl + profile.foto}}
              />
            </View>
          </View>

          <View style={tw`px-4 py-2 flex flex-row justify-around`}>
            <TouchableOpacity onPress={() => {
              redirectToDetail(profile.id, profile.jabatan.id);
            }}>
              <Icon name={'user'} size={20} color="#000000" style={tw`text-center`} />
              <Text style={tw`text-center`}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              Alert.alert(
                "",
                "Yakin, ingin keluar ?",
                [
                    { text: "Tidak" },
                    { text: "Ya", onPress: () => {
                      dispatch(signOut());
                    }}
                ]
              );
            }}>
              <Icon name={'power-off'} size={20} color="#000000" style={tw`text-center`} />
              <Text style={tw`text-center`}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      
        <View style={tw`flex flex-row flex-wrap justify-around mx-4`}>
          {profile.id_jabatan == 1 && 
            <TouchableOpacity
              onPress={() => navigation.navigate('User')}
              style={[tw`w-1/2 py-2 px-2 my-2 items-center rounded-xl border border-gray-500`, customStyle.w45]}
            >
              <Image
                style={[tw`rounded-lg w-20 h-20 m-4`, customStyle.aspectSquare]}
                source={require('../assets/images/user.jpg')}
              />
              <Text style={tw`font-semibold text-black text-center my-2`}>Data Pengguna</Text>
            </TouchableOpacity>
          }
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('Materi')}
            style={[tw`w-1/2 py-2 px-2 my-2 items-center rounded-xl border border-gray-500`, customStyle.w45]}
          >
            <Image
              style={[tw`rounded-lg w-30 h-30`, customStyle.aspectSquare]}
              source={require('../assets/images/materi.jpg')}
            />

            <Text style={tw`font-semibold text-black text-center my-2`}>Materi Pembelajaran</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate('LKS')}
            style={[tw`w-1/2 py-2 px-2 my-2 items-center rounded-xl border border-gray-500`, customStyle.w45]}
          >
            <Image
              style={[tw`rounded-lg w-30 h-30`, customStyle.aspectSquare]}
              source={require('../assets/images/e-lks.jpg')}
            />
            <Text style={tw`font-semibold text-black text-center my-2`}>E-LKS</Text>
          </TouchableOpacity>
          {profile.id_jabatan == 1 && 
            <TouchableOpacity 
              onPress={() => navigation.navigate('Setting')}
              style={[tw`w-1/2 py-2 px-2 my-2 items-center rounded-xl border border-gray-500`, customStyle.w45]}
            >
              <Image
                style={[tw`rounded-lg w-30 h-30`, customStyle.aspectSquare]}
                source={require('../assets/images/setting.jpg')}
              />
              <Text style={tw`font-semibold text-black text-center my-2`}>Pengaturan</Text>
            </TouchableOpacity>
          }

          <TouchableOpacity 
            onPress={() => navigation.navigate('Nilai')}
            style={[tw`w-1/2 py-2 px-2 my-2 items-center rounded-xl border border-gray-500`, customStyle.w45]}
          >
            <Image
              style={[tw`rounded-lg w-30 h-30`, customStyle.aspectSquare]}
              source={require('../assets/images/score.jpg')}
            />
            <Text style={tw`font-semibold text-black text-center my-2`}>Nilai</Text>
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

export default Home