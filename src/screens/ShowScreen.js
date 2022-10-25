import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { AntDesign } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
    const { state } = useContext(Context);

    // find is a built-in helper function
    const blogPost = state.find( 
        blogPost => blogPost.id === navigation.getParam('id') 
        );
    // console.log(navigation.getParam('id'))
    return(
        <View>
            <Text> {blogPost.title} </Text>
            <Text> {blogPost.content} </Text>
        </View>
    );
};
// show something inside the header

ShowScreen.navigationOptions = ({ navigation }) => {
    return{
        headerRight: () => (
            <TouchableOpacity 
            onPress={() => 
                navigation.navigate('Edit', {id: navigation.getParam('id') } ) 
                }
            >
                <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
        ),
    
    };
};

const styles = StyleSheet.create({});

export default ShowScreen;
