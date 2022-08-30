import request from "supertest";
import {app, HTTP_STATUSES} from "../../src";
import {CourseCreateModel, CourseUpdateModel} from "../../src/models/models";

describe('/index.ts', () => {

    beforeAll(async () => {
        await request(app).delete('/__test__/data');
    })

    let createdCourse: any = 1;

    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK, [])
    })

    it('should return 404 for not existing course', async () => {
        await request(app)
            .get('/courses/1')
            .expect(HTTP_STATUSES.NOT_FOUND_ERR);
    })

    it('should not create course if title does not have', async () => {
        await request(app)
            .post('/courses')
            .send({
                id: 2
            })
            .expect(HTTP_STATUSES.BAD_REQUEST)
    })

    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK, [])
    })

    it('should create course with correct data', async () => {
        const data: CourseCreateModel = {title: 'new course'}

        const response = await request(app)
            .post('/courses')
            .send(data)
            .expect(HTTP_STATUSES.CREATED);

        createdCourse = response.body;

        expect(createdCourse).toEqual({
            id: expect.any(Number),
            title: data.title,
        })

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK, [createdCourse])
    })

    it('should not update course if title does not have', async () => {
        const data: CourseUpdateModel = {title: ''}

        await request(app)
            .put('/courses/' + createdCourse.id)
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST)

        await request(app)
            .get('/courses/' + createdCourse.id)
            .expect(HTTP_STATUSES.OK, createdCourse)
    })

    it('should not update not exist', async () => {
        const data: CourseUpdateModel = {title: 'Update new course'}

        await request(app)
            .put('/courses/' + -345)
            .send(data)
            .expect(HTTP_STATUSES.NOT_FOUND_ERR)
    })

    it('should update the course if data is correct', async () => {
        const data: CourseUpdateModel = {title: 'Update new course'}

        await request(app)
            .put(`/courses/` + createdCourse.id)
            .send(data)
            .expect(HTTP_STATUSES.NO_CONTENT)

        await request(app)
            .get('/courses/' + createdCourse.id)
            .expect(HTTP_STATUSES.OK, {...createdCourse, title: 'Update new course'})
    })

    it('should delete the course if data is correct', async () => {
        await request(app)
            .delete('/courses/' + createdCourse.id)
            .expect(HTTP_STATUSES.NO_CONTENT)

        await request(app)
            .get('/courses/' + createdCourse.id)
            .expect(HTTP_STATUSES.NOT_FOUND_ERR);
    })
})
