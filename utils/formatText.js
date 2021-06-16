const formattext=(user,text)=>{
return {
    user,
    txt:text,
}
}

function locationGenerator(username,coordinates){
    return {
        username,
        lat: coordinates.lat,
        lon: coordinates.lon
    }
}

module.exports={
    formattext,
    locationGenerator
}