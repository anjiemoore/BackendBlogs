const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Entry = require('../models/Entries')

// Login/Landing page
// GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

// Dashboard
// GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const entries = await Entry.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            entries
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }

})

module.exports = router