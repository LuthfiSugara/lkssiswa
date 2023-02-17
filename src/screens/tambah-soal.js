import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View, PermissionsAndroid } from 'react-native'
import { customStyle } from '../utils/style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import tw from 'twrnc';
import { useDispatch, useSelector } from "react-redux";
import { getExamQuestionsEssay, getExamQuestionsPG } from '../redux/actions/exam-actions';
import { baseUrl } from '../utils/global';
import ImageView from "react-native-image-viewing";
import { useIsFocused } from "@react-navigation/native";
import RNFetchBlob from 'rn-fetch-blob';
import Loader from '../components/loader';

const TambahSoal = ({navigation, route}) => {
    const dispatch = useDispatch();
    const {id, id_jenis_ujian} = route.params;
    const isFocused = useIsFocused();

    const [soalName, setSoalName] = useState("");
    const [soal, setSoal] = useState("pg");
    const [imagesPeview, setImagePreview] = useState([]);
    const [previewVisible, setIsPreviewVisible] = useState(false);
    const [statusDownload, setStatusDownload] = useState(false);

    const {load_exam, exam_pg, exam_essay} = useSelector((state) => state.examReducer);

    const loadData = async() => {
        await dispatch(getExamQuestionsPG(id, 1));
        await dispatch(getExamQuestionsEssay(id, 2));
    }

    useEffect(() => {
        if(id_jenis_ujian == 1){
            setSoalName("Ulangan");
        }else if(id_jenis_ujian == 2){
            setSoalName("Latihan");
        }else if(id_jenis_ujian == 3){
            setSoalName("Tugas");
        }else{
            setSoalName("Kuis");
        }
        
        loadData();
    }, [isFocused]);

    const previewImage = (image) => {
        let listImage = [];
        listImage.push({uri: baseUrl + image});
        setImagePreview(listImage);
        setIsPreviewVisible(true);
    }

    const editSoal = (id, type) => {
        if(type == 'pg'){
            navigation.navigate('EditSoalPG', {
                id: id
            });
        }else{
            navigation.navigate('EditSoalEssay', {
                id: id
            });
        }
    }

    const splitFile = (image) => {
        let arrImage = image.split(".");
        let status = false;
        if(arrImage[1] == "jpeg" || arrImage[1] == "jpg" || arrImage[1] == "png"){
            status = true;
        }
        return status;
    }

    const getExtention = (image) => {
        let arrImage = image.split(".");
        let ext = arrImage[1];
        return ext;
    }

    const checkPermission = async (fileUrl) => {
    
        if (Platform.OS === 'ios') {
            downloadFile(fileUrl);
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
                    setStatusDownload(true);
                    downloadFile(fileUrl);
                    
                } else {
                    Alert.alert('Error','Storage Permission Not Granted');
                }
            } catch (err) {
                console.log("++++"+err);
            }
        }
    };
    
    const downloadFile = (fileUrl) => {
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
                '/Download/file_' + 
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
            Alert.alert('Download materi', 'Download Berhasil.');
            setStatusDownload(false);
        });
    };
    
    const getFileExtention = (fileUrl) => {
        return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
    };

    return load_exam ? (
        <Loader/>
    ) : (
        <View style={tw`bg-white h-full`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={[customStyle.shadow, tw`py-2 px-4 rounded-full`]} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>Tambah Soal {soalName}</Text>
                <Pressable onPress={() => {
                    Alert.alert(
                        "Selesai",
                        "Apakah anda yakin ?",
                        [
                            { text: "Tidak" },
                            { text: "Ya", onPress: () => {
                                navigation.goBack();
                            }}
                        ]
                    );
                }} style={tw`py-2 px-4 rounded-full`}>
                    <Icon name={'check'} size={20} color="#000000" />
                </Pressable>
            </View>

            <View style={tw`flex flex-row justify-between mt-4`}>
                <Pressable onPress={() => setSoal("pg")} style={tw`p-4 w-1/2`}>
                    <Text style={tw`w-full ${soal === "pg" ? "bg-teal-500" : "bg-gray-500"} p-2 rounded text-white text-center`}>Pilihan Ganda</Text>
                </Pressable>
                <Pressable onPress={() => setSoal("essay")}  style={tw`p-4 w-1/2`}>
                    <Text style={tw`w-full ${soal === "essay" ? "bg-teal-500" : "bg-gray-500"} p-2 rounded text-white text-center`}>Essay</Text>
                </Pressable>
            </View>

            <ScrollView  nestedScrollEnable={true}>
                <View style={tw`px-4 my-4`}>
                    {soal === "pg" ? (
                        <View>
                            {exam_pg.map((examPg, index) => {
                                return (
                                    <View style={tw`mb-4`} key={index}>
                                        <View style={tw`flex flex-row justify-between items-center mb-2`}>
                                            <Text style={[tw`mb-2`, customStyle.w85]}>{index + 1 + "."} {examPg.pertanyaan}</Text>
                                            <TouchableOpacity onPress={() => editSoal(examPg.id, 'pg')} style={[tw``, customStyle.w15]}>
                                                <Text style={tw`bg-teal-500 text-center text-white p-1 rounded`}>edit</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <ImageView
                                            key={index}
                                            images={imagesPeview}
                                            imageIndex={0}
                                            visible={previewVisible}
                                            onRequestClose={() => setIsPreviewVisible(false)}
                                        />
                                        {examPg.detail && examPg.detail.length > 0 && 
                                            <ScrollView horizontal={true} style={tw``}>
                                                <View style={tw`flex flex-row justify-start mb-2 w-full h-20`}>
                                                    {examPg.detail.map((detail, index) => {
                                                        return (
                                                            splitFile(detail.name) ? (
                                                                <TouchableOpacity onPress={() => previewImage(detail.name)} style={tw`px-2`} key={index}>
                                                                    <Image
                                                                        style={[customStyle.aspectSquare, tw`rounded w-1/3`]}
                                                                        source={{
                                                                            uri: baseUrl + detail.name,
                                                                        }}
                                                                    />
                                                                </TouchableOpacity>
                                                            ) : (
                                                                !statusDownload ? (
                                                                    <TouchableOpacity onPress={() => checkPermission(baseUrl + detail.name)} style={tw`px-2`} key={index}>
                                                                        <Image
                                                                            style={[customStyle.aspectSquare, tw`rounded w-1/3`]}
                                                                            source={require('../assets/images/file.jpg')}
                                                                        />
                                                                    </TouchableOpacity>
                                                                ) : (
                                                                    <View style={tw`w-1/3 px-2 bg-gray-200 rounded pt-7`} key={index}>
                                                                        <ActivityIndicator size="small" color="#03a9f4" />
                                                                    </View>
                                                                )
                                                            )
                                                        )
                                                    })}
                                                </View>
                                            </ScrollView>
                                        }
                                        <View style={tw`flex flex-row justify-between border-b border-gray-300 mb-2 pb-1`}>
                                            <Text>a. {examPg.pilihan_a}</Text>
                                            {examPg.jawaban === "a" && <Icon name={'check'} size={15} color="#14b8a6" style={tw``} /> }
                                        </View>
                                        <View style={tw`flex flex-row justify-between border-b border-gray-300 mb-2 pb-1`}>
                                            <Text>b. {examPg.pilihan_b}</Text>
                                            {examPg.jawaban === "b" && <Icon name={'check'} size={15} color="#14b8a6" style={tw``} /> }
                                        </View>
                                        <View style={tw`flex flex-row justify-between border-b border-gray-300 mb-2 pb-1`}>
                                            <Text>c. {examPg.pilihan_c}</Text>
                                            {examPg.jawaban === "c" && <Icon name={'check'} size={15} color="#14b8a6" style={tw``} /> }
                                        </View>
                                        <View style={tw`flex flex-row justify-between border-b border-gray-300 mb-2 pb-1`}>
                                            <Text>d. {examPg.pilihan_d}</Text>
                                            {examPg.jawaban === "d" && <Icon name={'check'} size={15} color="#14b8a6" style={tw``} /> }
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    ) : (
                        <View>
                            {exam_essay.map((essay, index) => {
                                return (
                                    <View key={index}>
                                        <View style={tw`flex flex-row`}>
                                            <Text style={[tw`my-2`, customStyle.w85]}>{index + 1 + "."} {essay.pertanyaan}</Text>
                                            <TouchableOpacity onPress={() => editSoal(essay.id, 'essay')} style={[tw``, customStyle.w15]}>
                                                <Text style={tw`bg-teal-500 text-center text-white p-1 rounded`}>edit</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <ImageView
                                            key={index}
                                            images={imagesPeview}
                                            imageIndex={0}
                                            visible={previewVisible}
                                            onRequestClose={() => setIsPreviewVisible(false)}
                                        />
                                        {essay.detail && essay.detail.length > 0 && 
                                            <ScrollView horizontal={true} style={tw``}>
                                                <View style={tw`flex flex-row justify-start mb-2 w-full h-20`}>
                                                    {essay.detail.map((detail, index) => {
                                                        return (
                                                            splitFile(detail.name) ? (
                                                                <TouchableOpacity onPress={() => previewImage(detail.name)} style={tw`px-2`} key={index}>
                                                                    <Image
                                                                        style={[customStyle.aspectSquare, tw`rounded w-1/3`]}
                                                                        source={{
                                                                            uri: baseUrl + detail.name,
                                                                        }}
                                                                    />
                                                                </TouchableOpacity>
                                                            ) : (
                                                                !statusDownload ? (
                                                                    <TouchableOpacity 
                                                                        onPress={() => checkPermission(baseUrl + detail.name)} 
                                                                        style={tw`w-1/3 px-2 bg-gray-400 rounded`} key={index}
                                                                    >
                                                                        <Image
                                                                            style={[customStyle.aspectSquare, tw`rounded w-1/3`]}
                                                                            source={require('../assets/images/file.jpg')}
                                                                        />
                                                                    </TouchableOpacity>
                                                                ) : (
                                                                    <View style={tw`w-1/3 px-2 bg-gray-400 rounded pt-7`} key={index}>
                                                                        <ActivityIndicator size="small" color="#0000ff" />
                                                                    </View>
                                                                )
                                                            )
                                                        )
                                                    })}
                                                </View>
                                            </ScrollView>
                                        }
                                    </View>
                                )
                            })}
                        </View>
                    )}
                </View>
                

            </ScrollView>
            <View style={tw`m-4`}>
                {soal === "pg" ? (
                    <TouchableOpacity onPress={() => navigation.navigate('TambahSoalPG', {id_ujian: id})} style={tw`w-full bg-teal-500 py-2 px-5 rounded `}>
                        <Text style={tw`text-white text-center`}>Tambah Soal Pilihan Ganda</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => navigation.navigate('TambahSoalEssay', {id_ujian: id})} style={tw`w-full bg-teal-500 py-2 px-5 rounded `}>
                        <Text style={tw`text-white text-center`}>Tambah Soal Essay</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default TambahSoal