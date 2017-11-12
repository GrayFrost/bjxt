<template>
    <main>
        <div class="sticky">
            <slot name="content"></slot>
        </div>
        <v-footer></v-footer>
    </main>
</template>

<script type="text/ecmascript-6">
    import footer from 'components/footer.vue';
    export default {
        components: {
            'v-footer': footer
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
    main {
        margin-top: 60px;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        .sticky {
            flex: 1;
            min-height: 100%;
            height: 100%;
        }
    }
</style>