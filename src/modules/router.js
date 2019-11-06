import Vue from 'vue';
import VueRouter from 'vue-router';

// import pages
import TodoPage from '@/pages/TodoPage';
import BookmarkPage from '@/pages/BookmarkPage';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: {name: 'todoPage'} },
  { path: '/todos', name: 'todoPage', component: TodoPage },
  { path: '/bookmarks', name: 'bookmarkPage', component: BookmarkPage }
];

const router = new VueRouter({ 
  mode: 'history',
  routes 
});

export default router;
