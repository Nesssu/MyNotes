import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from 'react-native';
import styles from '../Styles/styles.js';
import * as SQLite from 'expo-sqlite';
import DatabaseClass from '../Utilities/database.js';

// Delete button to delete sertain category. Will be displayed when the user long presses
// one of the category names.
const DeleteCategory = (props) => (
    <View style={styles.new_category_container}>
        <View style={styles.category_modal}>
            <View style={styles.category_close_button_position}>
                <TouchableOpacity onPress={() => {props.setDeleteCategory(false);}}>
                    <View style={styles.close_category_button}>
                        <View style={styles.small_eclipse_left}/>
                        <View style={styles.small_eclipse_right}/>
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={styles.delete_warning}>Do you want to delete "{props.category}"</Text>
            <TouchableOpacity onPress={() => {props.forceUpdate(); props.deleteNoteCategory(); props.setDeleteCategory(false);}}>
                <View style={styles.category_button}>
                    <Text style={styles.button_text}>DELETE</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
);

// Subview that shows the already made categories and how many notes are in those categories
function NoteCategory(props) {
    const categories = props.categories;
    const listItems = categories.map((data) =>
        <TouchableOpacity key={data["ID"]} 
                          onPress={ () => props.navigation.navigate("Notes", {category: data["Name"], page_id: data["ID"]})}
                          onLongPress={() => props.longPressFunc(data["Name"], data["ID"])}>
            <View style={styles.notes_area}>
                <View style={styles.title_area}>
                    <Text style={styles.notes_title}>{data["Name"]}</Text>
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
};

// Modal that allows the user to create a new category
const NewCategory = ({onChangeCategory, category, setAddNewCategory, insertNewCategory, forceUpdate}) => (
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
            <TouchableOpacity onPress={() => {insertNewCategory(category); setAddNewCategory(false); onChangeCategory(""); forceUpdate();}}>
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
    const [value, setValue] = React.useState(0);
    const [deleteCategory, setDeleteCategory] = React.useState(false);
    const [categoryToDelete, setCategoryToDelete] = React.useState("");
    const [categoryToDeleteID, setCategoryToDeleteID] = React.useState(null);
    const db = SQLite.openDatabase("mynotes.db");
    const database = new DatabaseClass;

    useEffect(() => {

        database.initializeDatabase();

        db.transaction(function(tx) {
            tx.executeSql(`SELECT * FROM Categories;`, [], (tx, results) => {
                let temp = [];
                for (let i = 0; i < results.rows.length; i++) {
                    temp.push(results.rows.item(i));
                }
                setCategories(temp);
            });
        });
    }, [value]);

    const forceUpdate = () => {setValue(value + 1);};
    const longPressFunc = (toDelete, toDeleteID) => {setDeleteCategory(true); setCategoryToDelete(toDelete); setCategoryToDeleteID(toDeleteID);};
    const insertNewCategory = (categoryName) => {
        if (categoryName == "") {
            Alert.alert("The category title can't be empty");
        } else {
            db.transaction(function(tx) {
            tx.executeSql(`INSERT INTO Categories (Name) VALUES(?)`, [categoryName], 
                (tx, results) => {console.log("Data inserted!")},
                (tx, error) => {console.log(error);});
            });
        }
    };
    const deleteNoteCategory = () => {
        db.transaction(function(tx) {
            tx.executeSql(`DELETE FROM Categories WHERE ID = ?`, [categoryToDeleteID], null);
        });
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
                    <NoteCategory categories={categories} navigation={navigation} deleteCategory={deleteCategory} longPressFunc={longPressFunc}/>
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
                forceUpdate={forceUpdate}
                />
            </Modal>
            <Modal
            animationType='slide'
            transparent={true}
            visible={deleteCategory}
            onRequestClose={() => {
                alert("Modal has been closed!");
                setDeleteCategory(!deleteCategory);
            }}
            >
            <DeleteCategory
                setDeleteCategory={setDeleteCategory}
                forceUpdate={forceUpdate}
                category={categoryToDelete}
                deleteNoteCategory={deleteNoteCategory}
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