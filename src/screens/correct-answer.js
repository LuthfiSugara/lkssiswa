import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, PermissionsAndroid, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import { correctStudentAnswer, detailAnswer, detailScore, getLocationExam, updateDetailAnswer, updateStudentScore } from '../redux/actions/exam-actions';
import DocumentPicker from "react-native-document-picker";
import { isImage } from '../utils/function';
import { customStyle } from '../utils/style';
import { baseUrl } from '../utils/global';
import ImageView from "react-native-image-viewing";
import RNFetchBlob from 'rn-fetch-blob';
import Loader from '../components/loader';

const CorrectAnswer = ({navigation, route}) => {
    const {id_ujian, id_siswa} = route.params;

    const dispatch = useDispatch();

    
    const [pgQuestion, setPgQuesetion] = useState([]);
    const [essayQuestion, setEssayQuesetion] = useState([]);
    const [questionType, setQuestionType] = useState(1);
    const [question, setQuestion] = useState([]);
    const [fileSoal, setFileSoal] = useState([]);
    const [imagesPeview, setImagePreview] = useState([]);
    const [previewVisible, setIsPreviewVisible] = useState(false);
    const [indexQuestion, setIndexQuestion] = useState(1);
    const [statusDownload, setStatusDownload] = useState(false);
    const [updateAnswer, setUpdateAnswer] = useState("");
    const [updateAnswerModal, setUpdateAnswerModal] = useState(false);
    const [nilaiSiswa, setNilaiSiswa] = useState(0);
    const [locationName, setLocationName] = useState("");
    
    const {load_exam, correct_student_answer, detail_score, detail_answer} = useSelector((state) => state.examReducer);

    const loadData = async() => {
        await dispatch(correctStudentAnswer(id_ujian));
        await dispatch(detailScore(id_ujian, id_siswa));
        const loadLocation = await dispatch(getLocationExam(id_ujian, id_siswa));
        if(loadLocation.status == 'success'){
            setLocationName(loadLocation.data.detail.name);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if(Object.keys(detail_score).length > 0){
            setNilaiSiswa(detail_score.nilai);
        }
    }, [detail_score]);

    useEffect(() => {
        if(Object.keys(correct_student_answer).length > 0){
            setPgQuesetion(correct_student_answer.pg);
            setEssayQuesetion(correct_student_answer.essay);
            setQuestion(correct_student_answer.pg[0]);
            setQuestionType(correct_student_answer.pg[0].id_jenis_soal);
            dispatch(detailAnswer(id_ujian, id_siswa, correct_student_answer.pg[0].id));
        }
    }, [correct_student_answer]);

    const renderQuestion = (index, type, question) => {
        setIndexQuestion(index);
        setQuestionType(type);
        setQuestion(question);
        dispatch(detailAnswer(id_ujian, id_siswa, question.id)).then(response => {
            if(response.status === "success"){
                setUpdateAnswer(response.data.koreksi_jawaban);
            }
        });
    }

    const previewImage = (image) => {
        let listImage = [];
        listImage.push({uri: baseUrl + image});
        setImagePreview(listImage);
        setIsPreviewVisible(true);
    }

    const updateCorrectAnswer = () => {
        if(updateAnswer == "" || updateAnswer == null){
            Alert.alert('Error', 'Koreksi jawaban tidak boleh kosong!');
        }else{
            let data = {
                id_ujian: id_ujian,
                id_siswa: id_siswa,
                id_soal: question.id,
                koreksi_jawaban: updateAnswer,
            }
            
            dispatch(updateDetailAnswer(data));
        }
    }

    const hideUpdateAnswerModal = () => {
        setUpdateAnswerModal(false);
    }

    const updateNilaiSiswa = () => {
        let data = {
            id_ujian: id_ujian,
            id_siswa: id_siswa,
            nilai: nilaiSiswa
        }
        let res = dispatch(updateStudentScore(data))
        .then(response => {
            if(response.status === "success"){
                navigation.goBack();
            }
        })
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
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`py-2 px-4 rounded-full shadow bg-white`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>Koreksi Jawaban</Text>
                <TouchableOpacity 
                    onPress={() => { setUpdateAnswerModal(true) }}
                    style={tw`px-2`}
                >
                    <Icon name={'check'} size={20} color="#000000" />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={tw`px-4 mb-8`}>
                    <Text style={tw`mt-4 text-sm`}>Lokasi : {locationName}</Text>
                    <Text style={tw`mt-4 text-sm`}>Nama : {correct_student_answer.name}</Text>
                    <Text style={tw`my-2 text-sm`}>Nilai : {detail_score.nilai}</Text>

                    <Text style={tw`mt-3`}>Soal Pilihan Ganda</Text>
                    <View style={tw`flex flex-row items-center my-3`}>
                        {pgQuestion.map((pg, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => renderQuestion(index + 1, pg.id_jenis_soal, pg)}
                                >
                                    <Text style={tw`bg-teal-500 text-white mr-2 px-3 py-2 rounded`}>{index + 1}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    <Text style={tw`mt-3`}>Soal Essay</Text>
                    <View style={tw`flex flex-row items-center my-3`}>
                        {essayQuestion.map((essay, index) => {
                            return (
                                <TouchableOpacity 
                                    key={index}
                                    onPress={() => renderQuestion(index + 1, essay.id_jenis_soal, essay)}
                                >
                                    <Text style={tw`bg-teal-500 text-white mr-2 px-3 py-2 rounded`}>{index + 1}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    <View style={tw``}>
                        <Text style={tw`my-4`}>{indexQuestion}. {question.pertanyaan}</Text>
                        {questionType == 1 &&
                            <View>
                                <View style={tw`flex flex-row justify-between border-b border-gray-300 my-2`}>
                                    <Text>a. {question.pilihan_a}</Text>
                                    {detail_answer.jawaban_siswa == 'a' && <Icon name={'check'} size={12} color="#000000" />}
                                </View>
                                <View style={tw`flex flex-row justify-between border-b border-gray-300 my-2`}>
                                    <Text>b. {question.pilihan_b}</Text>
                                    {detail_answer.jawaban_siswa == 'b' && <Icon name={'check'} size={12} color="#000000" />}
                                </View>
                                <View style={tw`flex flex-row justify-between border-b border-gray-300 my-2`}>
                                    <Text>c. {question.pilihan_c}</Text>
                                    {detail_answer.jawaban_siswa == 'c' && <Icon name={'check'} size={12} color="#000000" />}
                                </View>
                                <View style={tw`flex flex-row justify-between border-b border-gray-300 my-2`}>
                                    <Text>d. {question.pilihan_d}</Text>
                                    {detail_answer.jawaban_siswa == 'd' && <Icon name={'check'} size={12} color="#000000" />}
                                </View>
                            </View>
                        }
                        <ImageView
                            images={imagesPeview}
                            imageIndex={0}
                            visible={previewVisible}
                            onRequestClose={() => setIsPreviewVisible(false)}
                        />
                        {question.detail && 
                            <ScrollView horizontal={true} style={tw` my-3`}>
                                <View style={tw`flex flex-row justify-start mb-2 w-full h-20`}>
                                    {question.detail.map((detail, index) => {
                                        return (
                                            isImage(detail.name) ? (
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
                                                    <View style={tw`w-20 px-2 bg-gray-200 rounded pt-7`} key={index}>
                                                        <ActivityIndicator size="small" color="#03a9f4" />
                                                    </View>
                                                )
                                            )
                                        )
                                    })}
                                </View>
                            </ScrollView>
                        }

                        <Text>Jawaban Siswa : </Text>
                        {questionType == 1 ? (
                            <Text>{detail_answer.jawaban_siswa == 'a' ? (
                                'a. ' + question.pilihan_a
                            ) : detail_answer.jawaban_siswa == 'b' ? (
                                'b. ' + question.pilihan_b
                            ) : detail_answer.jawaban_siswa == 'c' ? (
                                'c. ' + question.pilihan_c
                            ) : detail_answer.jawaban_siswa == 'd' ? (
                                'd. ' + question.pilihan_d
                            ) : null}</Text>
                        ) : (
                            <Text>{detail_answer.jawaban_siswa}</Text>
                        )}
                         
                        {questionType == 2 ? (
                            <View>
                                <Text style={tw`mt-3 mb-1`}>Koreksi Jawaban : </Text>
                                <TextInput
                                    multiline
                                    numberOfLines={4}
                                    onChangeText={e => setUpdateAnswer(e)}
                                    value={updateAnswer}
                                    style={tw`border border-gray-300 rounded p-2`}
                                />
                                
                                <TouchableOpacity 
                                    onPress={() => updateCorrectAnswer()}
                                    style={tw`bg-teal-500 mt-3 p-3 rounded`}
                                >
                                    <Text style={tw`text-center text-white`}>Koreksi jawaban</Text>
                                </TouchableOpacity>
                                
                            </View>
                        ) : null}
                    </View>
                </View>
            </ScrollView>

            <Modal
              animationType="slide"
              transparent={true}
              visible={updateAnswerModal}
              onRequestClose={() => {
                setUpdateAnswerModal(false);
              }}
          >
              <View style={customStyle.centeredView}>
                <View style={customStyle.modalView}>
                    <Text style={tw`text-xl font-bold mb-4`}>Nilai Siswa</Text>
                    <View style={tw`w-full mb-4`}>
                      <TextInput
                        onChangeText={(e => setNilaiSiswa(e))}
                        value={String(nilaiSiswa)}
                        style={tw`w-full border border-gray-400 rounded-lg px-4`}
                        keyboardType="numeric"
                      />
                      {nilaiSiswa === "" ? (
                        <Text style={tw`text-red-500`}>Tidak boleh kosong</Text>
                      ) : null}
                    </View>

                    <View style={tw`flex flex-row`}>
                      <TouchableOpacity 
                        onPress={hideUpdateAnswerModal}
                        style={tw`bg-gray-500 p-2 w-2/5 rounded-lg mr-1`}
                      >
                        <Text style={tw`text-white text-center text-lg`}>Batal</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                            updateNilaiSiswa();
                        }}
                        style={tw`bg-teal-500 p-2 w-2/5 rounded-lg ml-1`}
                      >
                        <Text style={tw`text-white text-center text-lg`}>Simpan</Text>
                      </TouchableOpacity>
                    </View>

                </View>
              </View>
          </Modal>
        </View>
    )
}

export default CorrectAnswer