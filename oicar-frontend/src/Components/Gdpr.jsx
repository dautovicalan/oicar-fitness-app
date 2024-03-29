import React from "react";
import { Box } from "@mui/material";

const Gdpr = () => {
  return (
    <div>
      <Box
      sx={{
        display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "98%",
          height: "70vh",
          backgroundColor: "whitesmoke",
          m: 1,
          p: 1,
      }}
      >
        <h1>TERMS OF SERVICE</h1>
        
        <p style={{ textAlign: "justify", width:"60%"}}>
          FITPAL Data Protection Policy Effective Date: 18.05.2023 Introduction
          FITPAL (referred to as "we," "us," or "our") is committed to
          protecting the privacy and personal data of individuals in accordance
          with the General Data Protection Regulation (GDPR) and other
          applicable data protection laws. This Data Protection Policy outlines
          our approach to data protection and explains how we collect, use,
          disclose, store, and protect personal data in relation to our
          application FITPAL. Scope This policy applies to all personal data
          processed by FITPAL in connection with the use of our FITPAL
          application by individuals ("users" or "you"). Definitions Personal
          Data: Any information relating to an identified or identifiable
          individual. Data Controller: The entity that determines the purposes
          and means of processing personal data. Data Processor: The entity that
          processes personal data on behalf of the data controller. Data
          Collection and Use 4.1 Personal Data We Collect When you use our
          FITPAL application, we may collect the following categories of
          personal data: Contact information (such as name, email address, phone
          number) Account credentials (username and password) Usage data (such
          as IP address, device information, and browsing activity) Any other
          personal data you voluntarily provide to us. 4.2 Purpose and Legal
          Basis for Data Processing We process personal data for the following
          purposes: To provide and maintain the functionality of our FITPAL
          application. To communicate with you regarding your use of the
          application. To analyze and improve the performance and user
          experience of the application. To comply with legal obligations. Our
          legal basis for processing personal data is the necessity for the
          performance of a contract between you and us and our legitimate
          interests in providing and improving our services. In certain cases,
          we may rely on your consent as a legal basis for processing. 4.3 Data
          Retention We will retain your personal data only for as long as
          necessary to fulfill the purposes outlined in this policy, unless a
          longer retention period is required or permitted by law. Data Sharing
          and Disclosure We may share personal data with third parties in the
          following circumstances: With your consent or at your direction. With
          service providers who assist us in operating and maintaining the
          application. With our affiliates or subsidiaries for the purposes
          described in this policy. When required by law or to protect our legal
          rights. Data Security We implement appropriate technical and
          organizational measures to protect personal data against unauthorized
          access, disclosure, alteration, or destruction. However, please note
          that no data transmission or storage can be guaranteed to be 100%
          secure. Your Rights As a user of our FITPAL application, you have
          certain rights regarding your personal data, including: The right to
          access and obtain a copy of your personal data. The right to rectify
          inaccurate or incomplete personal data. The right to request erasure
          of your personal data. The right to restrict or object to the
          processing of your personal data. The right to data portability. The
          right to withdraw consent (if applicable). To exercise your rights,
          please contact us using the information provided in Section 9.
          International Data Transfers We may transfer your personal data to
          recipients located in countries outside the European Economic Area
          (EEA) or your country of residence. We will ensure appropriate
          safeguards are in place to protect your personal data as required by
          applicable data protection laws. Contact Information If you have any
          questions, concerns, or requests regarding this Data Protection Policy
          or the processing of your personal data, please contact us at: FITPAL
          Algebra Uciliste fitpal@fitpal.com, +385 123 45678 Changes to this
          Policy We may update this Data Protection Policy from time to time.
        </p>
      </Box>
    </div>
  );
};

export default Gdpr;
