import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import tw from 'twrnc';

const Loader = () => {
    return (
        <View style={tw`flex flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color="#ff1402" />
            <Text style='text-center'>Loading....</Text>
        </View>
    )
}

export default Loader