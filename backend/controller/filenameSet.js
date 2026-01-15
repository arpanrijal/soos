const {year,month,day,hour,minute,sec} = require('../controller/date_and_timehandler')
const UniqueFileNameSetter = (originalName) => {
    const originalname = Date.now() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + "-" + `${originalName}`
    return originalname
}

module.exports = UniqueFileNameSetter