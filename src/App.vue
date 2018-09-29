<template>
    <body>
    	<vue-snotify></vue-snotify>
        <router-view/>
    </body>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {};
    },
}
</script>
<style>
@import './vendor/css/agency.min.css'
</style>