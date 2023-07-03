const vocabulariesMapping = require('./vocabularies.mapping')

const triplesMapping = (wayMapping,schema,triples) =>{
    //group all triples with same subject (same thing / instance)
    const subjects = Array.from(new Set(triples.map(triple => triple.s.value))).map(e =>({
        s: e
    }));

    //request
    if(wayMapping == 1){
        return [];

    }

    //response
    else{
        triples.map(triple => {
            for(let subject of subjects){
                if(triple.s.value === subject.s) {
                    const mappingVoca = vocabulariesMapping(wayMapping,schema,triple.p.value);
                    if( mappingVoca){ subject[mappingVoca] = triple.o.value;
                    }
                }
            }
            return triple
        });
        return subjects;
    }
}

module.exports = triplesMapping