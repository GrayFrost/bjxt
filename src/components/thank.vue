<template>
    <v-main>
        <div slot="content">
            <div class="thank-container">
                <h1>感谢老师对我们的指导！</h1>
            </div>
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
    .thank-container {
        padding: 0 60px;
    }
</style>