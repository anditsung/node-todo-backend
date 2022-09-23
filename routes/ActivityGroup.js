const e = require('express');
const express = require('express');
const router = express.Router();
const ActivityGroup = require('../actions/ActivityGroup')

router.get('/:group_id?', async(req, res) => {
    const group_id = req.params.group_id
    let result = {}
    if (group_id) {
        result = await ActivityGroup.getOne(group_id)
    } else {
        result = await ActivityGroup.getAll()
    }

    res.status(result.code).json(result.response)
})

router.post('/', async(req, res) => {
    const result = await ActivityGroup.create(
        req.body.title,
        req.body.email
    )

    res.status(result.code).json(result.response)
})

router.put('/:group_id', async(req, res) => {
    const value = {
        ...(req.body.title && { title: req.body.title }),
        ...(req.body.email && { email: req.body.email }),
    }
    const result = await ActivityGroup.update(req.params.group_id, value)
    res.status(result.code).json(result.response)
})

router.delete('/:group_id', async(req, res) => {
    const result = await ActivityGroup.destroy(req.params.group_id)

    res.status(result.code).json(result.response)    
})

module.exports = router;