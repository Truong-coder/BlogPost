import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({navigation}) => {
    /**
     * Initialize two different pieace of state
     * One to handle the title entry
     * The other handle the content entry
     */
    const id = navigation.getParam('id')
    const {state, editBlogPost} = useContext(Context);

    const blogPost = state.find(
        (blogPost) => blogPost.id === navigation.getParam('id'))

    
     const { addBlogPost } = useContext(Context);
    // JSX
     return <BlogPostForm 
        initialValues = {{title: blogPost.title, content: blogPost.content}}
        onSubmit={(title, content) => {
            editBlogPost( id, title, content, () => navigation.pop() );
        }}
    />
      // destructure
    //  const { addBlogPost } = useContext(Context);
    // <View>
    // <Text style = {styles.label}> Enter New Title: </Text>

    {/* * Tell the Input what the current value is
    * 'onChangeText' whenever received some new text, use it to update our title state.
    *  destructure
    * const { addBlogPost } = useContext(Context); */}
    
    
    // <TextInput 
    //     style = {styles.input} 
    //     value = {newTitle} 
    //     onChangeText ={(text) => setNewTitle(text)}
    // />
    // <Text style = {styles.label}> Enter New Content: </Text>
    // <TextInput 
    //     style = {styles.input} 
    //     value = {newContent} 
    //     onChangeText={(text) => setNewContent(text)}
    // />
     
    // <Button 
    //     title = "Add Blog Post"
    //     onPress={() => {
    //         addBlogPost(newTitle, newContent, () => {
    //         navigation.navigate('Index');
    //         });
    //     }} 
    // />
    // </View>
    // ); 
};     



const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 2,
        borderColor: 'black',
        marginBottom: 15,
        marginLeft: 5,
        padding: 5
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        padding: 5
    }
});

export default EditScreen;