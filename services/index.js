const QueryEngine = require("@comunica/query-sparql-solid").QueryEngine;

const myEngine = new QueryEngine();
const sparqlQuery = async (query, source, session) => {
  const bindingsStream = await myEngine.queryBindings(query, {
    sources: [source], // Sets your profile as query source
    "@comunica/actor-http-inrupt-solid-client-authn:session": session,
  });

  bindingsStream
    .on("data", async (binding) => {
      console.log("Fetching data...");
    })
    .on("end", () => {
      console.log("Done");
    })
    .on("error", (error) => {
      console.log(error.message);
      return "error";
    });

  const data = (await bindingsStream.toArray()).map(e => e.entries);
  return data;
};

const sparqlUpdate = async (query, source, session) => {
  await myEngine
    .queryVoid(query, {
        sources : {source},
        destination: { type: 'sparql', value:source},
      "@comunica/actor-http-inrupt-solid-client-authn:session": session,
    })
    .then((result) => {
      console.log("Done");
      return { succes: "Updated successfully" };
    })
    .catch((error) => {
      console.log(error);
      return { error: error.message };
    });
   
};

module.exports = {
  sparqlQuery,
  sparqlUpdate,
};
