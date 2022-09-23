const express = require('express')
const app = express()
const port = 3000
const activityGroupRouter = require('./routes/ActivityGroup')
const todoRouter = require('./routes/Todo')
const db = require('./models')

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
// db.sequelize.sync({ force: true })
	.then(() => {
		console.log('db synced')
	})
	.catch((error) => {
		console.error('error on sync: ', error.message)
	})

// https://documenter.getpostman.com/view/7918444/UVJhEabr#e43f3c43-b9ba-495c-8ee9-5c8f59814331
app.get('/', (req, res) => {
	res.send({
		message: "welcome back!"
	})
})
app.use('/activity-groups', activityGroupRouter)
app.use('/todo-items', todoRouter)

app.listen(port, () => {
	console.log(`app started at http://localhost:${port}`)
})