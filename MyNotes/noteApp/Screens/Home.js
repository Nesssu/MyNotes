import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import styles from '../Styles/styles.js';
import { openDatabase} from 'react-native-sqlite-storage';

// Opening the database
const db = openDatabase({name: 'mynotes.db', location: '../Databases/mynotes.db'});

// Subview that shows the already made categories and how many notes are in those categories
function NoteCategory(props) {
    const categories = props.categories;
    const listItems = categories.map((data) => 
        <TouchableOpacity key={data[0]} onPress={ () => props.navigation.navigate("Notes", {category: data[1], page_id: data[0]})}>
            <View style={styles.notes_area}>
                <View style={styles.title_area}>
                    <Text style={styles.notes_title}>{data[1]}</Text>
                </View>
                <View style={styles.amount_area}>
                    <Text style={styles.notes_amount}>{data[2]}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
    return (
        <View>{listItems}</View>
    );
}

// Modal that allows the user to create a new category
const NewCategory = ({onChangeCategory, category, setAddNewCategory}) => (
    <View style={styles.new_category_container}>
        <View style={styles.category_modal}>
            <View style={styles.category_close_button_position}>
                <TouchableOpacity onPress={() => {setAddNewCategory(false); }}>
                    <View style={styles.close_category_button}>
                        <View style={styles.small_eclipse_left}/>
                        <View style={styles.small_eclipse_right}/>
                    </View>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.new_category_input}
                onChangeText={onChangeCategory}
                value={category}
                placeholder="New Category Name"
            />
            <TouchableOpacity>
                <View style={styles.category_button}>
                    <Text style={styles.button_text}>ADD</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
);

// Main page that displayes all the note categories, allowes the user to add new categories, go into one off the
// categories or change/inspect the settings
export default function Home({navigation}) {  
    const [addNewCategory, setAddNewCategory] = React.useState(false)
    const [category, onChangeCategory] = React.useState(null);
    const categories = [[1, "Personal", 8], [2, "Work", 4], [3, "Ideas", 3]];


    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.container}>
            <View style={styles.header_area}> 
                <View style={styles.settings_button_position}>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <View style={styles.settings_button}>
                            <View style={styles.small_dot}/>
                            <View style={styles.small_dot}/>
                            <View style={styles.small_dot}/>
                        </View>
                    </TouchableOpacity>
                    </View>
                <Text style={styles.headline_1}>My</Text><Text style={styles.headline_2}> Notes</Text>
            </View>
            <View style={styles.main_area}>
                <ScrollView>
                    <NoteCategory categories={categories} navigation={navigation}/>
                </ScrollView>
            </View>
            <Modal
            animationType='fade'
            transparent={true}
            visible={addNewCategory}
            onRequestClose={() => {
                alert("Modal has been closed!");
                setAddNewCategory(!addNewCategory);
            }}
            >
            <NewCategory
                onChangeCategory={onChangeCategory}
                category={category}
                setAddNewCategory={setAddNewCategory}/>
            </Modal>
            <View style={styles.footer_area}>
                <TouchableOpacity onPress={() => setAddNewCategory(true)}>
                    <View style={styles.circle}>
                        <View style={styles.vertical_eclipse}/>
                        <View style={styles.horizontal_eclipse}/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
  );
}