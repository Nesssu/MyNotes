import { StyleSheet } from 'react-native';

const background_color = "#fff8ed";
const text_color_1 = "#425c8a";
const text_color_2 = "#9e414a";


export default StyleSheet.create({

    // STYLING FOR ALL THE VIEWS
    container: {
      flex: 1,
      backgroundColor: background_color,
      alignItems: 'center',
      justifyContent: 'center',
    },
    new_category_container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    category_modal: {
      width: "80%",
      paddingTop: 20,
      paddingBottom: 20,
      borderRadius: 25,
      backgroundColor: '#ffefd9',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    settings_modal: {
      width: "95%",
      height: "50%",
      bottom: 0,
      backgroundColor: '#ffefd9',
      padding: 20,
      borderRadius: 25,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    category_button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: text_color_2,
      marginBottom: 20
    },
    notes_area: {
      flexDirection: "row",
      margin: "3%",
      justifyContent: 'space-between'
    },
    amount_area: {
      marginLeft: "15%"
    },
    title_area: {
      marginRight: "15%"
    },
    header_area: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    main_area: {
      flex: 6,
    },
    footer_area: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center'
    },
    circle: {
      height: 70,
      width: 70,
      backgroundColor: text_color_2,
      borderRadius: 35,
      justifyContent: 'center',
      alignItems: 'center'
    },
    vertical_eclipse: {
      width: "8%",
      height: "75%",
      borderRadius: 10,
      backgroundColor: background_color,
      position: 'absolute'
    },
    horizontal_eclipse: {
      width: "75%",
      height: "8%",
      borderRadius: 10,
      backgroundColor: background_color,
      position: 'absolute'
    },
    settings_container: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: "90%",
      justifyContent: "center",
      alignItems: "center"
    },
    settings_button: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: background_color,
      borderWidth: 3,
      borderColor: text_color_2,
      margin: 0,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      flex: 1,
    },
    small_dot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: text_color_2,
      margin: 1
    },
    settings_button_position: {
      position: "absolute",
      top: 0,
      right: -60
    },
    close_category_button: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 3,
      borderColor: text_color_2,
      backgroundColor: '#ffefd9',
      alignItems: "center",
      justifyContent: "center"
    },
    category_close_button_position: {
      position: "absolute",
      top: 15,
      right: 15
    },
    small_eclipse_left: {
      width: "75%",
      height: "10%",
      backgroundColor: text_color_2,
      borderRadius: 5,
      transform: [{rotate: "45deg"}],
      position: "absolute"
    },
    small_eclipse_right: {
      width: "75%",
      height: "10%",
      backgroundColor: text_color_2,
      borderRadius: 5,
      transform: [{rotate: "135deg"}],
      position: "absolute"
    },
    settings_header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      width: "100%",
      height: "100%"
    },
    settings_main: {
      flex: 8,
      width: "100%",
      height: "100%"
    },
    back_to_home_button: {
      position: "absolute",
      top: 5,
      left: 20,
    },
    notes_header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      width: "100%",
    },
    notes_main: {
      flex: 7,
      width: "100%",
      alignItems: "center",
    },
    notes_footer: {
      flex: 1,
      width: "100%",
      flexDirection: "row",

    },
    notes_add_button_area: {
      flex: 1,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    notes_delete_button_area: {
      flex: 1,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    note_background: {
      width: "80%",
      padding: 10,
      paddingBottom: 30,
      margin: 10,
      backgroundColor: "#ffefd9",
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },

    // STYLING FOR ALL THE INPUTS
    new_category_input: {
      padding: 10,
      fontSize: 25,
      color: text_color_1,
      fontWeight: '800',
      width: "85%",
      textAlign: 'center',
      marginTop: 40,
      marginBottom: 30,
      backgroundColor: background_color,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: background_color
    },
  
    // STYLING FOR ALL THE TEXTS
    button_text: {
      color: background_color,
      fontSize: 25,
      fontWeight: '600'
    },
    notes_title: {
      fontSize: 40,
      fontWeight: '600',
      color: text_color_1,
    },
    notes_amount: {
      fontSize: 40,
      fontWeight: '600',
      color: text_color_2,
    },
    headline_1: {
      fontSize: 60,
      fontWeight: '700',
      color: text_color_2
    },
    headline_2: {
      fontSize: 60,
      fontWeight: '700',
      color: text_color_1,
    },
    go_back_text: {
      color: text_color_1,
      fontSize: 25,
      fontWeight: '600'
    },
    notes_add_button: {
      fontSize: 30,
      fontWeight: '700',
      color: text_color_1,
    },
    notes_delete_button: {
      fontSize: 30,
      fontWeight: '700',
      color: text_color_1,
    },
    notes_text: {
      fontSize: 25,
      color: text_color_2,
      fontWeight: '600',
    },
    notes_date: {
      fontSize: 14,
      color: text_color_2,
      fontWeight: '400',
      position: "absolute",
      bottom: 8,
      left: 8
    }
});