import React from 'react';
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
        fontSize: 11,
    },
    textLigne2: {
        marginTop: "12px",
        fontSize: 11,
    },
    textLigneInfo: {
        fontSize: 11,
    },
    textLigne3ins: {
        fontSize: 11,
    },
    ligne: {
        marginTop: "15px",
        borderTop: "1px solid #013368",
        borderBottom: "1px solid #013368",
        height: "50px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    infoOrder: {
        marginLeft: "auto", // Aligns this container to the right within 'ligne'
        textAlign: "right",
    },
});

function DailyWorkSheet() {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.headerContainer}>
                    <Image style={styles.logo} src="/logo.png" />
                    <Text style={styles.headerText}>Fiche de Travail - Ramasse</Text>
                    <Text style={styles.headerDate}>{new Date().toLocaleDateString()}</Text>
                </View>

                <View style={styles.ligne}>
                    <View>
                        <Text style={styles.textLigne}>1/enl - chargement</Text>
                        <Text style={styles.textLigne2}>Instructions spéciales :</Text>
                        <Text style={styles.textLigne3ins}></Text>
                    </View>
                    <View style={styles.infoOrder}>
                        <Text style={styles.textLigneInfo}>UM : </Text>
                        <Text style={styles.textLigneInfo}>REF : </Text>
                        <Text style={styles.textLigneInfo}>P(Kgs) : </Text>

                    </View>
                    <View style={styles.infoOrder}>
                        <Text style={styles.textLigneInfo}>Date liv : </Text>


                    </View>
                </View>
            </Page>
        </Document>
    );
}

export default DailyWorkSheet;
