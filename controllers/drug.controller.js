const {
  getDrugsQuery,
  getDrugByIdQuery,
  getMaxDrugIdQuery ,
  createDrugQuery,
  updateDrugQuery,
  deleteDrugQuery,
} = require("../services/queries/drugs.query");
const { sparqlQuery, sparqlUpdate } = require("../services/index");
const drugVocabularies = require('../vocabularies/fhir/drugs.fhir.vocabulary')
const triplesMapping = require('../ultis/triples.mapping')

const source = "https://tranbau.solidcommunity.net/vaipe/drugs";//default for demo

const createDrug = async (req, res, next) => {
  const session = JSON.parse(req.headers.session);
  const { drugInfor } = req.body;

  let nextDrugId = 1;
  const getMaxDrugId  = await sparqlQuery(getMaxDrugIdQuery(), source, session);
  if(getMaxDrugId.length > 0 ) nextDrugId= Number(JSON.parse(JSON.stringify(getMaxDrugId))[0].entries.nextId.value) + 1;
  console.log(nextDrugId);

  const message = await sparqlUpdate(createDrugQuery(nextDrugId, drugInfor), source, session);
  return res.status(200).json({ data: {...drugInfor}, message  });
};


const getDrugs = async (req, res, next) => {
  const session = JSON.parse(req.headers.session);

  const queryData = await sparqlQuery(getDrugsQuery(), source, session);
  const triples = queryData.map(e => e.entries);

  console.log(JSON.stringify(triples));

  const responseData = triplesMapping(2,drugVocabularies,JSON.parse(JSON.stringify(triples)));

  console.log(JSON.stringify(triples));
  
  console.log(responseData);
  return res.status(200).json({ data: responseData });
};

const getDrugById = async (req, res, next) => {
  const session = JSON.parse(req.headers.session);
  const { id } = req.params;

  const queryData  = await sparqlQuery(getDrugByIdQuery(id), source, session);
  const triples = queryData.map(e => e.entries);
  const responseData = triplesMapping(2,drugVocabularies,JSON.parse(JSON.stringify(triples)));

  return res.status(200).json({ data: responseData});
};

const updateDrug = async (req, res, next) => {
    const session = JSON.parse(req.headers.session);
    const { id } = req.params;
    const { drugInfor } = req.body;

    let message  = await sparqlUpdate(deleteDrugQuery(id), source, session);
    message = await sparqlUpdate(createDrugQuery(id, drugInfor), source, session);
    return res.status(200).json({ data: {...drugInfor}, message });
};

const deleteDrug = async (req, res, next) => {
    const session = JSON.parse(req.headers.session);
    const { id } = req.params;
  
    const message = await sparqlUpdate(deleteDrugQuery(id), source, session);
    console.log(message);
    return res.status(200).json({ message });
};

module.exports = {
  createDrug,
  getDrugs,
  getDrugById,
  updateDrug,
  deleteDrug,
};
