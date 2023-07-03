const vocabulariesMapping = (wayMapping,schema,vocabulary) =>{
    const key_val = Object.entries(schema);
    //request
    if(wayMapping === 1){
        const findPair = key_val.find(e => e[0] === vocabulary);
        if(findPair) return findPair[0];
        return null;
    }
    //response
    else{
        const findPair = key_val.find(e => e[1] === vocabulary);
        if(findPair) return findPair[0];
        return null;
    }
}

module.exports = vocabulariesMapping