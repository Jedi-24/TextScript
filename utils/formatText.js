const moment= require('moment');

/*const time = moment.tz(response.timestamp)
const localtz = moment.tz.guess()
const date = time.clone().tz(localtz)*/

const formattext=(user,text)=>{
return {
    user,
    txt:text,
    time: moment.format('h:mm a')
}
}

module.exports=formattext;