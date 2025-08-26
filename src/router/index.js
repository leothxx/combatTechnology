import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import HomePage from "@/pages/home/HomePage.vue";
import ProductDetailPage from "@/pages/product/ProductDetailPage.vue";
import CartPage from "@/pages/cart/CartPage.vue";
import OrderPage from "@/pages/order/OrderPage.vue";
import {useAuthStore} from "@/store/auth.js";
const LoginPage = () => import('@/pages/auth/LoginPage.vue')
const RegisterPage = () => import('@/pages/auth/RegisterPage.vue')
const AdminDashboardPage = () => import('@/pages/admin/AdminDashboardPage.vue')
const NotFoundPage = () => import('@/pages/NotFoundPage.vue')


const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({ top: 0 }),
    routes: [
// Public/Auth layout routes
        {
            path: '/auth',
            component: AuthLayout,
            children: [
                { path: 'login', name: 'login', component: LoginPage, meta: { title: '로그인' } },
                { path: 'register', name: 'register', component: RegisterPage, meta: { title: '회원가입' } }
            ]
        },


// Default storefront
        {
            path: '/',
            component: DefaultLayout,
            children: [
                { path: '', name: 'home', component: HomePage, meta: { title: '홈' } },
                // { path: 'products', name: 'products', component: ProductListPage, meta: { title: '상품목록' } },
                { path: 'products/:id', name: 'product-detail', component: ProductDetailPage, meta: { title: '상품상세' } },
                { path: 'cart', name: 'cart', component: CartPage, meta: { title: '장바구니' } },
                { path: 'order', name: 'order', component: OrderPage, meta: { title: '주문서', requiresAuth: true } }
            ]
        },


// Admin
        {
            path: '/admin',
            component: AdminLayout,
            meta: { requiresAuth: true, requiresAdmin: true },
            children: [
                { path: '', name: 'admin-dashboard', component: AdminDashboardPage, meta: { title: '관리자 대시보드' } }
            ]
        },


// 404
        { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage, meta: { title: '페이지를 찾을 수 없음' } }
    ]
})


// Title & Guard
router.beforeEach((to, _from, next) => {
    const auth = useAuthStore()


    if (to.meta?.title) document.title = to.meta.title


    if (to.meta?.requiresAuth && !auth.isLoggedIn) {
        return next({ name: 'login', query: { redirect: to.fullPath } })
    }


    if (to.meta?.requiresAdmin && !auth.isAdmin) {
        return next({ name: 'home' })
    }


    return next()
})


export default router