import React, { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import tw from 'twrnc';
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import DateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from "react-native-raw-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { dataKelas, dataJK, dataJabatan } from "../redux/actions/setting-actions";
import { format } from "date-fns";
import { editProfileUser, getDetailUser, register } from "../redux/actions/auth-actions";
import {launchImageLibrary} from 'react-native-image-picker';


const options = {
    title: "Select Image",
    type: 'library',
    options: {
        mediaType: 'photo',
        maxWidth: 200,
        maxHeight: 200,
        includeBase64: false,
        selectionLimit: 1,
    }
}

const EditUser = ({navigation, route}) => {

    const dispatch = useDispatch();
    const refRBSheet = useRef();
    const { userId } = route.params;
    
    const {loading, data_kelas, data_jk, data_jabatan} = useSelector((state) => state.settingReducer);
    const {detail_user} = useSelector((state) => state.userReducer);

    const loadData = async() => {
        await dispatch(dataKelas());
        await dispatch(dataJK());
        await dispatch(dataJabatan());
        await dispatch(getDetailUser(userId));
    }

    useEffect(() => {
        loadData();
    }, []);

    const [namaLengkap, setNamaLengkap] = useState(detail_user.nama_lengkap);
    const [username, setUsername] = useState(detail_user.username);
    const [password, setPassword] = useState("");
    const [noHp, setNoHp] = useState(detail_user.no_hp);
    const [date, setDate] = useState(new Date());
    const [select, setSelected] = useState("");
    const [selectJK, setSelectJK] = useState("jk-" + detail_user.id_jenis_kelamin);
    const [jk, setJK] = useState(detail_user.id_jenis_kelamin);
    const [jkName, setJKName] = useState(detail_user.jenis_kelamin.name);
    const [selectJabatan, setSelectJabatan] = useState("jabatan-" + detail_user.id_jabatan);
    const [jabatan, setJabatan] = useState(detail_user.id_jabatan);
    const [jabatanName, setJabatanName] = useState(detail_user.jabatan.name);
    const [selectKelas, setSelectKelas] = useState("kelas-" + detail_user.id_kelas);
    const [kelas, setKelas] = useState(detail_user.id_kelas);
    const [kelasName, setKelasName] = useState(detail_user.kelas.name);
    const [tglLahir, setTglLahir] = useState(detail_user.tanggal_lahir);
    const [showDate, setShowDate] = useState(false);
    const [foto, setFoto] = useState(null);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setTglLahir(format(new Date(currentDate), 'yyyy/MM/dd'));
        setShowDate(false);
    };

    const showDatepicker = () => {
        setShowDate(true);
    };

    const onSelectBottomSheet = (select) => {
        setSelected(select);
        refRBSheet.current.open();
    }

    const openGallery = async () => {
        const images = await launchImageLibrary(options);
        setFoto(images);
        
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={tw`flex flex-row justify-between items-center p-2`}>
                    <Pressable 
                        style={[styles.shadow, tw`py-2 px-4 rounded-full`]} 
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name={'angle-left'} size={25} color="#000000" />
                    </Pressable>
                    <Text style={tw`text-center text-lg mr-5`}>Edit User</Text>
                    <View></View>
                </View>
                <View>
                    <Formik
                        initialValues={{ 
                            nama_lengkap: '',
                            username: '',
                            password: '',
                            tanggal_lahir: '',
                            no_hp: '',
                            id_jenis_kelamin: '',
                            id_jabatan: '',
                            id_kelas: '',
                            foto: '',

                        }}
                        onSubmit={(values) => {
                            const formData = new FormData();
                            formData.append('nama_lengkap', namaLengkap);
                            formData.append('username', username);
                            if(password != ""){
                                formData.append('password', password);
                            }
                            formData.append('tanggal_lahir', tglLahir);
                            formData.append('no_hp', noHp);
                            formData.append('id_jenis_kelamin', jk);
                            formData.append('id_jabatan', jabatan);
                            formData.append('id_kelas', kelas);
                            if(foto != null){
                                formData.append('foto', {
                                    uri: foto.assets[0].uri,
                                    type: foto.assets[0].type,
                                    name: foto.assets[0].fileName,
                                })
                            }

                            const result = dispatch(editProfileUser(userId, formData))
                            .then(response => {
                                console.log("res : ", response);
                                if(response.status === "success"){
                                    navigation.goBack();
                                }
                            })
                            .catch(err => console.log(err));
                        }}
                        validationSchema={Yup.object().shape({
                            // nama_lengkap: Yup
                            //     .string()
                            //     .required("Tidak boleh kosong!"),
                            // username: Yup
                            //     .string()
                            //     .required("Tidak boleh kosong!"),
                            // password: Yup
                            //     .string()
                            //     .min(6, "Minimal 6 karakter")
                            //     .required("Tidak boleh kosong"),
                            // no_hp: Yup
                            //     .string()
                            //     .required("Tidak boleh kosong!"),
                        })}
                    >
                        {({ values, handleChange, errors, setFieldTouched, setFieldValue, touched, isValid, handleSubmit }) => (
                        <View style={tw`px-4 my-10`}>
                            <View style={tw`mb-4`}>
                                <Text>Nama Lengkap</Text>
                                <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                                    <Icon name={'address-book'} size={20} color="#0096FF" style={tw`px-4`} />
                                    <TextInput
                                        value={namaLengkap}
                                        onChangeText={(e) => setNamaLengkap(e)}
                                        onBlur={() => {
                                            setFieldTouched('nama_lengkap')
                                            // setNamaLengkap(values.nama_lengkap);
                                        }}
                                        style={tw`border-l border-gray-300 pl-2`}
                                    />
                                </View>
                                {touched.nama_lengkap && errors.nama_lengkap &&
                                    <Text style={tw`text-xs text-red-600`}>{errors.nama_lengkap}</Text>
                                }
                            </View>   

                            <View style={tw`mb-4`}>
                                <Text>Username</Text>
                                <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                                    <Icon name={'user-cog'} size={20} color="#0096FF" style={tw`px-3`} />
                                    <TextInput
                                        value={username}
                                        onChangeText={(e) => setUsername(e)}
                                        onBlur={() => {
                                            setFieldTouched('username')
                                            // setUsername(values.username);
                                        }}
                                        style={tw`border-l border-gray-300 pl-2`}
                                    />
                                </View>
                                {touched.username && errors.username &&
                                    <Text style={tw`text-xs text-red-600`}>{errors.username}</Text>
                                }
                            </View>    
                            
                            <View style={tw`mb-4`}>
                                <Text>Password</Text>
                                <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                                    <Icon name={'lock'} size={20} color="#0096FF" style={tw`px-4`} />
                                    <TextInput
                                        value={password}
                                        onChangeText={(e) => setPassword(e)}
                                        onBlur={() => {
                                            setFieldTouched('password')
                                            // setPassword(values.password)
                                        }}
                                        secureTextEntry
                                        style={tw`border-l border-gray-300 pl-2`}
                                    />
                                </View>
                                {touched.password && errors.password &&
                                    <Text style={tw`text-xs text-red-600`}>{errors.password}</Text>
                                }
                            </View>

                            <View style={tw`mb-4`}>
                                <Text>Tanggal Lahir</Text>
                                <Pressable
                                    onPress={showDatepicker}
                                    style={tw`flex flex-row border border-gray-300 rounded-md items-center`}
                                >
                                    <Icon name={'calendar-check'} size={20} color="#0096FF" style={tw`px-4`} />
                                    <Text style={tw`border-l border-gray-300 p-4`}>{tglLahir}</Text>
                                </Pressable>
                                {touched.tanggal_lahir && errors.tanggal_lahir &&
                                    <Text style={tw`text-xs text-red-600`}>{errors.tanggal_lahir}</Text>
                                }
                            </View>
                            
                            <View style={tw`mb-4`}>
                                <Text>Nomor Handphone</Text>
                                <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                                    <Icon name={'phone'} size={20} color="#0096FF" style={tw`px-4`} />
                                    <TextInput
                                        value={noHp}
                                        onChangeText={(e) => setNoHp(e)}
                                        onBlur={() => {
                                            setFieldTouched('no_hp')
                                            // setNoHp(values.no_hp)
                                        }}
                                        style={tw`border-l border-gray-300 pl-2`}
                                    />
                                </View>
                                {touched.no_hp && errors.no_hp &&
                                    <Text style={tw`text-xs text-red-600`}>{errors.no_hp}</Text>
                                }
                            </View>

                            <View style={tw`mb-4`}>
                                <Text>Jenis Kelamin</Text>
                                <Pressable 
                                    onPress={() => onSelectBottomSheet("jk")} 
                                    style={tw`flex flex-row border border-gray-300 rounded-md items-center`}
                                >
                                    <Icon name={'venus-mars'} size={20} color="#0096FF" style={tw`px-4`} />
                                    <Text style={tw`border-l border-gray-300 p-4`}>{jkName}</Text>
                                </Pressable>
                                {touched.id_jenis_kelamin && errors.id_jenis_kelamin &&
                                    <Text style={tw`text-xs text-red-600`}>{errors.id_jenis_kelamin}</Text>
                                }
                            </View>
                            
                            <View style={tw`mb-4`}>
                                <Text>Jabatan</Text>
                                <Pressable 
                                    onPress={() => onSelectBottomSheet("jabatan")} 
                                    style={tw`flex flex-row border border-gray-300 rounded-md items-center`}
                                >
                                    <Icon name={'id-badge'} size={20} color="#0096FF" style={tw`px-4`} />
                                    <Text style={tw`border-l border-gray-300 p-4`}>{jabatanName}</Text>
                                </Pressable>
                                {touched.id_jabatan && errors.id_jabatan &&
                                    <Text style={tw`text-xs text-red-600`}>{errors.id_jabatan}</Text>
                                }
                            </View>
                            
                            
                            {jabatanName.toLocaleLowerCase() === "siswa" ? (
                                <View style={tw`mb-4`}>
                                    <Text>Kelas</Text>
                                    <Pressable 
                                        onPress={() => onSelectBottomSheet("kelas")} 
                                        style={tw`flex flex-row border border-gray-300 rounded-md items-center`}
                                    >
                                        <Icon name={'graduation-cap'} size={20} color="#0096FF" style={tw`px-3`} />
                                        <Text style={tw`border-l border-gray-300 p-4`}>{kelasName}</Text>
                                    </Pressable>
                                    {touched.id_kelas && errors.id_kelas &&
                                        <Text style={tw`text-xs text-red-600`}>{errors.id_kelas}</Text>
                                    }
                                </View>
                            ) : (
                                null
                            )}

                            <View style={tw`flex flex-row justify-center mt-4 mb-12`}>
                                <TouchableOpacity
                                    onPress={openGallery}
                                    style={[styles.shadowUpload, tw`w-1/3 rounded-full p-4`]}
                                >
                                    <Icon name={'cloud-upload-alt'} size={50} color="#0096FF" style={tw`px-3 text-center`} />
                                    <Text style={tw`text-center`}>Upload Foto</Text>
                                </TouchableOpacity>
                                {/* {touched.foto && errors.foto &&
                                    <Text style={tw`text-xs text-red-600`}>{errors.foto}</Text>
                                } */}
                            </View>

                            {showDate ? (
                                <DateTimePicker 
                                testID="dateTimePicker"
                                value={date}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                locale="id-ID"
                                onChange={onChangeDate}
                                />
                                ): (
                                    null
                            )}

                        
                            <RBSheet
                                ref={refRBSheet}
                                closeOnDragDown={true}
                                closeOnPressMask={false}
                                height={500}
                                customStyles={{
                                    container: {
                                        borderTopRightRadius: 25,
                                        borderTopLeftRadius: 25,
                                    },
                                    wrapper: {
                                        backgroundColor: "transparent",
                                    },
                                    draggableIcon: {
                                        backgroundColor: "#000"
                                    }
                                }}
                            >
                                <ScrollView style={tw`p-4`}>
                                    {select === "kelas" ? (
                                        <View>
                                            <Text>Kelas</Text>
                                            {data_kelas.map((kelas, index) => {
                                                return (
                                                    <Pressable 
                                                        key={index} 
                                                        style={tw`flex flex-row justify-between border border-gray-300 p-2 my-1 rounded`}
                                                        onPress={() => {
                                                            setSelectKelas("kelas-" + kelas.id), 
                                                            setKelas(kelas.id),
                                                            setKelasName(kelas.name),
                                                            refRBSheet.current.close()
                                                        }}
                                                    >
                                                        <Text>{kelas.name}</Text>
                                                        <Icon name={'check'} size={20} color={selectKelas === "kelas-" + kelas.id ? "#0096FF" : "#9e9e9e"} />
                                                    </Pressable>
                                                )
                                            })}
                                        </View>
                                    ) : select === "jk" ? (
                                        <View>
                                            {data_jk.map((jk, index) => {
                                                return (
                                                    <Pressable 
                                                        key={index} 
                                                        style={tw`flex flex-row justify-between border border-gray-300 p-2 my-1 rounded`}
                                                        onPress={() => {
                                                            setSelectJK("jk-" + jk.id),
                                                            setJK(jk.id),
                                                            setJKName(jk.name),
                                                            refRBSheet.current.close()
                                                        }}
                                                    >
                                                        <Text>{jk.name}</Text>
                                                        <Icon name={'check'} size={20} color={selectJK === "jk-" + jk.id ? "#0096FF" : "#9e9e9e"} />
                                                    </Pressable>
                                                )
                                            })}
                                        </View>
                                    ) : select === "jabatan" ? (
                                        <View>
                                            {data_jabatan.map((jabatan, index) => {
                                                return (
                                                    <Pressable 
                                                        key={index} 
                                                        style={tw`flex flex-row justify-between border border-gray-300 p-2 my-1 rounded`}
                                                        onPress={() => {
                                                            setSelectJabatan("jabatan-" + jabatan.id),
                                                            setJabatan(jabatan.id),
                                                            setJabatanName(jabatan.name),
                                                            refRBSheet.current.close()
                                                        }}
                                                    >
                                                        <Text>{jabatan.name}</Text>
                                                        <Icon name={'check'} size={20} color={selectJabatan === "jabatan-" + jabatan.id ? "#0096FF" : "#9e9e9e"} />
                                                    </Pressable>
                                                )
                                            })}
                                        </View>
                                    ) : (
                                        null
                                    )}
                                </ScrollView>
                            </RBSheet>

                            {namaLengkap !== '' && username !== '' && noHp !== '' && tglLahir != '' && jk != '' && jabatan != '' 
                            ? (
                                <Pressable 
                                    style={ tw`bg-blue-500 p-2 rounded-md`}
                                    onPress={handleSubmit}
                                    disabled={false}
                                >
                                    <Text style={tw`text-white font-semibold text-center text-lg`}>Tambah User</Text>
                                </Pressable>
                            ) : (
                                <Pressable 
                                    style={tw`bg-gray-300 p-2 rounded-md`}
                                    onPress={handleSubmit}
                                    disabled={true}
                                >
                                    <Text style={tw`text-gray-500 font-semibold text-center text-lg`}>Tambah User</Text>
                                </Pressable>
                            )}
                        </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%'
    },
    shadow: {  
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 10, height: 0},
      shadowRadius: 20,
      elevation: 10,
      backgroundColor: 'white'
    },
    shadowUpload: { 
        // borderRadius: 50,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 10, height: 0},
        shadowRadius: 20,
        elevation: 10,
        backgroundColor: 'white'
    }
});

export default EditUser;