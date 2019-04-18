import VueRouter from 'vue-router';
import Products from 'components/products/Products.vue';
import Reviews from 'components/reviews/Reviews.vue';
import Seller from 'components/seller/Seller.vue';
const routes = [
    { path: '/products', component: Products },
    { path: '/reviews', component: Reviews },
    { path: '/seller', component: Seller }
    // { path: '/bar', component: Bar }
];

const router = new VueRouter({
    routes,
    mode: 'hash',
    linkActiveClass: 'active'
});
export default router;
