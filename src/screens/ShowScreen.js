import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';

const ShowScreen = ({ navigation }) => {
    const { state } = useContext(Context);

    // find is a built-in helper function
    const blogPost = state.find( 
        blogPost => blogPost.id === navigation.getParam('id') 
        );
    // console.log(navigation.getParam('id'))
    return(
        <View>
            <Text>
                {blogPost.title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default ShowScreen;
