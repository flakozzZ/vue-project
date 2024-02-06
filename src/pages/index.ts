import AdminCourses from '@/pages/admin/courses/CourseList.vue'

export const routes = [
    {
        path: '/',
        name: "Home",
        component: () => import("./LoginView.vue")
    },
    {
        path: '/admin/courses',
        name: "AdminCourses",
        component: AdminCourses,
        meta: {
            sidebar: true
        }
    }
]



