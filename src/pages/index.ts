
export const routes = [
    {
        path: '/',
        name: "Home",
        component: () => import("./LoginView.vue")
    },
    {
        path: '/admin/courses',
        name: "AdminCourses",
        component: () => import('./admin/courses/CourseList.vue'),
        meta: {
            sidebar: true
        }
    },
    {
        path: '/admin/courses/:id',
        name: 'AdminCoursesDetails',
        component: () => import('./admin/courses/CourseListDetail.vue'),
        meta: {
            sidebar: true
        }
    }
]



