import { View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';


const LKS = ({navigation}) => {

  const redirectToCreateSoal = (id) => {
    navigation.navigate('Soal', {
      id_soal: id
    });
  }
      
  return (
    <View style={tw`flex-1 justify-center`}>
      <View style={tw`flex flex-row justify-between bg-white items-center p-2`}>
          <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
              <Icon name={'angle-left'} size={25} color="#000000" />
          </Pressable>
          <Text style={tw`text-center text-lg mr-5`}>Ujian</Text>
          <View></View>
      </View>

      <ScrollView style={tw`h-full p-4 bg-white`}>
        <View style={tw`flex flex-row flex-wrap justify-center`}>
          <TouchableOpacity
            onPress={() => redirectToCreateSoal(1)} 
            style={[styles.shadow, tw`w-2/5 px-4 py-8 m-2 items-center rounded-xl`]}
          >
              <Icon name={'file-signature'} size={30} color="#0096FF" />
              <Text style={tw`text-lg font-semibold text-black`}>Ulangan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => redirectToCreateSoal(2)} 
            style={[styles.shadow, tw`w-2/5 px-4 py-8 m-2 items-center rounded-xl`]}>
              <Icon name={'shapes'} size={30} color="#0096FF" />
              <Text style={tw`text-lg font-semibold text-black`}>Latihan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => redirectToCreateSoal(3)} 
            style={[styles.shadow, tw`w-2/5 px-4 py-8 m-2 items-center rounded-xl`]}>
              <Icon name={'superscript'} size={30} color="#0096FF" />
              <Text style={tw`text-lg font-semibold text-black`}>Tugas</Text>
            </TouchableOpacity>
          <TouchableOpacity
            onPress={() => redirectToCreateSoal(4)} 
            style={[styles.shadow, tw`w-2/5 px-4 py-8 m-2 items-center rounded-xl`]}>
              <Icon name={'pencil-ruler'} size={30} color="#0096FF" />
              <Text style={tw`text-lg font-semibold text-black`}>Kuis</Text>
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

export default LKS