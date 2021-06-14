const moment= require('moment');

const formattext=(user,text)=>{
return {
    user,
    txt:text,
    time: moment().format('h:mm a')
}
}

module.exports=formattext;