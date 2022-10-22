import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import tw from 'twrnc';

const Loader = () => {
    return (
        <View style={tw`flex flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color="#14b8a6" />
            <Text style='text-center'>Loading....</Text>
        </View>
    )
}

export default Loader