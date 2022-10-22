import React from 'react'
import { Image, Text, View } from 'react-native'
import tw from 'twrnc';
import { customStyle } from '../utils/style';

const NotFound = ({message}) => {
    return (
        <View style={tw`flex-1 justify-center`}>
            <View style={[tw`w-full`]}>
                <Image
                    style={[tw`w-full h-4/6 rounded-lg`]}
                    source={require('../assets/images/not-found.png')}
                />
                <Text style={tw`text-center text-sm font-bold`}>{message}</Text>
            </View>
        </View>
    )
}

export default NotFound