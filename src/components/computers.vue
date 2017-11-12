<template>
    <v-main>
        <div slot="content">
            <ul class="computers-tabs">
                <li>
                    <router-link :to="{name: 'computersJd'}">京东电脑</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'computersGm'}">国美电脑</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'computersCompare'}">可比价电脑</router-link>
                </li>
            </ul>
            <transition name="toLeft">
                <router-view></router-view>
            </transition>
        </div>
    </v-main>
</template>

<script type="text/ecmascript-6">
    import main from 'components/main.vue';
    export default {
        components: {
            'v-main': main
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
    .computers-tabs {
        list-style: none;
        margin: 20px 0 40px 30px;
        li {
            display: inline-block;
            width: 150px;
            height: 35px;
            line-height: 35px;
            a {
                display: inline-block;
                padding: 2px 10px;
                border-radius: 5px;
                font-size: 20px;
            }
            a.active{
                background-color: #0e90d2;
                color: #fff;
            }
        }
    }

    .computers-container {
        padding: 0 60px;
        h1 {
            color: #000;
        }
    }

    .toLeft-enter-active{
        transform: translate(-100%, 0);
        transition: all 1s ease-in-out;
    }
    .toLeft-enter{
        transform: translate(0, 0);
    }
    .toLeft-leave-active{
        transform: translate(-100%, 0);
        transition: all 1s ease-in-out;
    }
    .toLeft-leave{
        transform: translate(0, 0);
    }
</style>