const moment = require('moment')
const format = require('date-fns/format')

module.exports = {
    formatDate: function (date, format) {
        return moment(date).format(format)
    }
}

//September 14th, 2020 at 5:29:27pm
