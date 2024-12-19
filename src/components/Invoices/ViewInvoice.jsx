import React, { Component, useEffect, useState } from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "white",
    },
    section: {
        flexDirection: "row",
        padding: 10,
    },
    section1: {
        flexDirection: "column",
        padding: 15,
        width: "40vw",
        margin: "0px 310px",
        border: "1px solid black",
        marginTop: "-135px"
    },
    PosSection1: {
        textAlign: "left",
        width: "95%",
    },
    TextSection1: {
        textAlign: "center",
        fontSize: 13,
        flexDirection: "column",
    },
    section2: {
        padding: 10,
    },
    sectionClient: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 35,
        marginBottom: 500,
        position: "relative",
    },
    sectionClient2: {
        flexDirection: "row",
        margin: "-500px 35",
        height: "500px",
    },
    h1: {
        fontSize: 25,
        color: "#013368",
        marginLeft: 10,
        textAlign: "left",
    },
    h2: {
        fontSize: 15,

        color: "black",
        marginLeft: 10,
        textAlign: "left",
    },
    h3: {
        fontSize: 15,

        color: "black",
        marginLeft: 10,
        textAlign: "left",
    },
    p: {
        fontSize: 10,

        color: "black",
        marginTop: 10,
        marginLeft: 10,
        textAlign: "left",
    },
    FactureNumber: {
        fontSize: 12,

        color: "#013368",
        marginLeft: 10,
        textAlign: "left",
    },
    FacturePosition: {
        fontSize: 12,
        color: "black",
        marginLeft: 10,
        textAlign: "left",
    },
    FactureClient: {
        fontSize: 10,
        color: "black",
        height: "20px",
        width: "500px",
        border: "1px solid black",
        textAlign: "center",
        display: "flex",
        padding: "2px 0px",
    },
    FactureClient2: {
        fontSize: 15,
        color: "black",
        border: "1px solid black",
        textAlign: "center",
        height: "500px",
        width: "550px",
    },
    // TABLE
    pageStyle: {
        paddingTop: 16,
        paddingHorizontal: 40,
        paddingBottom: 56,
    },

    tableStyle: {
        Style: "table",
        width: "auto",
    },

    tableRowStyle: {
        flexDirection: "row",
        width: "550px",
    },

    tableRowStyle2: {
        flexDirection: "row",
    },

    firstTableColHeaderStyle: {
        width: "20%",
        borderStyle: "solid",
        borderColor: "#000",
        borderBottomColor: "#000",
        borderWidth: 1,
        backgroundColor: "white",
    },

    firstTableColHeaderStyle2: {
        width: "100%",
        borderStyle: "solid",
        borderColor: "#000",
        borderBottomColor: "#000",
        backgroundColor: "white",
    },

    firstTableColHeaderStyle3: {
        width: "100%",
    },

    tableColHeaderStyle: {
        width: "20%",
        borderStyle: "solid",
        borderColor: "#000",
        borderBottomColor: "#000",
        borderWidth: 1,
        backgroundColor: "white",
    },

    firstTableColStyle: {
        width: "20%",
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderTopWidth: 0,
    },

    tableColStyle: {
        width: "20%",
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },

    tableCellHeaderStyle: {
        textAlign: "center",
        margin: 2,
        fontSize: 7,
        fontWeight: "bold",
    },
    tableCellHeaderStyle3: {
        textAlign: "center",
        margin: 4,
        fontSize: 8,
        fontWeight: "bold",
    },
    tableCellHeaderStyleTotalHT: {
        textAlign: "center",
        margin: 4,
        fontSize: 8,
        fontWeight: "bold",
    },

    tableCellStyle: {
        textAlign: "center",
        margin: 5,
        fontSize: 10,
    },
    sectionCollumn: {
        display: "flex",
        width: "100%",
        alignItems: "center",
    },
});
function ViewInvoice({info}) {

    return info ? (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section2}>
                        <Text style={styles.h1}>MORYSON S.A.R.L</Text>
                        <Text style={styles.h2}>Le Garnoy</Text>
                        <Text style={styles.h2}>71670 LE BREUIL</Text>
                        <Text style={styles.h2}>TEL : 0385781952</Text>
                        <Text style={styles.h3}>PORT : 0385781952</Text>
                        <Text style={styles.p}>SARL au capital de 68 000€</Text>
                        <Text style={styles.p}>
                            R.C.S.Autun 87.B.10 - Siret 340 787 522 00036 - NAF 4941A
                        </Text>
                        <View style={styles.PosSection1}>
                            <View style={styles.section1}>
                                <Text style={styles.TextSection1}>{info?.customerName}</Text>
                                <Text style={styles.TextSection1}>
                                    {info?.customerAddress}
                                </Text>
                                <Text style={styles.TextSection1}>
                                    {info?.customerZipCode + " " + info?.customerCity}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.FactureNumber}>
                            FACTURE N° {info?.invoiceNumber}
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.FacturePosition}>
                            Le Breuil le, {new Date(info?.issuanceDate).toLocaleDateString('fr-FR')}
                        </Text>
                    </View>
                    <View style={styles.sectionCollumn}>
                        <View style={styles.tableRowStyle} fixed>
                            <View style={styles.firstTableColHeaderStyle}>
                                <Text style={styles.tableCellHeaderStyle}>DATE</Text>
                            </View>

                            <View style={styles.tableColHeaderStyle}>
                                <Text style={styles.tableCellHeaderStyle}>
                                    ENLEVEMENT
                                </Text>
                            </View>

                            <View style={styles.tableColHeaderStyle}>
                                <Text style={styles.tableCellHeaderStyle}>
                                    LIVRAISON
                                </Text>
                            </View>

                            <View style={styles.tableColHeaderStyle}>
                                <Text style={styles.tableCellHeaderStyle}>
                                    VOS REFERENCES
                                </Text>
                            </View>

                            <View style={styles.tableColHeaderStyle}>
                                <Text style={styles.tableCellHeaderStyle}>
                                    PRIX H.T
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* CHAMIN 1 */}
                    <View style={styles.sectionCollumn}>
                        <View style={styles.tableRowStyle} fixed>
                            <View style={styles.firstTableColHeaderStyle}>
                                {info?.dateList?.map((input, index) => (
                                    <div key={index}>
                                        <Text style={styles.tableCellHeaderStyle}>
                                            {new Date(input).toLocaleDateString('fr-FR')}
                                        </Text>
                                    </div>
                                ))}
                            </View>

                            <View style={styles.tableColHeaderStyle}>
                                <View style={styles.firstTableColHeaderStyle2}>
                                    {info?.pickupList?.map((input2, index2) => (
                                        <div key={index2}>
                                            <Text style={styles.tableCellHeaderStyle}>
                                                {input2}
                                            </Text>
                                        </div>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.tableColHeaderStyle}>
                                <View style={styles.firstTableColHeaderStyle2}>
                                    {info?.deliveryList?.map((input3, index3) => (
                                        <div key={index3}>
                                            <Text style={styles.tableCellHeaderStyle}>
                                                {input3}
                                            </Text>
                                        </div>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.tableColHeaderStyle}>
                                <View style={styles.firstTableColHeaderStyle2}>
                                    {info?.referenceList?.map((input4, index4) => (
                                        <div key={index4}>
                                            <Text style={styles.tableCellHeaderStyle}>
                                                {input4}
                                            </Text>
                                        </div>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.tableColHeaderStyle}>
                                <View style={styles.firstTableColHeaderStyle2}>
                                    {info?.priceList?.map((input5, index5) => (
                                        <div key={index5}>
                                            <Text style={styles.tableCellHeaderStyle}>
                                                {parseFloat(input5).toFixed(2)} €
                                            </Text>
                                        </div>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.sectionCollumn}>
                        <View style={styles.tableRowStyle} fixed>
                            <View style={styles.firstTableColHeaderStyle}>
                                <Text style={styles.tableCellHeaderStyle}>
                                    FR.95 804 470 433
                                </Text>
                                <Text style={styles.tableCellHeaderStyle}></Text>
                                <Text style={styles.tableCellHeaderStyle}>
                                    En votre aimable reglement : A 30 JOURS
                                </Text>
                            </View>

                            <View style={styles.tableColHeaderStyle}></View>

                            <View style={styles.tableColHeaderStyle}></View>

                            <View style={styles.tableColHeaderStyle}>
                                <Text style={styles.tableCellHeaderStyle3}>
                                    MONTANT H.T.€
                                </Text>
                                <Text style={styles.tableCellHeaderStyle3}>T.V.A.%</Text>
                                <Text style={styles.tableCellHeaderStyle3}>
                                    MONTANT T.V.A.%
                                </Text>
                                <Text style={styles.tableCellHeaderStyle3}>
                                    MONTANT T.T.C.€
                                </Text>
                            </View>

                            <View style={styles.tableColHeaderStyle}>
                                <Text style={styles.tableCellHeaderStyleTotalHT}>
                                    {info?.TotalHT?.toFixed(2)}  €
                                </Text>
                                <Text style={styles.tableCellHeaderStyleTotalHT}>
                                    20%
                                </Text>
                                <Text style={styles.tableCellHeaderStyleTotalHT}>
                                    {info?.TotalTVA?.toFixed(2)}  €
                                </Text>
                                <Text style={styles.tableCellHeaderStyleTotalHT}>
                                    {info?.TotalTTC?.toFixed(2)} €
                                </Text>
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
    ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <h1>Cette facture n'existe pas</h1>
            <p>ID INTROUVABLE : {info.idInvoice}</p>
        </div>
    )
}

export default ViewInvoice