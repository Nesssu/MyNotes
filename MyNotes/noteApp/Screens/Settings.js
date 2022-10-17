import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from 'react-native';
import styles from "../Styles/styles";
import * as SQLite from 'expo-sqlite';

export default function Settings({navigation}) {
    const db = SQLite.openDatabase("mynotes.db");

    const deleteCategories = () => {
        db.transaction(function(tx) {
            tx.executeSql(`DELETE FROM Categories;`, [], null);
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.settings_header}>
                <View style={styles.back_to_home_button}>
                    <TouchableOpacity onPress={ () => navigation.navigate("Home")}>
                        <Text style={styles.go_back_text}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.headline_1}>Settings</Text>
            </View>
            <View style={styles.settings_main}>
                <TouchableOpacity onPress={() => {deleteCategories()}}>
                    <View>
                        <Text style={{fontSize: 30, fontWeight: '600'}}>IF NOTHING USEFUL COMES TO MIND, DELETE</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
} 