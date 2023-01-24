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
import Loader from '../components/loader';
import { getProfile } from '../redux/actions/auth-actions';
import VideoPlayer from 'react-native-video-player';

const DetailMateri = ({navigation, route}) => {
    const {id, mapel_name, schedule} = route.params;
    // const RNFetchBlob = NativeModules.RNFetchBlob;
    const isFocused = useIsFocused();
    
    const dispatch = useDispatch();
    const [fileUrl, setFileUrl] = useState(baseUrl + "/assets/images/example.png");

    const {load_materi, detail_materi} = useSelector((state) => state.materiReducer);
    const {load_auth, profile} = useSelector((state) => state.userReducer);

    const loadData = async() => {
        await dispatch(getDetailMateri(id));
        await dispatch(getProfile());
    }
    
    useEffect(() => {
        loadData();
    }, [isFocused]);

    console.log("profile : ", profile);

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

    return load_materi && load_auth ? (
        <Loader />
    ) : (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`py-2 px-4 rounded-full shadow bg-white`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>{mapel_name + ' - ' + detail_materi.judul}</Text>
                <View></View>
            </View>
            <ScrollView style={tw`h-full`}>
                <View style={tw`mt-4 px-4`}>
                    {profile.id_jabatan != 3 ? (
                        <View style={tw`flex flex-row justify-end items-center mb-8`}>
                            <TouchableOpacity onPress={() => navigation.navigate('EditMateri', { id: id})} style={tw`bg-teal-500 rounded`}>
                                <Text style={tw`text-white p-2`}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}

                    <Text style={tw`my-2 border-b border-gray-300 pb-1`}>Materi Gambar</Text>
                    {detail_materi?.detail_image?.map((detail, index) => {
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

                    <Text style={tw`my-2 border-b border-gray-300 pb-1`}>Materi Video</Text>
                    {detail_materi?.detail_video?.map((detail, index) => {
                        return (
                            <View key={index} style={tw`my-2`}>
                                <VideoPlayer
                                    video={{ uri: baseUrl + detail.name }}
                                    videoWidth={1600}
                                    videoHeight={900}
                                    thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                                />
                            </View>
                        )
                    })}

                    <View style={tw`h-96 my-4`}>
                        <Text style={tw`text-sm`}>Keterangan</Text>
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