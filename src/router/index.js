import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { apiObtainNewToken, apiVerifyAccessToken } from '@/api'
import SettingsView from '@/views/SettingsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                requiresAuth: true // Add meta field to indicate protected route
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsView,
            meta: {
                requiresAuth: true // Add meta field to indicate protected route
            }
        },
        {
            path: '/signin',
            name: 'signin',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/auth/SignInView.vue'),
            meta: {
                requiresAuth: false // Add meta field to indicate protected route
            }
        },
        {
            path: '/reset-password',
            name: 'reset-password',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/auth/ResetPasswordView.vue'),
            meta: {
                requiresAuth: false // Add meta field to indicate protected route
            }
        },
        {
            path: '/signup',
            name: 'signup',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/auth/SignUpView.vue'),
            meta: {
                requiresAuth: false // Add meta field to indicate protected route
            }
        },
        {
            path: '/registered-vehicle',
            name: 'registered-vehicle',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/admin/RegisteredVehiclesView.vue'),
            meta: {
                requiresAuth: true // Add meta field to indicate protected route
            }
        },
        {
            path: '/emergency-contacts',
            name: 'emergency-contacts',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/admin/EmergencyContactsView.vue'),
            meta: {
                requiresAuth: true // Add meta field to indicate protected route
            }
        },
        {
            path: '/rescuers-contacts',
            name: 'rescuers-contacts',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/admin/RescuersContactsView.vue'),
            meta: {
                requiresAuth: true // Add meta field to indicate protected route
            }
        },
        {
            path: '/activity-history',
            name: 'activity-history',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/admin/ActivityHistoryView.vue'),
            meta: {
                requiresAuth: true // Add meta field to indicate protected route
            }
        },
        {
            path: '/users',
            name: 'users',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/admin/UsersView.vue'),
            meta: {
                requiresAuth: true // Add meta field to indicate protected route
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/admin/DashboardView.vue'),
            meta: {
                requiresAuth: true // Add meta field to indicate protected route
            }
        },
        {
            path: '/analytics',
            name: 'analytics',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/admin/AnalyticsView.vue'),
            meta: {
                requiresAuth: true // Add meta field to indicate protected route
            }
        },
        {
            path: '/alert/:id',
            name: 'alert',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/admin/DetailAccidentAlertView.vue'),
            meta: {
                requiresAuth: true // Add meta field to indicate protected route
            }
        },
        {
            path: '/received-accidents',
            name: 'received-accidents',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/admin/ReceivedNotificationsView.vue'),
            meta: {
                requiresAuth: true // Add meta field to indicate protected route
            }
        },
        {
            path: '/forwarded-accidents',
            name: 'forwarded-accidents',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/admin/ReceivedNotificationsView.vue'),
            meta: {
                requiresAuth: true // Add meta field to indicate protected route
            }
        }
    ]
})
router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        const access_token = localStorage.getItem('access_token')
        const refresh_token = localStorage.getItem('refresh_token')

        if (access_token) {
            // User is authenticated, proceed to the route
            try {
                const verifyAccessToken = await apiVerifyAccessToken(access_token)

                if (verifyAccessToken['status_code'] === 200) {
                    next()
                } else {
                    const obtainNewToken = await apiObtainNewToken(refresh_token)
                    if (obtainNewToken['status_code'] === 200) {
                        const access_token = obtainNewToken['data'][0]['access']
                        const refresh_token = obtainNewToken['data'][0]['refresh']

                        // Add the token to localStorage
                        localStorage.setItem('access_token', access_token)
                        localStorage.setItem('refresh_token', refresh_token)
                        next()
                    } else {
                        // Token verification failed, redirect to signin
                        localStorage.clear()
                        next('/signin')
                    }
                }
            } catch (error) {
                console.error('Error verifying access token:', error)
                // Handle the error (e.g., redirect to signin)
                next('/signin')
            }
        } else {
            // User is not authenticated, redirect to login
            next('/signin')
        }
    } else {
        // Non-protected route, allow access
        next()
    }
})
export default router
