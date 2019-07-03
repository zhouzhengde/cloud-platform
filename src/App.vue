<template>
    <ux-window v-if="userInfo" menu_url="/mock/menu.json" id="app"/>
    <login v-else/>
</template>
<script>
    import UxWindow from "./components/UxWindow";
    import Login from './views/Login';
    import session from './assets/js/session';

    export default {
        components: {UxWindow, Login},
        data() {
            return {
                userInfo: session.getUserInfo()
            }
        }
    }
</script>