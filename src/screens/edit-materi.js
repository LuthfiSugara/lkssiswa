import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from "react-redux";
import { deleteFileMateri, getDetailMateri, updateMateri } from '../redux/actions/materi-actions';
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

const EditMateri = ({navigation, route}) => {
    const {id} = route.params;
    const dispatch = useDispatch();
    const RichText = useRef();
    const [fileMateri, setFileMateri] = useState([]);
    const [loadBtn, setLoadBtn] = useState(false);

    const {loading, detail_materi} = useSelector((state) => state.materiReducer);

    const loadData = async() => {
        await dispatch(getDetailMateri(id));
    }
    
    useEffect(() => {
        loadData();
    }, []);

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
            judul: detail_materi.judul,
            keterangan: detail_materi.keterangan,
        },
        onSubmit: values => {
            const formData = new FormData();
            formData.append('judul', values.judul);
            formData.append('keterangan', values.keterangan);
            if(fileMateri.length > 0){
                for (let i = 0; i < fileMateri.length; i++) {
                    formData.append('file[]', {
                        uri: fileMateri[i].uri,
                        type: fileMateri[i].type,
                        name: fileMateri[i].name,
                    });
                }
            }
            
            dispatch(updateMateri(formData, id))
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

    const triggerDeleteFileMateri = (id) => {
        dispatch(deleteFileMateri(id))
        .then(response => {
            if(response.status === "success"){
                loadData();
            }
        })
    }

    return (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`py-2 px-4 rounded-full shadow bg-white`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center text-lg mr-5`}>Edit Materi</Text>
                <View></View>
            </View>

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
                        <Text style={tw`mb-2 text-gray-800`}>Materi</Text>
                        {detail_materi?.detail.map((detail, index) => {
                            return (
                                <TouchableOpacity 
                                    key={index} 
                                    style={tw`flex flex-row justify-between border-b border-gray-300 mb-2 pb-1`}
                                    onPress={() => {
                                        Alert.alert(
                                            "Hapus file materi",
                                            "Apakah anda yakin ?",
                                            [
                                                { text: "Tidak" },
                                                { text: "Ya", onPress: () => {
                                                    triggerDeleteFileMateri(detail.id)
                                                }}
                                            ]
                                        );
                                    }}
                                >
                                    <Text>{detail_materi.judul} {"bagian-"} {index + 1}</Text>
                                    <Icon name={'trash-alt'} size={20} color="#000000" style={tw`px-2`} />
                                </TouchableOpacity>
                            )
                        })}
                        <TouchableOpacity onPress={handleDocumentSelection} style={[tw`w-full bg-blue-800 p-8 mt-4 rounded flex flex-col items-center`, customStyle.bgDarkBlue]}>
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
                                initialContentHTML={values.keterangan}
                                onChange={(text) => setFieldValue('keterangan', text)}
                            />
                            
                        </ScrollView>
                        <Text style={styles.text}></Text>
                    </View>
                </View>
                
            </ScrollView>
            <View style={tw`m-4`}>
                {loadBtn ? (
                    <TouchableOpacity style={tw`w-full bg-blue-500 p-2 rounded`}>
                        <ActivityIndicator color={"#ffffff"} />
                    </TouchableOpacity>

                ) : (
                    <TouchableOpacity onPress={() => {
                        handleSubmit();
                        setLoadBtn(true);
                    }} style={tw`w-full bg-blue-500 p-2 rounded`}>
                        <Text style={tw`text-center text-white text-lg`}>Simpan</Text>
                    </TouchableOpacity>
                )}
            </View>
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

export default EditMateri