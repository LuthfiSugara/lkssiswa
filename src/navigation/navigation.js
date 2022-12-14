import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import Login from "../screens/login";
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedIn } from '../redux/actions/auth-actions';
import DataUser from "../screens/data-user";
import TambahUser from "../screens/tambah-user";
import ProfileUser from "../screens/profile-user";
import EditUser from "../screens/edit-user";
import Setting from "../screens/setting";
import ListKelas from "../screens/list-kelas";
import ListMapel from "../screens/list-mapel";
import Materi from "../screens/materi";
import User from "../screens/user";
import ListAdmin from "../screens/list-admin";
import TambahAdmin from "../screens/tambah-admin";
import ListGuru from "../screens/list-guru";
import TambahGuru from "../screens/tambah-guru";
import ListSiswa from "../screens/list-siswa";
import TambahSiswa from "../screens/tambah-siswa";
import EditAdmin from "../screens/edit-admin";
import EditGuru from "../screens/edit-guru";
import TambahMateri from "../screens/tambah-materi";
import LKS from "../screens/lks";
import Nilai from "../screens/nilai";
import EditSiswa from "../screens/edit-siswa";
import ListMateri from "../screens/list-materi";
import DetailMateri from "../screens/detail-materi";
import EditMateri from "../screens/edit-materi";
import Soal from "../screens/soal";
import TambahSoal from "../screens/tambah-soal";
import TambahSoalPG from "../screens/tambah-soal-pg";
import TambahSoalEssay from "../screens/tambah-soal-essay";
import ListSoal from "../screens/list-soal";
import EditSoalPG from "../screens/edit-soal-pg";
import EditSoalEssay from "../screens/edit-soal-essay";
import EditExam from "../screens/edit-exam";
import Exam from "../screens/exam";
import ExamWork from "../screens/exam-work";
import NilaiSiswa from "../screens/nilai-siswa";
import { SafeAreaView } from "react-native";
import NilaiSiswaDetail from "../screens/nilai-siswa-detail";
import CorrectAnswer from "../screens/correct-answer";
import SchoolProfile from "../screens/school-profile";


const Stack = createNativeStackNavigator();


const Navigation = () => {

    const dispatch = useDispatch();
    
    const {loading, is_logged_in} = useSelector(state => state.userReducer);

    const loadData = async() => {
        await dispatch(isLoggedIn());
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName='Login'
            >
            {is_logged_in ? (
                <>
                    <Stack.Screen
                        name='Home'
                        component={Home}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='User'
                        component={User}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='ListAdmin'
                        component={ListAdmin}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='TambahAdmin'
                        component={TambahAdmin}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='EditAdmin'
                        component={EditAdmin}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='ListGuru'
                        component={ListGuru}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='TambahGuru'
                        component={TambahGuru}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='EditGuru'
                        component={EditGuru}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='ListSiswa'
                        component={ListSiswa}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='TambahSiswa'
                        component={TambahSiswa}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='EditSiswa'
                        component={EditSiswa}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='DataUser'
                        component={DataUser}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='TambahUser'
                        component={TambahUser}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='ProfileUser'
                        component={ProfileUser}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='EditUser'
                        component={EditUser}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='Setting'
                        component={Setting}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='ListKelas'
                        component={ListKelas}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='ListMapel'
                        component={ListMapel}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='Materi'
                        component={Materi}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='TambahMateri'
                        component={TambahMateri}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='ListMateri'
                        component={ListMateri}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='DetailMateri'
                        component={DetailMateri}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='EditMateri'
                        component={EditMateri}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='LKS'
                        component={LKS}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='Soal'
                        component={Soal}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='EditExam'
                        component={EditExam}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='Exam'
                        component={Exam}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='ExamWork'
                        component={ExamWork}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='TambahSoal'
                        component={TambahSoal}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='TambahSoalPG'
                        component={TambahSoalPG}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='EditSoalPG'
                        component={EditSoalPG}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='TambahSoalEssay'
                        component={TambahSoalEssay}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='EditSoalEssay'
                        component={EditSoalEssay}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='ListSoal'
                        component={ListSoal}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='Nilai'
                        component={Nilai}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='NilaiSiswa'
                        component={NilaiSiswa}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='NilaiSiswaDetail'
                        component={NilaiSiswaDetail}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='CorrectAnswer'
                        component={CorrectAnswer}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name='SchoolProfile'
                        component={SchoolProfile}
                        options={{
                            headerShown:false
                        }}
                    />
                </>
            ) : (
                <Stack.Screen 
                    name='Login'
                    component={Login}
                    options={{
                        headerShown:false
                    }}
                />
            )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;