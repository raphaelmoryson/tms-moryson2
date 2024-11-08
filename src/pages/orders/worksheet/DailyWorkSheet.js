import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    headerContainer: {
        backgroundColor: '#013368',
        color: '#fff',
        padding: 5,
        textAlign: 'center',
        height: "110px",
    },
    headerText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: "10px",
    },
    headerDate: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: "10px",
    },
    logo: {
        width: 120,
        height: 120,
        margin: '0 auto',
    },
    textLigne: {
        fontSize: 9,
    },
    textLigne2: {
        fontSize: 9,
    },
    textLigneInfo: {
        fontSize: 9,
    },
    textLigne3ins: {
        fontSize: 9,
        fontWeight: "bold"
    },
    totalLigne: {
        display: "flex",
        flexDirection: "column"
    },
    ligne: {
        borderTop: "1px solid #013368",
        borderBottom: "1px solid #013368",
        height: "50px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 1,
    },
    infoOrder: {
        marginLeft: "auto",
        textAlign: "right",
    },
});

function DailyWorkSheet({ id }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        async function fetchInfo() {
            try {
                const response = await fetch(`/api/orders/todayDrivers/${parseInt(id)}`);
                if (!response.ok) throw new Error("Failed to fetch data"); 
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); 
            }
        }
        fetchInfo();
    }, [id]);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error}</Text>;
    if (!data.length) return <Text>Aucun travail pour aujourd'hui.</Text>;
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.headerContainer}>
                    <Image style={styles.logo} src="/logo.png" />
                    <Text style={styles.headerText}>Fiche de Travail - Ramasse</Text>
                    <Text style={styles.headerDate}>{new Date().toLocaleDateString()}</Text>
                </View>
                <View style={styles.totalLigne}>
                    {data.map((item, index) => (
                        <View key={index} style={styles.ligne}>
                            <View>
                                <Text style={styles.textLigne}>{index + 1}/enl - {item.type}</Text>
                                <Text style={styles.textLigne}>Adresses : {item.pickupAddress} à {item.deliveryAddress}</Text>
                                <Text style={styles.textLigne2}>Instructions spéciales :</Text>
                                <Text style={styles.textLigne3ins}>{item.specialInstructions}</Text>
                            </View>
                            <View style={styles.infoOrder}>
                                <Text style={styles.textLigneInfo}>UM : {item.dimensions}</Text>
                                <Text style={styles.textLigneInfo}>REF : {item.ref}</Text>
                                <Text style={styles.textLigneInfo}>P(Kgs) : {item.weight}</Text>
                                <Text style={styles.textLigneInfo}>Details : {item.details}</Text>
                            </View>
                            <View style={styles.infoOrder}>
                                <Text style={styles.textLigneInfo}>Date liv/heur : {new Date(item.deliveryDate).toLocaleDateString()} à {new Date(item.deliveryDate).toLocaleTimeString()}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
}

export default DailyWorkSheet;
