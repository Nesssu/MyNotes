import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import styles from '../Styles/styles.js';
import SQLite from 'react-native-sqlite-storage';

// Database instantiation
const database = SQLite.openDatabase(
    {
        name: "NoteDB",
        location: "default",
    },
    () => { },
    error => { console.log(error) }
);

// Subview that shows the already made categories and how many notes are in those categories
const NoteCategory = ({title, amount}) => (
    <View style={styles.notes_area}>
        <View style={styles.title_area}>
        <Text style={styles.notes_title}>{title}</Text>
        </View>
        <View style={styles.amount_area}>
        <Text style={styles.notes_amount}>{amount}</Text>
        </View>
    </View>
);

// Modal that allows the user to create a new category
const NewCategory = ({onChangeCategory, category, setModalVisible, createNewTable}) => (
    <View style={styles.new_category_container}>
        <View style={styles.modal_view}>
        <TextInput
            style={styles.new_category_input}
            onChangeText={onChangeCategory}
            value={category}
            placeholder="New Category Name"
        />
        <TouchableOpacity onPress={() => {setModalVisible(false); createNewTable(); }}>
            <View style={styles.category_button}>
            <Text style={styles.button_text}>ADD</Text>
            </View>
        </TouchableOpacity>
        </View>
    </View>
);

export default function Home() {  
    const [modalVisible, setModalVisible] = React.useState(false)
    const [category, onChangeCategory] = React.useState(null);

    const createNewTable = () => {
        database.transaction((tx) => {
            tx.executeSql(
                `create table if not exists ${category}
                (ID INTEGER PRIMARY KEY AUTOINCREMENT, Note VARCHAR);`
            )
        })
    };

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.container}>
            <View style={styles.header_area}>
            <Text style={styles.headline_1}>My</Text><Text style={styles.headline_2}> Notes</Text>
            </View>
            <View style={styles.main_area}>
            <ScrollView>
                <TouchableOpacity>
                <NoteCategory title="Personal" amount="6"/>
                </TouchableOpacity>
                <TouchableOpacity>
                <NoteCategory title="Work" amount="14"/>
                </TouchableOpacity>
                <TouchableOpacity>
                <NoteCategory title="Ideas" amount="9"/>
                </TouchableOpacity>
                <TouchableOpacity>
                <NoteCategory title="Lists" amount="3"/>
                </TouchableOpacity>
            </ScrollView>
            </View>
            <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                alert("Modal has been closed!");
                setModalVisible(!modalVisible);
            }}
            >
            <NewCategory
                onChangeCategory={onChangeCategory}
                category={category}
                setModalVisible={setModalVisible}
                createNewTable={createNewTable}/>
            </Modal>
            <View style={styles.footer_area}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
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