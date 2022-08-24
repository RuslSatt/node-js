const express = require("express");
const app = express(); // создаем приложение
const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello world")
})

app.get("/home", (req, res) => {
	res.send('Hello home')
})

app.listen(port, () => {
	console.log(`Example ${port}`)
})
