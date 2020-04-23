import Vue from 'vue';
import VueRouter from 'vue-router';

// import pages
import TodoPage from '@/pages/TodoPage';
import HealthPage from '@/pages/HealthPage';
import RandomDicePage from '@/pages/RandomDicePage';
import SettingsPage from '@/pages/SettingsPage';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: {name: 'todoPage'} },
  { path: '/todos', name: 'todoPage', component: TodoPage },
  { path: '/health', name: 'healthPage', component: HealthPage },  
  { path: '/random-dice', name: 'randomDicePage', component: RandomDicePage },    
  { path: '/settings', name: 'settingsPage', component: SettingsPage }
];

const router = new VueRouter({ 
  mode: 'history',
  routes 
});

export default router;
