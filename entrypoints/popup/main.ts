import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import { getList } from './utils';

createApp(App).mount('#app');

async function init() {
  await getList();
}

init();
