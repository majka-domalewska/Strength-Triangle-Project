import React, { useState } from "react";
import {IntlProvider} from 'react-intl';
import { PaperProvider, List } from "react-native-paper";
import { StyleSheet } from "react-native";
// import English, Dutch from "";

const TranslationProvider = ({ children }) => {
    const [language, setLanguage] = useState("en");
    const [translations, setTranslations] = useState([]);

    // fetch the translation when the language changes
    useEffect(() => {
        fetch(``)
    })
}

    return (
        <PaperProvider>
            
        </PaperProvider>
    );
};

export default LoginSignupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "blue",
        minHeight: 100
    },
    field: {
        margin: 12,
        alignContent: "center"
    },
    popup: {
        margin: 0,
        position: "absolute"
    }
});