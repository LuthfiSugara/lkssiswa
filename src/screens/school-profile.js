import React from 'react'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Pressable, ScrollView, Text, View } from 'react-native';

const SchoolProfile = () => {
    return (
        <View style={tw`flex-1 justify-center`}>
            <View style={tw`flex flex-row justify-between bg-white items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>Profil Sekolah</Text>
                <View></View>
            </View>

            <ScrollView style={tw`h-full p-4 bg-white`}>
                <Text>MTSS NURUL KHAIRIYAH adalah salah satu satuan pendidikan dengan jenjang MTs di Sei Tuan, Kec. Pantai Labu, Kab. Deli Serdang, Sumatera Utara. Dalam menjalankan kegiatannya, MTSS NURUL KHAIRIYAH berada di bawah naungan Kementerian Agama.</Text>
                <View style={tw`my-6`}>
                    <Text style={tw`text-lg text-black`}>Informasi MTS Nurul Khairiyah</Text>
                    <View style={tw`flex flex-row border border-gray-300`}>
                        <Text style={tw`w-2/5 p-1`}>Nama</Text>
                        <Text style={tw`w-3/5 p-1 pl-2 border-l border-gray-300`}>MTSS NURUL KHAIRIYAH</Text>
                    </View>
                    <View style={tw`flex flex-row border border-gray-300`}>
                        <Text style={tw`w-2/5 p-1`}>NPSN</Text>
                        <Text style={tw`w-3/5 p-1 pl-2 border-l border-gray-300`}>10264225</Text>
                    </View>
                    <View style={tw`flex flex-row border border-gray-300`}>
                        <Text style={tw`w-2/5 p-1`}>Alamat</Text>
                        <Text style={tw`w-3/5 p-1 pl-2 border-l border-gray-300`}>DUSUN I SEI TUAN</Text>
                    </View>
                    <View style={tw`flex flex-row border border-gray-300`}>
                        <Text style={tw`w-2/5 p-1`}>Desa / Kelurahan</Text>
                        <Text style={tw`w-3/5 p-1 pl-2 border-l border-gray-300`}>SEI TUAN</Text>
                    </View>
                    <View style={tw`flex flex-row border border-gray-300`}>
                        <Text style={tw`w-2/5 p-1`}>Kecamatan / Kota (LN)</Text>
                        <Text style={tw`w-3/5 p-1 pl-2 border-l border-gray-300`}>Kec. Pantai Labu</Text>
                    </View>
                    <View style={tw`flex flex-row border border-gray-300`}>
                        <Text style={tw`w-2/5 p-1`}>Kab. / Kota / Negara (LN)</Text>
                        <Text style={tw`w-3/5 p-1 pl-2 border-l border-gray-300`}>Kab. Deli Serdang</Text>
                    </View>
                    <View style={tw`flex flex-row border border-gray-300`}>
                        <Text style={tw`w-2/5 p-1`}>Provinsi</Text>
                        <Text style={tw`w-3/5 p-1 pl-2 border-l border-gray-300`}>Sumatera Utara</Text>
                    </View>
                    <View style={tw`flex flex-row border border-gray-300`}>
                        <Text style={tw`w-2/5 p-1`}>Status Sekolah</Text>
                        <Text style={tw`w-3/5 p-1 pl-2 border-l border-gray-300`}>Swasta</Text>
                    </View>
                    <View style={tw`flex flex-row border border-gray-300`}>
                        <Text style={tw`w-2/5 p-1`}>Jenjang Pendidikan</Text>
                        <Text style={tw`w-3/5 p-1 pl-2 border-l border-gray-300`}>MTs</Text>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

export default SchoolProfile