const db = require('../models')

const ActivityGroup = require('../models/activity-group.model')

const create = async(title, email) => {
    const activityGroup = await ActivityGroup.create({
        title: title,
        email: email,
    })

    let status = "Error"
    let code = 404
    let data = {}

    if (activityGroup) {
        code = 200
        status = "Success"
        data = activityGroup
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

const getOne = async(id) => {
    const activityGroup = await ActivityGroup.findByPk(id)

    let status = "Not Found"
    let code = 404
    let message = `Activity with ID ${id} Not Found`
    let data = {}

    if (activityGroup) {
        code = 200
        status = "Success"
        message = "Success"
        data = activityGroup
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

const getAll = async() => {
    const activityGroups = await ActivityGroup.findAll()

    return {
        code: 200,
        response: {
            status: "Success",
            message: "Success",
            data: activityGroups,
        }
    }
}

const destroy = async(id) => {
    const activityGroup = await ActivityGroup.findByPk(id)

    let status = "Not Found"
    let code = 404
    let message = `Activity with ID ${id} Not Found`
    let data = {}

    if (activityGroup) {
        activityGroup.destroy()
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

const update = async(id, value) => {
    const activityGroup = await ActivityGroup.findByPk(id)

    let status = "Not Found"
    let code = 404
    let message = `Activity with ID ${id} Not Found`
    let data = {}

    if (activityGroup) {
        code = 200
        await activityGroup.update(value)
        status = "Success"
        message = "Success"
        data = await ActivityGroup.findByPk(id)
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
    destroy,
    update,
}