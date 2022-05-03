import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from 'react-native';
import styles from "../Styles/styles";

export default function Settings({navigation}) {
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

            </View>
        </SafeAreaView>
    );
} 