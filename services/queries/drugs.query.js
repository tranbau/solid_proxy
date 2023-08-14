const getDrugsQuery = () => `SELECT * WHERE {?s ?p ?o}`;

const getDrugByIdQuery = (drugId) => `
PREFIX fhir: <http://hl7.org/fhir/>
SELECT ?s ?p ?o
WHERE {
  ?s fhir:MedicationKnowledge_id "${drugId}" ;
     ?p ?o .
}`;

const getMaxDrugIdQuery = () => `
PREFIX fhir: <http://hl7.org/fhir/>
SELECT (MAX(?o) As ?nextId)
WHERE {
  ?s fhir:MedicationKnowledge_id ?o ;
}`;


const createDrugQuery = (drugId, drugInfor) => {
  const { drugName, registerCode, apothecapy, registerCompany } = drugInfor;
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

const updateDrugQuery = (drugId, drugInfor) => {
  const { drugName, registerCode, apothecapy, registerCompany } = drugInfor;
  return `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX fhir: <http://hl7.org/fhir#>
    PREFIX drug: <https://tranbau.solidcommunity.net/vaipe/drugs#>

    DELETE {?s ?p ?o}
    
    INSERT {
        drug:drugName${drugId} rdf:type fhir:MedicationKnowledge;
        rdfs:label "Drug information";
        fhir:MedicationKnowledge_id "${drugId}";
        fhir:MedicationKnowledge_name "${drugName}";
        fhir:Medication_code "${registerCode}";
        fhir:MedicationKnowledge_author "${apothecapy}";
        fhir:Medication_marketingAuthorizationHolder "${registerCompany}".
    }
    WHERE {
      ?s fhir:MedicationKnowledge_id "${drugId}" ;
         ?p ?o .
    }`;
};

const deleteDrugQuery = (drugId) => {
  return `
  PREFIX fhir: <http://hl7.org/fhir/>
  DELETE 
  WHERE {
    ?s fhir:MedicationKnowledge_id "${drugId}" ;
       ?p ?o .
  }`;
};

module.exports = {
  getDrugsQuery,
  getDrugByIdQuery,
  getMaxDrugIdQuery,
  createDrugQuery,
  updateDrugQuery,
  deleteDrugQuery,
};
