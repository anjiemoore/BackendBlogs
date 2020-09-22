const moment = require('moment')

module.exports = {
    formatDate: function (date, format) {
        return moment(date).format(format)
    }
}

//September 14th, 2020 at 5:29:27pm
