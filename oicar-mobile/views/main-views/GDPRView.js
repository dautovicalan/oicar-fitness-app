import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Button, Text } from "react-native-paper";

export default function GDPRView({ navigation }) {
  return (
    <ScrollView contentContainerStyle={style.container}>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        FITPAL (referred to as "we," "us," or "our") is committed to protecting
        the privacy and personal data of individuals in accordance with the
        General Data Protection Regulation (GDPR) and other applicable data
        protection laws. This Data Protection Policy outlines our approach to
        data protection and explains how we collect, use, disclose, store, and
        protect personal data in relation to our application FITPAL.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        Scope: This policy applies to all personal data processed by FITPAL in
        connection with the use of our FITPAL application by individuals
        ("users" or "you").
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }} t>
        Definitions:
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - Personal Data: Any information relating to an identified or
        identifiable individual.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - Data Controller: The entity that determines the purposes and means of
        processing personal data.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - Data Processor: The entity that processes personal data on behalf of
        the data controller.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        Data Collection and Use:
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        4.1 Personal Data We Collect
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }} t>
        When you use our FITPAL application, we may collect the following
        categories of personal data:
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - Contact information (such as name, email address, phone number)
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - Account credentials (username and password)
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - Usage data (such as IP address, device information, and browsing
        activity)
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - Any other personal data you voluntarily provide to us.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        4.2 Purpose and Legal Basis for Data Processing
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        We process personal data for the following purposes:
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - To provide and maintain the functionality of our FITPAL application.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - To communicate with you regarding your use of the application.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - To analyze and improve the performance and user experience of the
        application.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - To comply with legal obligations.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        Our legal basis for processing personal data is the necessity for the
        performance of a contract between you and us and our legitimate
        interests in providing and improving our services. In certain cases, we
        may rely on your consent as a legal basis for processing.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        4.3 Data Retention
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        We will retain your personal data only for as long as necessary to
        fulfill the purposes outlined in this policy, unless a longer retention
        period is required or permitted by law.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        Data Sharing and Disclosure
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        We may share personal data with third parties in the following
        circumstances:
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - With your consent or at your direction.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - With service providers who assist us in operating and maintaining the
        application.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - With our affiliates or subsidiaries for the purposes described in this
        policy.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - When required by law or to protect our legal rights.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        Data Security
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        We implement appropriate technical and organizational measures to
        protect personal data against unauthorized access, disclosure,
        alteration, or destruction. However, please note that no data
        transmission or storage can be guaranteed to be 100% secure.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        Your Rights
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        As a user of our FITPAL application, you have certain rights regarding
        your personal data, including:
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - The right to access and obtain a copy of your personal data.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - The right to rectify inaccurate or incomplete personal data.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - The right to request erasure of your personal data.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - The right to restrict or object to the processing of your personal
        data.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - The right to data portability.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        - The right to withdraw consent (if applicable).
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        To exercise your rights, please contact us using the information
        provided in Section 9.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        International Data Transfers
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        We may transfer your personal data to recipients located in countries
        outside the European Economic Area (EEA) or your country of residence.
        We will ensure appropriate safeguards are in place to protect your
        personal data as required by applicable data protection laws.
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        Contact Information
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        If you have any questions, concerns, or requests regarding this Data
        Protection Policy or the processing of your personal data, please
        contact us at:
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        FITPAL Algebra Uciliste fitpal@fitpal.com, +385 123 45678
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        Changes to this Policy
      </Text>
      <Text variant="titleSmall" style={{ textAlign: "justify" }}>
        We may update this Data Protection Policy from time to time.
      </Text>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 40,
    padding: 20,
  },
});
