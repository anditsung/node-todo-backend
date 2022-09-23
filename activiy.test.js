const db = require('./models')

const ActivityGroup = require('./actions/ActivityGroup')

describe('Test Activity Group', () => {
    
    test('can create resource', async() => {
        const result = await ActivityGroup.create('test', 'test@test.com')
        expect(result.response.data.title).toBe('test')
    })

    test('can get resource by id', async() => {
        const result = await ActivityGroup.getOne(1)
        expect(result.response.data.title).toBe('test')
    })

    test('cannot get invalid resource id', async() => {
        const result = await ActivityGroup.getOne(1000)
        expect(result.code).toBe(404)
    })

    test('get total resource', async() => {
        await ActivityGroup.create('test2', 'test2@test2.com')
        await ActivityGroup.create('test3', 'test2@test3.com')
        const result = await ActivityGroup.getAll()
        const total = result.response.data.length
        expect(total).toBe(3)
    })

    test('cannot update resource with invalid id', async() => {
        const result = await ActivityGroup.update(1000, 'update')
        expect(result.code).toBe(404)
    })

    test('can update resource title', async() => {
        const title = "update"
        const result = await ActivityGroup.update(1, { title: title})
        expect(result.response.data.title).toBe(title)
    })

    test('can update resource email', async() => {
        const email = "update@email.com"
        const result = await ActivityGroup.update(1, { email: email})
        expect(result.response.data.email).toBe(email)
    })

    test('can update resource email and title', async() => {
        const email = "update@email.com"
        const title = "update"
        const result = await ActivityGroup.update(1, { email: email, title: title})
        expect(result.code).toBe(200)
    })

    test('can delete resource', async() => {
        await ActivityGroup.destroy(2)
        const result = await ActivityGroup.getAll()
        const total = result.response.data.length
        expect(total).toBe(2)
    })

    test('cannot delete invalid resource id', async() => {
        const result = await ActivityGroup.destroy(1000)
        expect(result.code).toBe(404)
    })
})

beforeAll( async () => {
    await db.sequelize.sync({ force: true })
})

afterAll( async() => {
    await db.sequelize.close()
})