const express = require('express');
const router = express.Router();
const TodoItem = require('../actions/TodoItem')

router.get('/:item_id?', async(req, res) => {
    const item_id = req.params.item_id
    let result = {}
    if (item_id) {
        result = await TodoItem.getOne(item_id)
    } else {
        result = await TodoItem.getAll()
    }
    res.status(result.code).json(result.response)
})

router.post('/', async(req, res) => {
    const result = await TodoItem.create(
        req.body.activity_group_id,
        req.body.title
    )

    res.status(result.code).json(result.response)
})

router.put('/:item_id', async(req, res) => {
    const value = {
        ...(req.body.title && { title: req.body.title }),
        ...(req.body.is_active && { is_active: req.body.is_active }), 
    }
    const result = await TodoItem.update(req.params.item_id, value)

    res.status(result.code).json(result.response)
})

router.delete('/:item_id', async(req, res) => {
    const result = await TodoItem.destroy(req.params.item_id)

    res.status(result.code).json(result.response)
})

module.exports = router;