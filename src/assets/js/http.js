import axios from 'axios';
import uuid from 'uuid';
import Vue from 'vue';


/**
 * 数据报文解析器
 * @type {{default: translator.default}}
 */
let translator = {
    /**
     * 系统默认的报文解析器
     * @param response
     * @param resolve
     * @param reject
     */
    default: function (response, resolve, reject) {
        if (response.status == 200) {
            if (response.data.code != 0) {
                let resp = {
                    status: response.status,
                    statusText: response.data.msg,
                    code: response.data.code || 10000,
                };
                translator.error(resp, resolve, reject);
                return;
            }
            resolve(response.data.result);
        } else {
            translator.error(response, resolve, reject);
        }
    },
    /**
     * 获取jadp系统接口的数据
     * @param response
     * @param resolve
     * @param reject
     */
    jadp: function (response, resolve, reject) {

    },
    /**
     * 处理错误的解析器
     * @param response
     * @param resolve
     * @param reject
     */
    error: function (response, resolve, reject) {
        Vue.prototype.$notify.error("【错误状态】: " + response.status + "【错误描述】：" + response.statusText);
        reject({
            status: response.status,
            code: response.code || 10000,
            msg: response.statusText
        });
    }
};

/**
 * 校验配置
 * @param config
 * @param resolve
 * @param reject
 * @returns {boolean}
 */
let validateConfig = function (config, resolve, reject) {
    if (config && !config.url) {
        let resp = {
            status: 0,
            statusText: "请指定请求的URL",
            code: 10000,
        };
        translator.error(resp, resolve, reject);
        return false;
    } else {
        return true;
    }
};

/**
 * 接口调用工具
 * @type {{ajax: (function(*): Promise<any>)}}
 */
let http = {

    ajax: function (config) {
        let $translator = config['translator'] || translator.default;
        let promise = new Promise(function (resolve, reject) {
            if (!validateConfig(config, resolve, reject)) {
                return;
            }
            // 设置随机数，去除缓存
            config.params = config.params || {};
            config.params['_t'] = Math.random();
            axios({
                url: config.url,
                method: config.method || 'GET',
                contentType: config.contentType || "application/json",
                data: config.data || {},
                params: config.params,
                // headers: {
                //     "appid": "smart_design_app",
                //     "timestamp": new Date().valueOf(),
                //     "nonce": uuid.v4(),
                //     "signature": ''
                // },
                // auth: {
                //
                // }
            }).then(function (response) {
                $translator(response, resolve, reject);
            }).catch(function (response) {
                translator.error(response.response, resolve, reject);
            });
        });
        return promise;
    }
};

export default http;
export {translator, http};