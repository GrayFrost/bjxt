<template>
    <div id="app">
        <v-aside></v-aside>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import aside from 'components/aside.vue';
    export default {
        name: 'app',
        watch: {
            '$route' (to, from) {
                switch(to.path){
                    case '/': this.$store.dispatch('changeTitle', '一个纯粹的比价网站');
                    break;
                    case '/search': this.$store.dispatch('changeTitle', '搜一搜');
                    break;
                    case '/jd': this.$store.dispatch('changeTitle', '京东降价榜');
                    break;
                    case '/gm': this.$store.dispatch('changeTitle', '国美降价榜');
                    break;
                    case '/about': this.$store.dispatch('changeTitle', '关于我们');
                    break;
                    case '/thank': this.$store.dispatch('changeTitle', '感谢');
                    break;
                    default: this.$store.dispatch('changeTitle', '电脑页面');
                }
            }
        },
        components: {
            'v-aside': aside
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>