import React, { useEffect, useState, useRef } from 'react'
import { Pressable, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
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

const TambahMateri = ({navigation}) => {

    const dispatch = useDispatch();

    const {loading, data_mapel, data_kelas} = useSelector((state) => state.settingReducer);
    const {teacher_by_id} = useSelector((state) => state.userReducer);

    const [step, setStep] = useState(1);
    const [idMapel, setIdMapel] = useState(data_mapel.length > 0 ? data_mapel[0].id : "");
    const [idKelas, setIdKelas] = useState(data_kelas.length > 0 ? data_kelas[0].id : "");
    const [idGuru, setIdGuru] = useState(teacher_by_id.length > 0 ? teacher_by_id[0].id_user : "");

    // const strikethrough = require("./assets/strikethrough.png"); //icon for strikethrough
    // const video = require("./assets/video.png"); //icon for Addvideo
    const RichText = useRef(); //reference to the RichEditor component
    const [article, setArticle] = useState("");

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
            console.log("load");
            loadTeacher();
        }
    }, [idMapel, idKelas]);
    
    // this function will be called when the editor has been initialized
    function editorInitializedCallback() {
        RichText.current?.registerToolbar(function (items) {
        // items contain all the actions that are currently active
        console.log(
            "Toolbar click, selected items (insert end callback):",
            items
        );
        });
    }

    return (
        <View style={tw`bg-white h-full`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => {
                    step == 1 ? navigation.goBack() : setStep(2)
                }}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center text-lg mr-5`}>Tambah Materi</Text>
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
                    {teacher_by_id.length < 1 || idKelas == "" || idMapel == "" ? (
                        <TouchableOpacity style={tw`bg-gray-500 py-2 rounded-lg mt-4`}>
                            <Text style={tw`text-white text-center text-lg`}>Lanjut</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => setStep(2)} style={tw`bg-blue-500 py-2 rounded-lg mt-4`}>
                            <Text style={tw`text-white text-center text-lg`}>Lanjut</Text>
                        </TouchableOpacity>
                    )}            

                </View>
            ) : (
                <ScrollView style={tw`px-4 mt-8 h-full`}>
                    <View style={tw`mb-4`}>
                        <Text style={tw`mb-1 text-gray-800`}>Judul</Text>
                        <TextInput 
                            value="asd"
                            // onChangeText={(event) => setFieldValue('nama', event)}
                            style={tw`border border-gray-300 pl-2 w-full`}
                        />
                    </View>
                    <View style={tw`mb-4`}>
                        <ScrollView >
                            <Text style={styles.text}>Editor</Text>

                            <RichToolbar
                                style={[styles.richBar]}
                                editor={RichText}
                                disabled={false}
                                iconTint={"black"}
                                selectedIconTint={"blue"}
                                disabledIconTint={"red"}
                                // onPressAddImage={onPressAddImage}
                                iconSize={20}
                                actions={[
                                    // "insertVideo",
                                    ...defaultActions,
                                    // actions.setStrikethrough,
                                    actions.heading1,
                                ]}
                                // map icons for self made actions
                                iconMap={{
                                    [actions.heading1]: ({ tintColor }) => (
                                        <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
                                    ),
                                    // [actions.setStrikethrough]: strikethrough,
                                    // ["insertVideo"]: video,
                                }}
                                // insertVideo={insertVideo}
                            />
                            <RichEditor
                                disabled={false}
                                containerStyle={styles.editor}
                                ref={RichText}
                                style={styles.rich}
                                placeholder={"Start Writing Here"}
                                onChange={(text) => setArticle(text)}
                                editorInitializedCallback={editorInitializedCallback}
                                // onHeightChange={handleHeightChange}
                            />
                            
                        </ScrollView>
                        <Text style={styles.text}>{article}</Text>
                    </View>
                </ScrollView>
            )}
            
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
      borderColor: "black",
      borderWidth: 1,
    //   minHeight: 100,
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