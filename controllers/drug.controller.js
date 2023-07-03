const {
  getDrugsQuery,
  createDrugQuery,
  getDrugByIdQuery,
  updateDrugQuery,
  deleteDrugQuery,
} = require("../services/queries/drugs.query");
const { sparqlQuery, sparqlUpdate } = require("../services/index");
const drugVocabularies = require('../vocabularies/fhir/drugs.fhir.vocabulary')
const triplesMapping = require('../ultis/triples.mapping')

const source = "https://tranbau.solidcommunity.net/vaipe/drugs";

const createDrug = async (req, res, next) => {
  const session = JSON.parse(req.headers.session);
  const { drugInfor } = req.body;

  const data = await sparqlUpdate(createDrugQuery(drugInfor), source, session);
  return res.status(200).json({ data });
};

const getDrugs = async (req, res, next) => {
  const session = JSON.parse(req.headers.session);

  const queryData = await sparqlQuery(getDrugsQuery(), source, session);

  const responseData = triplesMapping(2,drugVocabularies,JSON.parse(JSON.stringify(queryData )));

  return res.status(200).json({ data: responseData });
};

const getDrugById = async (req, res, next) => {
  const session = JSON.parse(req.headers.session);
  const { id } = req.params;

  const data = await sparqlQuery(getDrugByIdQuery(id), source, session);
  const responseData = triplesMapping(2,drugVocabularies,JSON.parse(JSON.stringify(data)));

  return res.status(200).json({ data: responseData});
};

const updateDrug = async (req, res, next) => {
    const session = JSON.parse(req.headers.session);
    const { id } = req.params;
    const { drugInfor } = req.body;

    const data = await sparqlUpdate(updateDrug(id,drugInfor), source, session);
    return res.status(200).json({ data });
};

const deleteDrug = async (req, res, next) => {
    const session = JSON.parse(req.headers.session);
    const { id } = req.params;
  
    const data = await sparqlUpdate(deleteDrug(id), source, session);
    return res.status(200).json({ data });
};

module.exports = {
  createDrug,
  getDrugs,
  getDrugById,
  updateDrug,
  deleteDrug,
};
