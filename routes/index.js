const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story')
// Login/Landing page
// GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

// Dashboard
// GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {

    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }

})

module.exports = router