import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Divider, Menu } from 'react-native-paper';
import '../backend/i18n.js';

const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();
    const [ visible, setVisible ] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        closeMenu();
    };

    return (
        <View style={styles.view}>
            <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor= {
                <Button mode='contained' onPress={openMenu}>
                    Select language
                </Button>
                }
            >
                <Menu.Item onPress={() => changeLanguage("en")}
                    title="English"
                />
                <Divider />
                <Menu.Item onPress={() => changeLanguage("nl")}
                    title="Dutch"
                />
            </Menu>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        margin: 10,
        padding: 10,
    }
});

export default LanguageSelector;