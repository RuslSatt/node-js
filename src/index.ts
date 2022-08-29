import express from "express";

export const app = express(); // создаем приложение
const port = 3000;
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

export const HTTP_STATUSES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,

    BAD_REQUEST: 400,
    NOT_FOUND_ERR: 404,
}

const db = {
    courses: [
        {id: 1, title: "front-end"},
        {id: 2, title: "back-end"},
        {id: 3, title: "database"},
        {id: 4, title: "native"},
    ]
}

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.get("/home", (req, res) => {
    res.send("Hello home")
})

app.get("/courses", (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter(elem => elem.title.indexOf(req.query.title as string) !== -1);
    }
    res.json(foundCourses);
})

app.get("/courses/:id", (req, res) => {
    const foundCourse = db.courses.find(elem => elem.id === +req.params.id);
    foundCourse ? res.json(foundCourse) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_ERR);
})

app.post('/courses', (req, res) => {
    if(req.body.title) {
        const newCourse = {
            id: +(new Date()),
            title: req.body.title,
        }
        db.courses.push(newCourse);
        res.status(HTTP_STATUSES.CREATED).json(newCourse);
    } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST);
    }
})

app.put("/courses/:id", (req, res) => {
    if(req.body.title) {
        const foundCourse = db.courses.find(elem => elem.id === +req.params.id);
        if(foundCourse) {
            foundCourse.title = req.body.title
        } else {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_ERR);
        }
    } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST);
    }
})

app.delete("/courses/:id", (req, res) => {
    const deleteCourse = db.courses.find(item => item.id === +req.params.id);
    if(deleteCourse) {
        db.courses = db.courses.filter(item => item.id !== +req.params.id)
        res.sendStatus(HTTP_STATUSES.NO_CONTENT);
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_ERR);
    }
})

app.delete('/__test__/data', (req, res) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT);
})

app.listen(port, () => {
    console.log(`Example ${port}`)
})

