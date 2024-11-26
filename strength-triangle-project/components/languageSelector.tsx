import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Divider, List } from 'react-native-paper';
import '../backend/i18n.js';

const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();
    const [ expanded, setExpanded ] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const handlePress = () => setExpanded(!expanded);

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
        setExpanded(false);
    };

    useEffect(() => {
        setSelectedLanguage(i18n.language);
    }, [i18n.language]);

    return (
        <View style={styles.container}>
            <List.Section title="Language">
                <List.Accordion
                    title={selectedLanguage === "en" ? "English" : "Dutch" }
                    expanded={expanded}
                    onPress={handlePress}
                    left={props => <List.Icon {...props} icon="translate" />}
                >
                    <List.Item
                        title="English"
                        onPress={() => changeLanguage('en')}
                    />
                    <List.Item
                        title="Dutch"
                        onPress={() => changeLanguage('nl')}
                    />
                </List.Accordion>
            </List.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
    },
});

export default LanguageSelector;