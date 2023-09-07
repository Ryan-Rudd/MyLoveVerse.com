const router = require('express').Router()

router.get('/', (req, res)=>
{
    res.render('index')
})
router.get('/get-started', (req, res)=>
{
    res.render('getStarted')
})
router.get('/get-started/register', (req, res)=>
{
    res.render('register')
})
module.exports = router