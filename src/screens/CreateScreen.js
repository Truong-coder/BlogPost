import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const CreateScreen = ({navigation}) => {
    /**
     * Initialize two different pieace of state
     * One to handle the title entry
     * The other handle the content entry
     */
    
    // destructure
    const { addBlogPost } = useContext(Context);
    
    // reuseable component
    // Formulate some set of props
    return <BlogPostForm 
        // anytime the user submits the form, BlogPostForm invoke this on submit prop
        onSubmit = {(title, content)=> {
            addBlogPost(title, content, () => navigation.navigate('Index'));
        }}
    
    />;
};

const styles = StyleSheet.create({
   
});

export default CreateScreen;