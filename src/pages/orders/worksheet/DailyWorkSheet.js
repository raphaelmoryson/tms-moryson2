import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#f5f7fa',
        padding: 10,  // Réduction des marges
        flexDirection: 'column',
    },
    headerContainer: {
        backgroundColor: '#013368',
        color: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 15,
        textAlign: 'center',
        borderRadius: 5,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 1,
    },
    headerDate: {
        fontSize: 12,
        fontWeight: 'normal',
        marginBottom: 5,
    },
    logo: {
        width: 120,
        height: 70,
        marginBottom: 5,
        alignSelf: 'center',
    },
    taskContainer: {
        marginBottom: 12,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderLeft: '4px solid #013368',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    taskHeader: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#013368',
        marginBottom: 3,
    },
    taskInfo: {
        marginVertical: 3,
        fontSize: 10,
    },
    boldText: {
        fontWeight: 'bold',
    },
    highlightedText: {
        fontWeight: 'bold',
        backgroundColor: '#eaf4ff',
        paddingHorizontal: 3,
        borderRadius: 3,
    },
    footer: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 9,
        color: '#555',
    },
});


function DailyWorkSheet({ id, dateOrders }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchInfo() {
            try {
                setLoading(true);
                const dateQuery = `?date=${dateOrders}`;
                const response = await fetch(`/api/orders/todayDrivers/${parseInt(id)}${dateQuery}`, {
                    method: 'GET',
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                    },
                });

                console.log(`Fetching: /api/orders/todayDrivers/${parseInt(id)}${dateQuery}`);

                if (!response.ok) throw new Error("Failed to fetch data");
                const result = await response.json();

                if (result.message) {
                    setError(result.message);
                } else {
                    setData(result);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchInfo();
    }, [id, dateOrders]);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;
    if (!data.length) return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text>Aucun travail pour aujourd'hui.</Text>
            </Page>
        </Document>
    );

    const sortedData = [...data].sort((a, b) => new Date(a.deliveryDate) - new Date(b.deliveryDate));

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.headerContainer}>
                    <Image style={styles.logo} src="/logo.png" />
                    <Text style={styles.headerText}>Fiche de Travail - Ramassage</Text>
                    <Text style={styles.headerDate}>
                        Date : {new Date(dateOrders).toLocaleDateString()}
                    </Text>
                </View>

                {sortedData.map((item, index) => (
                    <View key={index} style={styles.taskContainer}>
                        <Text style={styles.taskHeader}>
                            Tâche #{index + 1} - enl / {item.type}
                        </Text>

                        <Text style={styles.taskInfo}>
                            <Text style={styles.boldText}>Adresses :</Text>{' '}
                            <Text style={styles.highlightedText}>{item.pickupAddress}</Text> à{' '}
                            <Text style={styles.highlightedText}>{item.deliveryAddress}</Text>
                        </Text>

                        {item.specialInstructions && (
                            <Text style={styles.taskInfo}>
                                <Text style={styles.boldText}>Instructions :</Text> {item.specialInstructions}
                            </Text>
                        )}

                        <Text style={styles.taskInfo}>
                            <Text style={styles.boldText}>Référence :</Text> {item.ref} |
                            <Text style={styles.boldText}> Poids :</Text> {item.weight} kg |
                            <Text style={styles.boldText}> UM :</Text> {item.dimensions}
                        </Text>
                        <Text style={styles.taskInfo}>
                            <Text style={styles.boldText}>Date et Heure :</Text> {new Date(item.deliveryDate).toLocaleDateString()} à{' '}
                            {new Date(item.deliveryDate).toLocaleTimeString()}
                        </Text>
                    </View>
                ))}

                <Text style={styles.footer}>
                    Ce document a été généré automatiquement. Veuillez vérifier les informations avant utilisation.
                </Text>
            </Page>
        </Document>
    );
}

export default DailyWorkSheet;
