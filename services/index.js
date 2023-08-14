const QueryEngine = require("@comunica/query-sparql-solid").QueryEngine;

const myEngine = new QueryEngine();

// sparqlQuery with source and authenticated session
//For GET
const sparqlQuery = async (query, source, session) => {
  const bindingsStream = await myEngine.queryBindings(query, {
    sources: [source], 
    "@comunica/actor-http-inrupt-solid-client-authn:session": session,
  });

  bindingsStream
    .on("data", async (binding) => {
    })
    .on("end", () => {
      console.log("Done");
    })
    .on("error", (error) => {
      console.log(error.message);
      return "error";
    });

  const data = (await bindingsStream.toArray());
  return data;
};

//For POST, PUT, DELETE
const sparqlUpdate = async (query, source, session) => {
  try {
    const result = await myEngine.queryVoid(query, {
      sources: [source],
      destination: { type: 'sparql', value: source },
      '@comunica/actor-http-inrupt-solid-client-authn:session': session,
    });
    return 'Successfully';
  } catch (error) {
    return error.message ;
  }
};

module.exports = {
  sparqlQuery,
  sparqlUpdate,
};
