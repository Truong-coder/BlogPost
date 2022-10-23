import React, { useContext } from 'react';
import { Text, View, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    // destructuring
    // data property, addBlogPost callback
    const { state, addBlogPost, deleteBlogPost } = useContext(Context);
    return(
        <View>
            <Text>This is index screen</Text>
            <Button 
                title = "Add Post"
                onPress={addBlogPost}
            />
            <FlatList  
                data = {state} //list of Blog Posts
                keyExtractor = { blogPost => blogPost.title } //use 'title' as a key
                renderItem = { ({item}) => {
                    return (
                        <TouchableOpacity onPress = {() => navigation.navigate('Show', {id: item.id})}>
                        <View style = {styles.row}> 
                            <Text style = {styles.title}> 
                                {item.title} - {item.id}
                            </Text>
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                <Entypo name="trash" style = {styles.icon}/>

                            </TouchableOpacity>
                        </View> 
                    </TouchableOpacity>
                    
                    );    
                    
                }}
            />
            
        </View>
    );
};
/**
 * Add new section called IndexScreen 
 * That's a direct reference to our functional component
 */
IndexScreen.navigationOptions = ({ navigation }) => {
    return{
        headerRight: () => {
            <TouchableOpacity onPress={() => navigation.navigate('Create') }>
                <AntDesign name="pluscircleo" size={24} color="black" />
            </TouchableOpacity>
        } 
    
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15, // adding space
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 20,
        color: "black"
    }
    
});

export default IndexScreen;

