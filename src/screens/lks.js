import { View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { customStyle } from '../utils/style';


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
          <Text style={tw`text-center mr-5`}>E-LKS</Text>
          <View></View>
      </View>

      <ScrollView style={tw`h-full p-4 bg-white`}>
        <View style={tw`flex flex-row items-center bg-teal-500 mx-4 rounded-lg my-5`}>
          <Image
            style={[tw`rounded-lg w-40 h-40 m-4`, customStyle.aspectSquare, customStyle.w20]}
            source={require('../assets/images/exam.jpg')}
          />
            <Text style={[tw`text-white`, customStyle.w80]}>E-LKS</Text>
        </View>
        <View style={tw`flex flex-row flex-wrap justify-around`}>
          <TouchableOpacity
              onPress={() => {redirectToCreateSoal(1)}}
              style={[tw`w-1/2 py-2 px-2 my-2 items-center rounded-xl border border-gray-500`, customStyle.w45]}
            >
            <Image
              style={[tw`rounded-lg w-20 h-20 m-4`, customStyle.aspectSquare]}
              source={require('../assets/images/exam.jpg')}
            />
            <Text style={tw`font-semibold text-black text-center my-2`}>Ulangan</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => {redirectToCreateSoal(2)}}
              style={[tw`w-1/2 py-2 px-2 my-2 items-center rounded-xl border border-gray-500`, customStyle.w45]}
            >
            <Image
              style={[tw`rounded-lg w-20 h-20 m-4`, customStyle.aspectSquare]}
              source={require('../assets/images/training.jpg')}
            />
            <Text style={tw`font-semibold text-black text-center my-2`}>Latihan</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => {redirectToCreateSoal(3)}}
              style={[tw`w-1/2 py-2 px-2 my-2 items-center rounded-xl border border-gray-500`, customStyle.w45]}
            >
            <Image
              style={[tw`rounded-lg w-20 h-20 m-4`, customStyle.aspectSquare]}
              source={require('../assets/images/work.jpg')}
            />
            <Text style={tw`font-semibold text-black text-center my-2`}>Tugas</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => {redirectToCreateSoal(4)}}
              style={[tw`w-1/2 py-2 px-2 my-2 items-center rounded-xl border border-gray-500`, customStyle.w45]}
          >
            <Image
              style={[tw`rounded-lg w-20 h-20 m-4`, customStyle.aspectSquare]}
              source={require('../assets/images/quiz.jpg')}
            />
            <Text style={tw`font-semibold text-black text-center my-2`}>Kuis</Text>
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