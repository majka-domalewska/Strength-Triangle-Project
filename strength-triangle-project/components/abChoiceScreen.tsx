import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getAnswers } from '@/backend/dataController';

const DisplayAnswers = () => {
    const { i18n } = useTranslation();
    const [ data, setData ] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const { answersEn, answersNl } = await getAnswers();
            setData(answersEn);
        }
        fetchData();
    }, []);

    if (!data) {
        return <Text>Loading...</Text>
    }

    return (
        <View style={styles.container}>
        {data.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
                <Text style={styles.name}>{item.name}</Text>
                
                {/* Display A and B sections */}
                <View style={styles.choiceContainer}>
                    <Text style={styles.title}>{item.A.title}</Text>
                    <Text style={styles.explanation}>{item.A.explanation}</Text>
                </View>
                <View style={styles.choiceContainer}>
                    <Text style={styles.title}>{item.B.title}</Text>
                    <Text style={styles.explanation}>{item.B.explanation}</Text>
                </View>

                {/* Optionally display nextId values */}
                <Text style={styles.nextId}>Next ID A: {item.nextId.A}</Text>
                <Text style={styles.nextId}>Next ID B: {item.nextId.B}</Text>
            </View>
        ))}
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    itemContainer: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    choiceContainer: {
        marginTop: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    explanation: {
        fontSize: 14,
        color: '#666',
    },
    nextId: {
        fontSize: 12,
        color: '#333',
    },
});

export default DisplayAnswers;