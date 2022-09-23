const db = require('../models')

const TodoItem = require('../models/todo-item.model')

const getAll = async() => {
    const todoItems = await TodoItem.findAll()

    return {
        code: 200,
        response: {
            status: "Success",
            message: "Success",
            data: todoItems,
        }
    }
}

const getOne = async(id) => {
    const todoItem = await TodoItem.findByPk(id)

    let status = "Not Found"
    let code = 404
    let message = `Activity with ID ${id} Not Found`
    let data = {}

    if (todoItem) {
        code = 200
        status = "Success"
        message = "Success"
        data = todoItem
    }

    return {
        code: code,
        response: {
            status: status,
            message: message,
            data: data,
        }
    }
}

const create = async(activity_group_id, title) => {
    const todoItem = await TodoItem.create({
        activity_group_id: activity_group_id,
        title: title
    })

    let status = "Error"
    let code = 404
    let data = {}

    if (todoItem) {
        code = 200
        status = "Success"
        data = todoItem
    }

    return {
        code: code,
        response: {
            status: status,
            message: status,
            data: data
        }
    }
}

const update = async(id, value) => {
    const todoItem = await TodoItem.findByPk(id)

    let status = "Not Found"
    let code = 404
    let message = `Activity with ID ${id} Not Found`
    let data = {}

    if (todoItem) {
        code = 200
        await todoItem.update(value)
        status = "Success"
        message = "Success"
        data = await TodoItem.findByPk(id)
    }

    return {
        code: code,
        response: {
            status: status,
            message: message,
            data: data,
        }
    }
}

const destroy = async(id) => {
    const todoItem = await TodoItem.findByPk(id)

    let status = "Not Found"
    let code = 404
    let message = `Activity with ID ${id} Not Found`
    let data = {}

    if (todoItem) {
        todoItem.destroy()
        code = 200
        status = "Success"
        message = "Success"
        data = {}
    }

    return {
        code: code,
        response: {
            status: status,
            message: message,
            data: data,
        }
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    destroy,
}