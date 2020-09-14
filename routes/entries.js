const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Entry = require('../models/Entries')

// Show add journal entry page
// GET /entries/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('entries/add')
})

// Save add form
// POST /entries/
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Entry.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

module.exports = router