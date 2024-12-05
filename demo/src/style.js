import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
    container: {
        width:'100%'
    },
    imgLogin: {
        width: 200,
        height: 200,
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: 30,
        marginBottom: 40
    },
    imgLogin1: {
        width: 100,
        height: 100,
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: 30,
        marginBottom: 40,
        borderRadius: 100
    },
    imgLogin2: {
        width: 50,
        height: 50,
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: 30,
        marginBottom: 10,
        borderRadius: 100
    },
    textLogin: {
        textAlign: "center",
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
    },
    textLoginSmall: {
        textAlign: "center",
        fontSize: 15,
        marginTop: 30
    },
    btnLogin: {
        flexDirection: "row",
        // justifyContent: "center",
        backgroundColor: "#04764e",
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
        height: 40,
        borderRadius: 15,
        marginTop: 20,
        padding: 10
    },
    btnText: {
        color: "white",
        // lineHeight: 35,
        fontWeight: "bold",
        marginLeft: "auto",
        marginRight: "auto"
    },
    containerProduct: {
        backgroundColor: '#04764e',
        padding: 10,
        height: 120,
        alignItems: "center",
        borderRadius: 15,
        width: 150,
        marginBottom:20
    },
    imgProduct: {
        width: 80,
        height: 80,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      carouselItem: {
        backgroundColor: 'white',
        borderRadius: 8,
        height: 200,
        padding: 20,
        marginLeft: 25,
        marginRight: 25,
        alignItems: 'center',
        justifyContent: 'center',
      },
      carouselImage: {
        width: '100%',
        height: '70%',
        borderRadius: 8,
        marginBottom: 10,
      },
      carouselTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
});