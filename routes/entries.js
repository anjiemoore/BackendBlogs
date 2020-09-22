const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Entries = require('../models/Entries')
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

// Show Public entries
//GET /entries/public
router.get('/public', ensureAuth, async (req, res) => {
    try {
        const entries = await Entries.find({ status: 'public' })
        .populate('user')
        .sort({ createdAt: 'desc' })
        .lean()

        res.render('entries/public', {
            entries
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }

})

// Show Private entries
//GET /entries/private
router.get('/private', ensureAuth, async (req, res) => {
    try {
        const entries = await Entries.find({ status: 'private' })
        .populate('user')
        .sort({ createdAt: 'desc' })
        .lean()

        res.render('entries/private', {
            entries
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

module.exports = router