import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from 'react-native';
import styles from '../Styles/styles.js';
import DatabaseClass from '../Utilities/database';
import * as SQLite from 'expo-sqlite';

// Delete button to delete sertain category. Will be displayed when the user long presses
// one of the category names.
function DeleteButton() {
    return (
        <View style={styles.delete_button_background}>
            <View style={styles.delete_button_line}/>
        </View>
    );
}

// Subview that shows the already made categories and how many notes are in those categories
function NoteCategory(props) {
    const categories = props.categories;
    const listItems = categories.map((data) => 
        <TouchableOpacity key={data["ID"]} 
                          onPress={ () => props.navigation.navigate("Notes", {category: data["Name"], page_id: data["ID"]})}
                          onLongPress={() => Alert.alert("Long press works!")}>
            <View style={styles.notes_area}>
                {props.deleteCategory && (<DeleteButton/>)}
                <View style={styles.title_area}>
                    <Text style={styles.notes_title}>{data["Name"]}</Text>
                </View>
                <View style={styles.amount_area}>
                    <Text style={styles.notes_amount}>{data["Amount"]}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
    return (
        <View>{listItems.length ? listItems : <Text style={{fontSize: 30,
                                                            fontWeight: '200',
                                                            color: "grey",
                                                            fontStyle: "italic",
                                                            top: 200
                                                            }}>ADD NEW CATEGORIES</Text>}</View>
    );
}

// Modal that allows the user to create a new category
const NewCategory = ({onChangeCategory, category, setAddNewCategory, insertNewCategory}) => (
    <View style={styles.new_category_container}>
        <View style={styles.category_modal}>
            <View style={styles.category_close_button_position}>
                <TouchableOpacity onPress={() => {setAddNewCategory(false);  onChangeCategory("");}}>
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
            <TouchableOpacity onPress={() => {insertNewCategory(category); setAddNewCategory(false); onChangeCategory("");}}>
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
    const [categories, setCategories] = React.useState([]);
    const [deleteCategory, setDeleteCategory] = React.useState(false);
    const db = SQLite.openDatabase("mynotes.db");
    const database = new DatabaseClass();

    useEffect(() => {
        db.transaction(function(tx) {
            tx.executeSql(`SELECT * FROM Categories;`, [], (tx, results) => {
                var temp = [];
                for (var i = 0; i < results.rows.length; i++) {
                    temp.push(results.rows.item(i));
                }
                setCategories(temp);
            });
        });
    }, []);

    const insertNewCategory = (categoryName) => {
        db.transaction(function(tx) {
          tx.executeSql(`INSERT INTO Categories ("Name", "Amount") VALUES(?, 0)`, [categoryName], null);
        })
    };

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
                    <NoteCategory categories={categories} navigation={navigation} deleteCategory={deleteCategory}/>
                </ScrollView>
            </View>
            <Modal
            animationType='slide'
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
                setAddNewCategory={setAddNewCategory}
                insertNewCategory={insertNewCategory}
                />
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