import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#2A9D8F',
    },
    section: {
        margin: 10,
        padding: 10,
        border: '1px solid #2A9D8F',
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        color: '#264653',
    },
    text: {
        margin: 5,
        fontSize: 14,
    },
    arrow: {
        stroke: '#2A9D8F',
        strokeWidth: 2,
        fill: 'none',
    },
    arrowHead: {
        fill: '#2A9D8F',
    },
});

const WorkSheetDocument = ({ orderDetails }) => {

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>Fiche de Travail</Text>
                <View style={styles.section}>
                    <Text style={styles.title}>Détails de la Commande</Text>
                    <Text style={styles.text}>ID de Commande: {orderDetails.id}</Text>
                    <Text style={styles.text}>Point de départ: {orderDetails.pickupAddress}</Text>
                    <Text style={styles.text}>Destination: {orderDetails.deliveryAddress}</Text>
                    <Text style={styles.text}>Quantité: {orderDetails.quantity} palettes</Text>
                    <Text style={styles.text}>Poids: {orderDetails.weight} kg</Text>
                    <Text style={styles.text}>Status: {orderDetails.status == "IN_PROGRESS" ? "En cours" : "Livré"}</Text>
                    <Text style={styles.text}>Date de Livraison: {new Date(orderDetails.deliveryDate).toLocaleDateString()}</Text>
                    <Text style={styles.text}>ID du Chauffeur: {orderDetails.driverId} </Text>
                </View>

                {/* Draw the arrow */}
                <View style={{ marginVertical: 20 }}>
                    <Text style={styles.title}>Itinéraire</Text>
                    <Text style={styles.text}>De: {orderDetails.pickupAddress} à: {orderDetails.deliveryAddress}</Text>

                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Instructions Spéciales</Text>
                    <Text style={styles.text}>{orderDetails.instructions}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default WorkSheetDocument;
