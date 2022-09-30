import React, { useEffect } from "react";
import { TouchableOpacity, SafeAreaView, View, Text, ScrollView, TextInput, Touchable, TouchableHighlight, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import styles from "../Styles/styles";
import * as SQLite from 'expo-sqlite';
import DatabaseClass from "../Utilities/database";

export default function Notes(props) {
    const [note, setNote] = React.useState("");
    const page_id = props.route.params.page_id;
    const db = SQLite.openDatabase("mynotes.db");

    useEffect(() => {
        db.transaction(function(tx) {
            tx.executeSql(`SELECT Note FROM Notes WHERE FK_ID = ?;`, [page_id], (tx, results) => {
                if (results.rows.length == 0)
                {
                    setNote("");
                }
                else {
                    setNote(results.rows.item(0)["Note"]);
                }
            }, (tx, error) => {
                console.log(error);
            })
        })
    }, []);


    const updateNote = () => {
        db.transaction(function(tx) {
            tx.executeSql(`SELECT * FROM Notes WHERE FK_ID = ?;`, [page_id], function (tx, res)
            {
                if (res.rows.length == 0)
                {
                    tx.executeSql(`INSERT INTO Notes (Note, FK_ID, Time) VALUES(?, ?, DATETIME())`, [note, page_id],
                    (tx, results) => {console.log("Data inserted!")},
                    (tx, error) => {console.log(error);});
                }
                else {
                    tx.executeSql(`UPDATE Notes SET Note = ? WHERE FK_ID = ?;`, [note, page_id], null);
                }
            })
        })
    };

    const dateRearrange = (date) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let year = 0, month = 1, day = 2;
        const timeArray = date.split("-");
        let newDate = "Updated ";
    
        if (timeArray[day] == "2") {
            newDate += timeArray[day] + "nd";
        } else if (timeArray[day] == "3") {
            newDate += timeArray[day] + "rd";
        } else {
            newDate += timeArray[day] + "th";
        }
    
        newDate += " of " + months[parseInt(timeArray[month]) - 1] + ", " + timeArray[year] + ".";
        return newDate;
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
            <View style={styles.separator} />
            <View style={styles.notes_main}>
                <View style={styles.notes_input_area}>
                    <TextInput
                        style={styles.notes_input}
                        onChangeText={setNote}
                        value={note}
                        multiline={true}
                        onChange={updateNote}/>
                </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.notes_footer}>

            </View>
        </SafeAreaView>
    );
}