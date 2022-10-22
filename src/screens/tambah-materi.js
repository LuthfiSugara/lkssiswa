import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Pressable, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView, Button, ActivityIndicator } from 'react-native';
import tw from "twrnc";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from "react-redux";
import { dataKelas, dataMapel } from '../redux/actions/setting-actions';
import {Picker} from '@react-native-picker/picker';
import { getTeacherById } from '../redux/actions/auth-actions';
import {
    actions,
    defaultActions,
    RichEditor,
    RichToolbar,
  } from "react-native-pell-rich-editor";
import DocumentPicker from "react-native-document-picker";
import { customStyle } from '../utils/style';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { addMateri } from '../redux/actions/materi-actions';
import Loader from '../components/loader';


const TambahMateri = ({navigation}) => {

    const dispatch = useDispatch();

    const {load_setting, data_mapel, data_kelas} = useSelector((state) => state.settingReducer);
    const {load_auth, teacher_by_id} = useSelector((state) => state.userReducer);

    const [step, setStep] = useState(1);
    const [idMapel, setIdMapel] = useState(data_mapel.length > 0 ? data_mapel[0].id : "");
    const [idKelas, setIdKelas] = useState(data_kelas.length > 0 ? data_kelas[0].id : "");
    const [idGuru, setIdGuru] = useState(teacher_by_id.length > 0 ? teacher_by_id[0].id_user : "");
    const [fileMateri, setFileMateri] = useState([]);
    const [loadBtn, setLoadBtn] = useState(false);
    const [teacherName, setTeacherName] = useState(teacher_by_id.length > 0 ? teacher_by_id[0].user.nama : "");


    const RichText = useRef();

    const loadData = async() => {
        await dispatch(dataMapel());
        await dispatch(dataKelas());
    }
    
    useEffect(() => {
        loadData();
    }, []);
    
    const loadTeacher = async() => {
        await dispatch(getTeacherById(idKelas, idMapel));
    }
    useEffect(() => {
        if(idMapel != "" && idKelas != ""){
            loadTeacher();
        }
    }, [idMapel, idKelas]);

    useEffect(() => {
        if(teacher_by_id.length > 0){
            setIdGuru(teacher_by_id[0].id_user);
            setTeacherName(teacher_by_id[0].user.nama);
        }
    }, [teacher_by_id]);

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pickMultiple({
                presentationStyle: 'fullScreen',
                type: [DocumentPicker.types.allFiles],
                allowMultiSelection: true,
            });
            setFileMateri(response);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const {values, setFieldValue, handleSubmit, handleReset, errors, touched} = useFormik({
        initialValues: {
            judul: '',
            keterangan: '',
            id_mapel: idMapel,
            id_kelas: idKelas,
            id_guru: idGuru,
        },
        onSubmit: values => {
            const formData = new FormData();
            formData.append('judul', values.judul);
            formData.append('keterangan', values.keterangan);
            formData.append('id_mapel', idMapel);
            formData.append('id_kelas', idKelas);
            formData.append('id_guru', idGuru);
            if(fileMateri.length > 0){
                for (let i = 0; i < fileMateri.length; i++) {
                    formData.append('file[]', {
                        uri: fileMateri[i].uri,
                        type: fileMateri[i].type,
                        name: fileMateri[i].name,
                    });
                }
            }

            dispatch(addMateri(formData))
            .then(response => {
                if(response.status === "success"){
                    navigation.goBack();
                }
            })
        },
        validationSchema: Yup.object().shape({
            judul: Yup
                .string()
                .required("Tidak boleh kosong!"),
            keterangan: Yup
                .string()
                .required("Tidak boleh kosong!"),
        }),
    });

    return load_auth && load_setting ? (
        <Loader />
    ) : (
        <View style={tw`bg-white h-full`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => {
                    step == 1 ? navigation.goBack() : setStep(1)
                }}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>Tambah Materi</Text>
                <View></View>
            </View>
            
            {step == 1 ? (
                <View style={tw`px-4 mt-8`}>
                    <View style={tw`mb-4`}>
                        <Text style={tw`mb-1`}>Pilih Mata Pelajaran</Text>
                        <Picker
                            style={tw`shadow bg-white`}
                            selectedValue={idMapel}
                            onValueChange={(itemValue, itemIndex) =>
                                setIdMapel(itemValue)
                            }>
                                {data_mapel.map((mapel, index) => {
                                    return (
                                        <Picker.Item label={mapel.name} value={mapel.id} key={index} />
                                    )
                                })}
                        </Picker>
                    </View>
                    
                    <View style={tw`mb-4`}>
                        <Text style={tw`mb-1`}>Pilih Kelas</Text>
                        <Picker
                            style={tw`shadow bg-white`}
                            selectedValue={idKelas}
                            onValueChange={(itemValue, itemIndex) =>
                                setIdKelas(itemValue)
                            }>
                                {data_kelas.map((kelas, index) => {
                                    return (
                                        <Picker.Item label={kelas.name} value={kelas.id} key={index} />
                                    )
                                })}
                        </Picker>
                    </View>
                    
                    {teacher_by_id.length > 0 ? (
                        <View style={tw`mb-4`}>
                            <Text style={tw`mb-1`}>Pilih Guru</Text>
                            <Picker
                                style={tw`shadow bg-white`}
                                selectedValue={idGuru}
                                onValueChange={(itemValue, itemIndex) =>
                                    setIdGuru(itemValue)
                                }>
                                    {teacher_by_id.map((guru, index) => {
                                        return (
                                            <Picker.Item label={guru.user.nama} value={guru.id_user} key={index} />
                                        )
                                    })}
                            </Picker>
                        </View>
                    ) : (
                        null
                    )}

                    {teacher_by_id.length < 1 || idKelas == "" || idMapel == "" ? (
                        <TouchableOpacity style={tw`bg-gray-500 py-2 rounded-lg mt-4`}>
                            <Text style={tw`text-white text-center text-lg`}>Lanjut</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => setStep(2)} style={tw`bg-teal-500 py-2 rounded-lg mt-4`}>
                            <Text style={tw`text-white text-center text-lg`}>Lanjut</Text>
                        </TouchableOpacity>
                    )}            

                </View>
            ) : (
                <ScrollView style={tw`px-4 mt-8 h-full`}>
                    <View>
                        <View style={tw`mb-4`}>
                            <Text style={tw`mb-1 text-gray-800`}>Judul</Text>
                            <TextInput 
                                value={values.judul}
                                onChangeText={(event) => setFieldValue('judul', event)}
                                style={tw`border border-gray-300 pl-2 w-full`}
                            />
                            {touched.judul && errors.judul &&
                                <Text style={tw`text-xs text-red-600`}>{errors.judul}</Text>
                            }
                        </View>

                        <View style={tw`mb-4`}>
                            <Text style={tw`mb-1 text-gray-800`}>Materi</Text>
                            <TouchableOpacity onPress={handleDocumentSelection} style={[tw`w-full bg-blue-800 p-8 rounded flex flex-col items-center`, customStyle.bgDarkBlue]}>
                                <Icon name={'folder-plus'} size={35} color="#ffffff" />
                                <Text style={tw`text-white font-bold`}>Upload file</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`mb-4`}>
                            <ScrollView >
                                <Text style={tw`mb-1 text-gray-800`}>Keterangan</Text>
                                {touched.keterangan && errors.keterangan &&
                                    <Text style={tw`text-xs text-red-600`}>{errors.keterangan}</Text>
                                }
                                <RichToolbar
                                    style={[styles.richBar]}
                                    editor={RichText}
                                    disabled={false}
                                    iconTint={"black"}
                                    selectedIconTint={"blue"}
                                    disabledIconTint={"red"}
                                    iconSize={20}
                                    actions={[
                                        ...defaultActions,
                                        actions.heading1,
                                        actions.heading2,
                                        actions.heading3,
                                    ]}
                                    iconMap={{
                                        [actions.heading1]: ({ tintColor }) => (
                                            <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
                                        ),
                                        [actions.heading2]: ({ tintColor }) => (
                                            <Text style={[styles.tib, { color: tintColor }]}>H2</Text>
                                        ),
                                        [actions.heading3]: ({ tintColor }) => (
                                            <Text style={[styles.tib, { color: tintColor }]}>H3</Text>
                                        ),
                                    }}
                                />
                                <RichEditor
                                    disabled={false}
                                    containerStyle={styles.editor}
                                    ref={RichText}
                                    style={styles.rich}
                                    placeholder={"Keterangan Materi"}
                                    onChange={(text) => setFieldValue('keterangan', text)}
                                />
                                
                            </ScrollView>
                            <Text style={styles.text}></Text>
                        </View>
                    </View>
                    
                </ScrollView>
            )}
            {step == 2 && <View style={[tw`px-4 mb-4`, customStyle.fixedBottom]}>
                {loadBtn ? (
                    <TouchableOpacity style={tw`w-full bg-teal-500 p-2 rounded`}>
                        <ActivityIndicator color={"#ffffff"} />
                    </TouchableOpacity>

                ) : (
                    <TouchableOpacity onPress={() => {
                        handleSubmit();
                        setLoadBtn(true);
                    }} style={tw`w-full bg-teal-500 p-2 rounded`}>
                        <Text style={tw`text-center text-white text-lg`}>Tambah Materi</Text>
                    </TouchableOpacity>
                )}
            </View>}
            
        </View>
    )
}

const styles = StyleSheet.create({
    /********************************/
    /* styles for html tags */
    a: {
      fontWeight: "bold",
      color: "purple",
    },
    div: {
      fontFamily: "monospace",
    },
    p: {
      fontSize: 30,
    },
    /*******************************/
    container: {
      flex: 1,
      marginTop: 40,
      backgroundColor: "#F5FCFF",
    //   height: 500,
    },
    editor: {
      backgroundColor: "black",
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 3,
    //   minHeight: 300,
    //   height: 500,
    },
    rich: {
        // minHeight: 400,
        height: 200,
        flex: 1,
    },
    richBar: {
        minHeight: 50,
        height: 50,
        backgroundColor: "#F5FCFF",
    },
    text: {
      fontWeight: "bold",
      fontSize: 20,
    },
    tib: {
      textAlign: "left",
      color: "#515156",
    },
  });

export default TambahMateri