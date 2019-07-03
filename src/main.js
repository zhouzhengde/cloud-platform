import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import store from './store/store'
import router from './router/router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import 'flex-layout'
import './assets/style/less/common.less'
import './assets/style/scss/styles.scss'

Vue.use(ElementUI, {locale});

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
