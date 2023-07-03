const getDrugsQuery = () => `SELECT * WHERE {?s ?p ?o}`;

const getDrugByIdQuery = (drugId) => `
PREFIX fhir: <http://hl7.org/fhir/>
SELECT ?s ?p ?o
WHERE {
  ?s fhir:MedicationKnowledge_id "${drugId}" ;
     ?p ?o .
}`;


const createDrugQuery = (drugInfor) => {
  const { drugName, registerCode, apothecapy, registerCompany } = drugInfor;
  const drugId = 2;
  return `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX fhir: <http://hl7.org/fhir/>
    PREFIX drug: <https://tranbau.solidcommunity.net/vaipe/drugs#>
    
    INSERT DATA {
        drug:drugName${drugId} rdf:type fhir:MedicationKnowledge;
        rdfs:label "Drug information";
        fhir:MedicationKnowledge_id "${drugId}";
        fhir:MedicationKnowledge_name "${drugName}";
        fhir:Medication_code "${registerCode}";
        fhir:MedicationKnowledge_author "${apothecapy}";
        fhir:Medication_marketingAuthorizationHolder "${registerCompany}".
    }`;
};

const updateDrugQuery = (id, drugInfor) => {
  const { drugName, registerCode, apothecapy, registerCompany } = drugInfor;
  return `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX fhir: <http://hl7.org/fhir#>
    PREFIX drug: <https://tranbau.solidcommunity.net/vaipe/drugs#>

    DELETE * 
    
    INSERT DATA {
        drug:drugName rdf:type fhir:MedicationKnowledge;
        rdfs:label "Drug information";
        fhir:MedicationKnowledge_id "${id}";
        fhir:MedicationKnowledge_name "${drugName}";
        fhir:Medication_code "${registerCode}";
        fhir:MedicationKnowledge_author "${apothecapy}";
        fhir:Medication_marketingAuthorizationHolder "${registerCompany}".
    }`;
};

const deleteDrugQuery = (drugInfor) => {};

module.exports = {
  getDrugsQuery,
  getDrugByIdQuery,
  createDrugQuery,
  updateDrugQuery,
  deleteDrugQuery,
};
