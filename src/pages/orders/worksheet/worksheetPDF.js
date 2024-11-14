import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    headerContainer: {
        backgroundColor: '#013368',
        color: '#fff',
        padding: 10,
        textAlign: 'center',
    },
    headerText: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    logo: {
        width: 180,
        height: 100,
        margin: '0 auto',
    },
    footer: {
        backgroundColor: '#013368',
        height: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    section: {
        margin: 10,
        padding: 10,
        border: '1px solid #013368',
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        color: '#013368',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        marginVertical: 5,
    },
    arrowSection: {
        marginVertical: 20,
        textAlign: 'center',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#013368',
    },
});

const WorkSheetDocument = ({ orderDetails }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.headerContainer}>
                    <Image style={styles.logo} src={"/logo.png"} />
                    <Text style={styles.headerText}>Fiche de Travail</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Détails de la Commande</Text>
                    <Text style={styles.text}>ID de Commande: <Text style={styles.boldText}>{orderDetails.id}</Text></Text>
                    <Text style={styles.text}>Point de départ: <Text style={styles.boldText}>{orderDetails.pickupAddress}</Text></Text>
                    <Text style={styles.text}>Destination: <Text style={styles.boldText}>{orderDetails.deliveryAddress}</Text></Text>
                    <Text style={styles.text}>Quantité: <Text style={styles.boldText}>{orderDetails.quantity}</Text> palettes</Text>
                    <Text style={styles.text}>Poids: <Text style={styles.boldText}>{orderDetails.weight}</Text> kg</Text>
                    <Text style={styles.text}>Statuts: <Text style={styles.boldText}>{orderDetails.status === "IN_PROGRESS" ? "En cours" : "Livré"}</Text></Text>
                    <Text style={styles.text}>Date de Livraison: <Text style={styles.boldText}>{new Date(orderDetails.deliveryDate).toLocaleDateString()}</Text></Text>
                    <Text style={styles.text}>ID du Chauffeur: <Text style={styles.boldText}>{orderDetails.driverId}</Text></Text>
                </View>

                <View style={styles.arrowSection}>
                    <Text style={styles.title}>Itinéraire</Text>
                    <Text style={styles.text}>
                        De: <Text style={styles.boldText}>{orderDetails.pickupAddress}</Text> à <Text style={styles.boldText}>{orderDetails.deliveryAddress}</Text>
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Instructions Spéciales</Text>
                    <Text style={styles.text}>{orderDetails.instructions ? orderDetails.instructions : "Aucune instruction"}</Text>
                </View>

                <View style={styles.footer}></View>
            </Page>
        </Document>
    );
};

export default WorkSheetDocument;
