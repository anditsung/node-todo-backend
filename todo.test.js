const db = require('./models')

const TodoItem = require('./actions/TodoItem')

describe('Test Todo Item', () => {
    test('can create resource', async() => {
        const result = await TodoItem.create(1, 'todo item')
        expect(result.response.data.title).toBe('todo item')
    })

    test('can get resource by id', async() => {
        const result = await TodoItem.getOne(1)
        expect(result.response.data.title).toBe('todo item')
    })

    test('cannot get invalid resource id', async() => {
        const result = await TodoItem.getOne(1000)
        expect(result.code).toBe(404)
    })

    test('get total resource', async() => {
        await TodoItem.create(3, 'todo item 3')
        await TodoItem.create(1, 'todo item 1')
        const result = await TodoItem.getAll()
        const total = result.response.data.length
        expect(total).toBe(3)
    })

    test('cannot update resource with invalid id', async() => {
        const result = await TodoItem.update(1000, { title: 'update resource' })
        expect(result.code).toBe(404)
    })

    test('can update resource title by id', async() => {
        const title = 'update title'
        const result = await TodoItem.update(1, { title: title})
        expect(result.response.data.title).toBe(title)
    })

    test('can update resource status', async() => {
        const status = true
        const result = await TodoItem.update(1, { is_active: status })
        expect(result.response.data.is_active).toBe(status)
    })

    test('can update resource status and title', async() => {
        const result = await TodoItem.update(1, { title: 'test', is_active: false })
        expect(result.code).toBe(200)
    })

    test('cannot delete invalid resource', async() => {
        const result = await TodoItem.destroy(1000)
        expect(result.code).toBe(404)
    })

    test('can delete resource', async() => {
        await TodoItem.destroy(2)
        const result = await TodoItem.getOne(2)
        expect(result.code).toBe(404)
    })
})

beforeAll( async () => {
    await db.sequelize.sync({ force: true })
})

afterAll( async() => {
    await db.sequelize.close()
})