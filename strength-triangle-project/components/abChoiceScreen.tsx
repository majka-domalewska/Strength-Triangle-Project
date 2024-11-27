import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getAnswers } from '@/backend/dataController';

const DisplayAnswers = () => {
    const { i18n } = useTranslation();
    const [ data, setData ] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const { answersEn } = await getAnswers();
            if (Array.isArray(answersEn) && answersEn.length > 0) {
                setData(answersEn);
                console.log(`Fetched data: ${answersEn}`);
            } else {
                console.warn("No data found or malformed response");
                setData([]);
            }
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
            setData([]);
        }
        fetchData();
    }, []);

    if (!data) {
        return <Text>Loading...</Text>
    }

    return (
        <View style={styles.container}>
            {data && data.length > 0 ? (
                data.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <Text style={styles.name}>{item.name || "Unnamed"}</Text>
                        
                        {/* Display A and B sections with safety checks */}
                        <View style={styles.choiceContainer}>
                            <Text style={styles.title}>
                                {item.A?.title || "No title for A"}
                            </Text>
                            <Text style={styles.explanation}>
                                {item.A?.explanation || "No explanation for A"}
                            </Text>
                        </View>
                        <View style={styles.choiceContainer}>
                            <Text style={styles.title}>
                                {item.B?.title || "No title for B"}
                            </Text>
                            <Text style={styles.explanation}>
                                {item.B?.explanation || "No explanation for B"}
                            </Text>
                        </View>
    
                        {/* Optionally display nextId values */}
                        <Text style={styles.nextId}>Next ID A: {item.nextId?.A || "N/A"}</Text>
                        <Text style={styles.nextId}>Next ID B: {item.nextId?.B || "N/A"}</Text>
                    </View>
                ))
            ) : (
                <Text>No data available</Text>
            )}
        </View>
    );
    

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