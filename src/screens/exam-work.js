import React, { useEffect, useState } from 'react'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailQuestion, getExamQuestionsEssay, getExamQuestionsPG, getExamResults, getExamResultsAnswer, getExamResultsDetail, updateExamResultsAnswer } from '../redux/actions/exam-actions';
import { customStyle } from '../utils/style';
import { baseUrl } from '../utils/global';
import ImageView from "react-native-image-viewing";
import RNFetchBlob from 'rn-fetch-blob';
import { getProfile } from '../redux/actions/auth-actions';
import { useIsFocused } from "@react-navigation/native";

const ExamWork = ({navigation, route}) => {
    const dispatch = useDispatch();
    const {id_ujian, id_siswa} = route.params;
    const isFocused = useIsFocused();

    const [imagesPeview, setImagePreview] = useState([]);
    const [previewVisible, setIsPreviewVisible] = useState(false);
    const [statusDownload, setStatusDownload] = useState(false);
    const [numberOfQuestion, setnumberOfQuestion] = useState('1');
    const [loadPage, setLoadPage] = useState(false);
    const [essayAnswer, setEssayAnswer] = useState('');

    const {exam_results_answer, exam_pg, exam_essay, detail_question} = useSelector((state) => state.examReducer);

    const loadData = () => {
        dispatch(getExamQuestionsPG(id_ujian, 1));
        dispatch(getExamQuestionsEssay(id_ujian, 2));
        if(exam_pg.length > 0){
            dispatch(getDetailQuestion(exam_pg[0].id));
            dispatch(getExamResultsAnswer(id_siswa, id_ujian, exam_pg[0].id));
        }
    }

    useEffect(() => {
        loadData();
    }, [isFocused]);

    const detailQuestion = (id) => {
        dispatch(getDetailQuestion(id));
        dispatch(getExamResultsAnswer(id_siswa, id_ujian, id));
    }

    const updateAnswer = (id, answer) => {
        dispatch(updateExamResultsAnswer({jawaban_siswa: answer}, id_siswa, id_ujian, id));
        dispatch(getExamResultsAnswer(id_siswa, id_ujian, id));
        dispatch(getExamQuestionsPG(id_ujian, 1));
        dispatch(getExamQuestionsEssay(id_ujian, 2));
    }

    const previewImage = (image) => {
        let listImage = [];
        listImage.push({uri: baseUrl + image});
        setImagePreview(listImage);
        setIsPreviewVisible(true);
    }

    const splitFile = (image) => {
        let arrImage = image.split(".");
        let status = false;
        if(arrImage[1] == "jpeg" || arrImage[1] == "jpg" || arrImage[1] == "png"){
            status = true;
        }
        return status;
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
                    console.log('Storage Permission Granted.');
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

    return loadPage ? (
        <View style={tw`flex-1 justify-center`}>
            <ActivityIndicator size="small" color="#03a9f4" />
        </View>
    ) : (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between bg-white items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center text-lg mr-5`}>Soal</Text>
                <View></View>
            </View>

            <ScrollView style={tw`h-full bg-white`}>
                <View style={tw`px-4 mt-4 mb-8`}>
                    {exam_pg.length > 0 && 
                        <View style={tw`mt-2`}>
                            <Text style={tw`mb-2`}>Soal pilihan ganda</Text>
                            <View style={tw`flex flex-row flex-wrap items-center`}>
                                {exam_pg.map((exam, index) => {
                                    return (
                                        <TouchableOpacity 
                                            key={index} 
                                            style={[customStyle.w15, tw`px-2`]}
                                            onPress={() => {
                                                detailQuestion(exam.id);
                                                setnumberOfQuestion(index + 1);
                                            }}
                                        >
                                            <Text style={tw`${exam.result.jawaban_siswa != null ? 'bg-green-500' : 'bg-gray-500' } text-white text-center p-2 rounded`}>{index + 1}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                    }

                    {exam_essay.length > 0 ? (
                        <View style={tw`mt-2`}>
                            <Text style={tw`mb-2`}>Soal essay</Text>
                            <View style={tw`flex flex-row flex-wrap items-center`}>
                                {exam_essay.map((exam, index) => {
                                    return (
                                        <TouchableOpacity 
                                            key={index} 
                                            style={[customStyle.w15, tw`px-2`]}
                                            onPress={() => {
                                                detailQuestion(exam.id);
                                                setnumberOfQuestion(index + 1);
                                            }}
                                        >
                                            <Text style={tw`${exam?.result?.jawaban_siswa != null ? 'bg-green-500' : 'bg-gray-500' } text-white text-center p-2 rounded`}>{index + 1}</Text>
                                        </TouchableOpacity>
                                        
                                    )
                                })}
                            </View>
                        </View>
                    ) : (
                        null
                    )}
                    
                    {exam_pg.length > 0 ? (
                        <View style={tw`my-4`}>    
                            {detail_question.length > 0 ? <Text style={tw`text-lg mb-2`}>{numberOfQuestion}. {detail_question.pertanyaan}</Text> : null}
                            <ImageView
                                images={imagesPeview}
                                imageIndex={0}
                                visible={previewVisible}
                                onRequestClose={() => setIsPreviewVisible(false)}
                            />
                            
                            <ScrollView horizontal={true} style={tw``}>
                                <View style={tw`flex flex-row justify-start mb-2 w-full h-20`}>
                                    {detail_question.detail.map((detail, index) => {
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
                            
                            {detail_question.id_jenis_soal == 1 ? (
                                <View>
                                    <TouchableOpacity 
                                        onPress={() => {
                                            updateAnswer(detail_question.id, 'a');
                                        }}
                                        style={tw`flex flex-row justify-between border-b border-gray-300 my-2 pb-1`}
                                    >
                                        <Text>a. {detail_question.pilihan_a}</Text>
                                        {exam_results_answer.jawaban_siswa === "a" && <Icon name={'check'} size={15} color="#2196f3" style={tw``} /> }
                                    </TouchableOpacity>
                                    
                                    
                                    <TouchableOpacity 
                                        onPress={() => {
                                            updateAnswer(detail_question.id, 'b');
                                        }}
                                        style={tw`flex flex-row justify-between border-b border-gray-300 mb-2 pb-1`}
                                    >
                                        <Text>b. {detail_question.pilihan_b}</Text>
                                        {exam_results_answer.jawaban_siswa === "b" && <Icon name={'check'} size={15} color="#2196f3" style={tw``} /> }
                                    </TouchableOpacity>
                                
                                    <TouchableOpacity 
                                        onPress={() => {
                                            updateAnswer(detail_question.id, 'c');
                                        }}
                                        style={tw`flex flex-row justify-between border-b border-gray-300 mb-2 pb-1`}
                                    >
                                        <Text>c. {detail_question.pilihan_c}</Text>
                                        {exam_results_answer.jawaban_siswa === "c" && <Icon name={'check'} size={15} color="#2196f3" style={tw``} /> }
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                        onPress={() => {
                                            updateAnswer(detail_question.id, 'd');
                                        }}
                                        style={tw`flex flex-row justify-between border-b border-gray-300 mb-2 pb-1`}
                                    >
                                        <Text>d. {detail_question.pilihan_d}</Text>
                                        {exam_results_answer.jawaban_siswa === "d" && <Icon name={'check'} size={15} color="#2196f3" style={tw``} /> }
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View>
                                    <Text style={tw`mb-1`}>Jawaban</Text>
                                    <TextInput
                                        style={tw`border border-gray-300 p-4`}
                                        multiline
                                        numberOfLines={4}
                                        onChangeText={text => setEssayAnswer(text)}
                                        value={exam_results_answer.jawaban_siswa}
                                    />
                                </View>
                            )}
                            
                        </View>
                    ) : (
                        null
                    )}
                    
                </View>
            </ScrollView>
            {detail_question.id_jenis_soal == 2 ? (
                <View style={tw`m-8`}>
                    <TouchableOpacity 
                        onPress={() => {
                            updateAnswer(detail_question.id, essayAnswer);
                        }}
                        style={tw`bg-green-500 rounded`}
                    >
                        <Text style={tw`text-white text-center p-3`}>Simpan</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                null
            )}
        </View>
    )
}

export default ExamWork