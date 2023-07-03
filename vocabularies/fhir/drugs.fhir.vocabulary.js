const fhir = 'http://hl7.org/fhir/'
const drugVocabularies = {
    drugId: `${fhir}MedicationKnowledge_id`,
    drugName: `${fhir}MedicationKnowledge_name`,
    registerCode: `${fhir}Medication_code`,
    apothecapy: `${fhir}Medication_manufacturer`,
    guidle: `${fhir}MedicationKnowledge_administrationGuidelines`,
    warning: `${fhir}MedicationKnowledge_contraindication`,
    category: `${fhir}MedicationKnowledge_medicineClassification`,
    standard: `${fhir}MedicationKnowledge.regulatory`,
    country: `${fhir}MedicationKnowledge_author`,
    registerCompany: `${fhir}Medication_marketingAuthorizationHolder`,
}
module.exports = drugVocabularies