import Vue from 'vue'

import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(fas);

/**
 * 请前往此处获取图标
 * @link https://fontawesome.com/icons?d=gallery
 */
Vue.component('font-awesome-icon', FontAwesomeIcon);
