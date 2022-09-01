import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, Text, View, PermissionsAndroid, TouchableOpacity, Alert } from 'react-native'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from "react-redux";
import { getDetailMateri } from '../redux/actions/materi-actions';
import { WebView } from 'react-native-webview';
// import {NativeModules} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { baseUrl } from '../utils/global';
import { useIsFocused } from "@react-navigation/native";

const DetailMateri = ({navigation, route}) => {
    const {id, mapel_name, schedule} = route.params;
    // const RNFetchBlob = NativeModules.RNFetchBlob;
    const isFocused = useIsFocused();
    
    const dispatch = useDispatch();
    const [fileUrl, setFileUrl] = useState(baseUrl + "/assets/images/example.png");

    const {loading, detail_materi} = useSelector((state) => state.materiReducer);

    const loadData = async() => {
        await dispatch(getDetailMateri(id));
    }
    
    useEffect(() => {
        loadData();
    }, [isFocused]);

    const checkPermission = async () => {
        
        if (Platform.OS === 'ios') {
            downloadFile();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message:
                    'Application needs access to your storage to download File',
                }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    downloadFile();
                    console.log('Storage Permission Granted.');
                } else {
                    Alert.alert('Error','Storage Permission Not Granted');
                }
            } catch (err) {
                console.log("++++"+err);
            }
        }
    };

    const downloadFile = () => {
        let date = new Date();
        
        let FILE_URL = fileUrl;    
        
        let file_ext = getFileExtention(FILE_URL);
    
        file_ext = '.' + file_ext[0];
    
        const { config, fs } = RNFetchBlob;
        let RootDir = fs.dirs.PictureDir;
        let options = {
        fileCache: true,
        addAndroidDownloads: {
            path:
            RootDir+
            '/file_' + 
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            file_ext,
            description: 'downloading file...',
            notification: true,
            
            useDownloadManager: true,   
        },
        };
        config(options)
        .fetch('GET', FILE_URL)
        .then(res => {
            console.log('res -> ', JSON.stringify(res));
            Alert.alert('Download materi', 'Download Berhasil.');
        });
    };

    const getFileExtention = fileUrl => {
        return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
    };

    return (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`py-2 px-4 rounded-full shadow bg-white`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center text-lg mr-5`}>{mapel_name + ' - ' + schedule}</Text>
                <View></View>
            </View>
            <ScrollView style={tw`h-full`}>
                <View style={tw`mt-4 px-4`}>
                    <View style={tw`flex flex-row justify-between items-center mb-4`}>
                        <Text style={tw`text-lg mb-4`}>{detail_materi.judul}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('EditMateri', { id: id})} style={tw`bg-green-500 rounded`}>
                            <Text style={tw`text-white p-2`}>Update</Text>
                        </TouchableOpacity>
                    </View>
                    {detail_materi?.detail?.map((detail, index) => {
                        return (
                            <View key={index} style={tw`flex flex-row justify-between mb-2 pb-1 border-b border-gray-300`}>
                                <Text>File Pendukung {index + 1}</Text>
                                <TouchableOpacity onPress={() => {
                                    setFileUrl(baseUrl + detail.name);
                                    checkPermission();
                                }}>
                                    <Icon name={'cloud-download-alt'} size={25} color="#3f51b5" />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                    <View style={tw`h-96`}>
                        <Text style={tw`text-lg`}>Keterangan</Text>
                        <WebView 
                            originWhitelist={['*']}
                            source={{ html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${detail_materi.keterangan}</body></html>` }}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}


export default DetailMateri