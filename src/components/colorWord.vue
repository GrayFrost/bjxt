<template>
    <div class="headingWrapper">
        <a href="" class="header header--raiseUp header--shadow">{{words}}</a>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            words: {
                type: String,
                default: 'hello world'
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
    .headingWrapper {
        text-align: center;
        background-color: #fff;
        padding: 10px;
    }
    .header {
        display: inline-block;
        text-align: center;
        font-family: 'Francois One', Helvetica, Arial, sans-serif;
        font-size: 40px;
        color: #e7e7e7;
        text-decoration: none;
        text-shadow: 1.5px 1.5px 0 #cac6c5, -1.5px -1.5px 0 #cac6c5, -1.5px -1.5px 0 #cac6c5, -1.5px 1.5px 0 #cac6c5, 1.5px -1.5px 0 #cac6c5;
        transition: all 400ms ease-in-out;
    }
    .header--raiseUp:hover {
        transform: translate(-9px, -9px);
        text-shadow: 1.5px 1.5px 0 #333, 0px 1.5px 0 #333, -1.5px -1.5px 0 #333, -1.5px -1.5px 0 #333, -1.5px 1.5px 0 #333, 1.5px -1.5px 0 #333, 0.77782px 0.77782px 0 #aaaaaa, 1.55563px 1.55563px 0 #aaaaaa, 2.33345px 2.33345px 0 #aaaaaa, 3.11127px 3.11127px 0 #aaaaaa, 3.88909px 3.88909px 0 #aaaaaa, 4.6669px 4.6669px 0 #aaaaaa, 5.44472px 5.44472px 0 #aaaaaa, 6.22254px 6.22254px 0 #aaaaaa, 7.00036px 7.00036px 0 #aaaaaa, 7.77817px 7.77817px 0 #aaaaaa;
    }

    .header--shadow:hover {
        transform: translate(5px, 0);
    }
    .header--shadow.header--raiseUp:hover {
        transform: translate(-5px, 0);
    }
</style>