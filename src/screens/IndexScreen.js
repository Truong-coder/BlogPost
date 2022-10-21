import React, { useContext } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import BlogContext from '../context/BlogContext';

const IndexScreen = () => {
    const blogPosts = useContext(BlogContext);
    return(
        <View>
            <Text>This is index screen</Text>
            <FlatList  
                data = {blogPosts}
                keyExtractor = { (blogPost) => blogPost.title } //use 'title' as a key
                renderItem = { ({item}) => {
                    return <Text> {item.title}</Text>
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({});

export default IndexScreen;