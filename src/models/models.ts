type CourseCreateModel = {
    /** title of course */
    title: string
}

type CourseUpdateModel = {
    /** title of course */
    title: string
}

type CourseQueryModel = {
    /** title of course */
    title: string
}

type CourseParamsModel = {
    /** id of course */
    id: string
}

type CourseViewModel = {
    /** id of course */
    id: number,
    /** title of course */
    title: string,
}

export {
    CourseCreateModel,
    CourseUpdateModel,
    CourseQueryModel,
    CourseViewModel,
    CourseParamsModel
};
