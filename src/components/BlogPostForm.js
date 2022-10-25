import React, { useState } from 'react';
import  { View, Text, StyleSheet, TextInput, Button } from 'react-native';

// destructure {onSubmit}
const BlogPostForm = ({ onSubmit, initialValues }) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);
    return(
        <View>
            <Text style = {styles.label}> Enter Title: </Text>
            {/* 
            * Tell the Input what the current value is
            * 'onChangeText' whenever received some new text, use it to update our title state.
            */}
            <TextInput 
                style = {styles.input} 
                value = {title} 
                onChangeText ={text => setTitle(text)}/>
            <Text style = {styles.label}> Enter Content: </Text>
            <TextInput 
                style = {styles.input} 
                value = {content} 
                onChangeText={(text) => setContent(text)}/>
            <Button 
                title = "Save Blog Post"
                // prop
                onPress={() => onSubmit(title, content)}
            />
        </View>
    );
};
// if we show this component and not pass in sowe given prop
//  this object will be used to automatically fill in some default values
BlogPostForm.defaultProps = {
    initialValues: {
      title: '',
      content: ''
    }
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

export default BlogPostForm;