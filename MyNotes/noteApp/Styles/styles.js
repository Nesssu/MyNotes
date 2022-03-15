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
    modal_view: {
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
      backgroundColor: '#9e414a',
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
  
    // STYLING FOR ALL THE INPUTS
    new_category_input: {
      padding: 10,
      fontSize: 25,
      fontWeight: '800',
      width: "85%",
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 30,
      backgroundColor: background_color,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#cfcfcf"
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
});
  