import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import styles from '../Styles/styles.js';

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
const NewCategory = ({onChangeCategory, category, setAddNewCategory}) => (
    <View style={styles.new_category_container}>
        <View style={styles.category_modal}>
        <TextInput
            style={styles.new_category_input}
            onChangeText={onChangeCategory}
            value={category}
            placeholder="New Category Name"
        />
        <TouchableOpacity onPress={() => {setAddNewCategory(false); }}>
            <View style={styles.category_button}>
            <Text style={styles.button_text}>ADD</Text>
            </View>
        </TouchableOpacity>
        </View>
    </View>
);

// Modal that shows and allows the user to change and inspect the settings
const Settings = ({setOpenSettings}) => (
    <View style={styles.settings_container}>
        <View style={styles.settings_modal}>
            <View style={styles.settings_close_button_position}>
                <TouchableOpacity onPress={() => {setOpenSettings(false); }}>
                    <View style={styles.close_settings_button}>
                        <View style={styles.small_eclipse_left}/>
                        <View style={styles.small_eclipse_right}/>
                    </View>
                </TouchableOpacity>
            </View>
            <Text>SETTINGS WILL BE HERE!</Text>
        </View>
    </View>
);

export default function Home() {  
    const [addNewCategory, setAddNewCategory] = React.useState(false)
    const [openSettings, setOpenSettings] = React.useState(false)
    const [category, onChangeCategory] = React.useState(null);

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.container}>
            <View style={styles.header_area}> 
                <View style={styles.settings_button_position}>
                    <TouchableOpacity onPress={() => setOpenSettings(true)}>
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
            <Modal
            animationType='slide'
            transparent={true}
            visible={openSettings}
            onRequestClose={() => {
                alert("Modal has been closed!");
                setOpenSettings(!openSettings);
            }}
            >
            <Settings setOpenSettings={setOpenSettings}/>
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