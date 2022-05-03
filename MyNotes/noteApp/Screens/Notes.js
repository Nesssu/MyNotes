import { TouchableOpacity, SafeAreaView, View, Text } from "react-native";
import styles from "../Styles/styles";

export default function Notes(props) {
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
            </View>
            <View style={styles.notes_footer}>

            </View>
        </SafeAreaView>
    );
}