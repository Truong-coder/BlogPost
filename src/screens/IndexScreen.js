import React, { useContext, useEffect } from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    FlatList, 
    Button, 
    TouchableOpacity 
} from 'react-native';
import { Context } from '../context/BlogContext';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    // destructuring
    // data property, addBlogPost callback
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);
    /**
     * Call the 'getBlogPosts' function directly from inside of our body
     * Reason: As soon as we start to render our index screen component, we're going to cal getBlogPosts
     * -> that going to initialize our API request
     * The API request will eventually be resolve, update our state and cause our component to be rerendered
     * -> iF the call the function outside that cause an infinite loop
     * 
     * Using useEffect
     * Hook useEffect is used to make sure that we only run some bit of code one time when a component is first render
     * an empty array means only run a function 1 time
     * 
     */

    useEffect (() => {
        getBlogPosts();
        /**
         * Tell React Navigation that anytime IndexScreen gains focus then invoke this callback function
         * The first time we show index screen do one fetch
         * anytime return to the screen do another fetch
         */
        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });
        // if we completely remove this screen, then this function will be invoked
        // use this function to cleanup after our component
        return () => {
            listener.remove();
        };
    }, []);
    return(
        <View>
            <Text style = {styles.title}>This is index screen</Text>
            
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
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create') }>
                <AntDesign name="pluscircleo" size={24} color="black" />
            </TouchableOpacity>
        ),
    
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

