import { TouchableOpacity, SafeAreaView, View, Text, ScrollView } from "react-native";
import styles from "../Styles/styles";

const Note = (props) => (
    <View style={styles.note_background}>
        <Text style={styles.notes_text}>{props.note}</Text>
        <Text style={styles.notes_date}>{props.time}</Text>
    </View>
);

function AllNotes(props) {
    const notes = props.notes;
    const listItems = notes.map((data) => 
        <Note key={data[0]} note={data[1]} time={data[2]} />
    );
    return (
        <View>{listItems}</View>
    );
}

export default function Notes(props) {
    // props will have the id of the category
    // TODO: Get all the note data from database
    const page_id = props.route.params.page_id;
    


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
                </ScrollView>
            </View>
            <View style={styles.notes_footer}>
                <View style={styles.notes_add_button_area}>
                    <TouchableOpacity>
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