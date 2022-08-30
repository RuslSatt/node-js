import express, {Request, Response} from "express";
import {RequestBody, RequestParams, RequestParamsBody, RequestQuery} from "./types";
import {
    CourseCreateModel,
    CourseParamsModel,
    CourseQueryModel,
    CourseUpdateModel,
    CourseViewModel
} from "./models/models";

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

type CourseType = {
    id: number,
    title: string,
    studentsCount: number,
}

const db: {courses: CourseType[]} = {
    courses: [
        {id: 1, title: "front-end", studentsCount: 10},
        {id: 2, title: "back-end", studentsCount: 6},
        {id: 3, title: "database", studentsCount: 25},
        {id: 4, title: "native", studentsCount: 8},
    ]
}

const getCourseViewModel = (dbCourse: CourseType): CourseViewModel => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    }
}

app.get("/courses", (req: RequestQuery<CourseQueryModel>, res: Response<CourseViewModel[]>) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter(elem => elem.title.indexOf(req.query.title) !== -1);
    }

    const correctCourses = foundCourses.map(getCourseViewModel)
    res.json(correctCourses);
})

app.get("/courses/:id", (req: RequestParams<CourseParamsModel>, res: Response<CourseViewModel>) => {
    const foundCourse = db.courses.find(elem => elem.id === +req.params.id);

    foundCourse
        ? res.json(getCourseViewModel(foundCourse))
        : res.sendStatus(HTTP_STATUSES.NOT_FOUND_ERR);
})

app.post('/courses', (req: RequestBody<CourseCreateModel>, res: Response<CourseViewModel>) => {
    if (req.body.title) {
        const newCourse: CourseType = {
            id: +(new Date()),
            title: req.body.title,
            studentsCount: 1,
        }
        db.courses.push(newCourse);
        res.status(HTTP_STATUSES.CREATED).json(getCourseViewModel(newCourse));
    } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST);
    }
})

app.put("/courses/:id", (req: RequestParamsBody<CourseParamsModel, CourseUpdateModel>, res) => {
    if (req.body.title) {
        const foundCourse = db.courses.find(elem => elem.id === +req.params.id);
        if (foundCourse) {
            foundCourse.title = req.body.title
            res.sendStatus(HTTP_STATUSES.NO_CONTENT);
        } else {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_ERR);
        }
    } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST);
    }
})

app.delete("/courses/:id", (req: RequestParams<CourseParamsModel>, res) => {
    const deleteCourse = db.courses.find(item => item.id === +req.params.id);
    if (deleteCourse) {
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

