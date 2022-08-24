import express from "express";
const app = express(); // создаем приложение
const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello world")
})

app.get("/home", (req, res) => {
	res.send("Hello home")
})

app.post("/home", (req, res) => {
	res.send("Post home")
})

app.listen(port, () => {
	console.log(`Example ${port}`)
})
