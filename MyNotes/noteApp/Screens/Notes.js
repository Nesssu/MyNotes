import React, { useEffect } from "react";
import { TouchableOpacity, SafeAreaView, View, Text, ScrollView } from "react-native";
import styles from "../Styles/styles";
import * as SQLite from 'expo-sqlite';
import DatabaseClass from "../Utilities/database";

const Note = (props) => (
    <View style={styles.note_background}>
        <Text style={styles.notes_text}>{props.note}</Text>
        <Text style={styles.notes_date}>{props.time}</Text>
    </View>
);

function AllNotes(props) {
    const notes = props.notes;
    const listItems = notes.map((data) => 
        <Note key={data["ID"]} note={data["Note"]} time={data["Time"]} />
    );
    return (
        <View>{listItems}</View>
    );
}

export default function Notes(props) {
    const [notes, setNotes] = React.useState([]);
    const [value, setValue] = React.useState(0);
    const page_id = props.route.params.page_id;
    const db = SQLite.openDatabase("mynotes.db");
    const database = new DatabaseClass;

    useEffect(() => {
        db.transaction(function(tx) {
            tx.executeSql(`SELECT * FROM "Notes";`, [], (tx, results) => {
                var temp = [];
                for (var i = 0; i < results.rows.length; i++) {
                    temp.push(results.rows.item(i));
                }
                setNotes(temp);
            }, (tx, error) => {
                console.log(error);
            })
        })
    }, [value]);

    const forceUpdate = () => {
        setValue(value + 1);
    }

    const deleteNote = (id) => {
        db.transaction(function(tx) {
            tx.executeSql(`DELETE FROM Notes WHERE ID = ?`, [id], null);
        });
    };

    const addNote = (fk_id, note) => {
        db.transaction(function(tx) {
            tx.executeSql(`INSERT INTO Notes ("FK_ID", "Notes", "Time") VALUES (?, ?, DATETIME())`, [fk_id, note], null);
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.notes_header}>
                <View style={styles.back_to_home_button}>
                    <TouchableOpacity onPress={ () => props.navigation.navigate("Home")}>
                        <Text style={styles.go_back_text}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.headline_1}>{props.route.params.category}</Text>
            </View>
            <View style={styles.notes_main}>
                <ScrollView contentContainerStyle={{alignItems: "center"}} style={{width: "100%", height: "100%"}}>
                    <AllNotes notes={notes}/>
                </ScrollView>
            </View>
            <View style={styles.notes_footer}>
                <View style={styles.notes_add_button_area}>
                    <TouchableOpacity onPress={forceUpdate}>
                        <Text style={styles.notes_add_button}>ADD</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.notes_delete_button_area}>
                    <TouchableOpacity>
                        <Text style={styles.notes_delete_button}>DELETE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}