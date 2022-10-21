import React, { useEffect } from "react";
import { TouchableOpacity, SafeAreaView, View, Text, ScrollView, TextInput, } from "react-native";
import styles from "../Styles/styles";
import * as SQLite from 'expo-sqlite';

export default function Notes(props) {
    const [notes, setNotes] = React.useState([]);
    const [update, setUpdate] = React.useState(0);
    const [showRemove, setShowRemove] = React.useState(false);

    const page_id = props.route.params.page_id;
    const db = SQLite.openDatabase("mynotes.db");

    useEffect(() => {
        db.transaction(function(tx) {
            tx.executeSql(`SELECT Note, ID FROM Notes WHERE FK_ID = ?;`, [page_id], (tx, results) => {
                if (results.rows.length == 0)
                {
                    setNotes([]);
                }
                else {
                    let temp = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        temp.push({Note: results.rows.item(i)["Note"], ID: results.rows.item(i)["ID"]});
                    }
                    setNotes(temp);
                }
            }, (tx, error) => {
                console.log(error);
            })
        })
    }, [update]);

    const addNoteToDatabase = () => {
        db.transaction(function(tx) {
            tx.executeSql(`INSERT INTO Notes (FK_ID, Note, Time) VALUES (?, ?, DATETIME());`, [page_id, ""], (tx, res) => {
                if (res.rowsAffected > 0) {
                    console.log("Insert successful");
                } else {
                    console.log("Insert failed");
                }
            })
        });
        setUpdate(update + 1);
    }

    const updateNotes = (text, i) => {
        db.transaction(function(tx) {
            tx.executeSql(`UPDATE Notes SET Note = ? WHERE ID = ?;`, [text, notes[i].ID], (tx, results) => {
                if (results.rowsAffected > 0) {
                    console.log("Update succesful")
                } else {
                    console.log("Update failed");
                }
            })
        })
    };

    const deleteNote = (i) => {
        db.transaction(function(tx) {
            tx.executeSql(`DELETE FROM Notes WHERE ID = ?;`, [notes[i].ID], (tx, res) => {
                if (res.rowsAffected > 0) {
                    console.log("Note deleted succesfully");
                } else {
                    console.log("Deleting failed");
                }
            })
        });
        setUpdate(update + 1);
    }

    const handleNoteChange = (text, index) => {
        setNotes(notes => {
            const newNotes = notes.map((item, j) => {
                if (j == index) {
                    return {Note: text, ID: item.ID};
                } else {
                    return {Note: item.Note, ID: item.ID};
                }
            });
            return newNotes;
        });

        updateNotes(text, index);
    };

    const MyTextInput = (props) => {
        const [currentValue, setCurrentValue] = React.useState(props.value.Note);
        return (
            <View>
                <TextInput
                    value={currentValue}
                    onChangeText={(v) => setCurrentValue(v)}
                    onEndEditing={() => handleNoteChange(currentValue, props.index)}
                    multiline={true}
                    style={styles.notes_input}
                />
            </View>
        );
    };

    const NoteView = () => {
        const listItems = notes.map((data, i) => {
            return (
                <View key={i} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%"}}>
                    <View style={styles.note_background_area}>
                        <View style={styles.note_background}>
                            <MyTextInput 
                                index={i}
                                value={data}
                            />
                        </View>
                    </View>
                    <View style={styles.notes_remove_button_area}>
                        <TouchableOpacity onPress={() => deleteNote(i)}>
                            <View style={showRemove ? styles.notes_remove_circle_show : styles.notes_remove_circle_hide}>
                                <View style={{width: "70%", height: 4, borderRadius: 4, backgroundColor: "#FFFFFF"}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        });
        return listItems;
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
                <ScrollView style={styles.notes_scrollview}>
                    <NoteView/>
                </ScrollView>
            </View>
            <View style={styles.notes_footer}>
                <View style={styles.notes_add_button_area}>
                    <TouchableOpacity onPress={() => addNoteToDatabase()}>
                        <Text style={styles.notes_add_button}>ADD</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.notes_delete_button_area}>
                    <TouchableOpacity onPress={() => setShowRemove(!showRemove)}>
                        <Text style={styles.notes_delete_button}>{showRemove ? "DONE" : "DELETE"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}