<template>
    <v-main>
        <div slot="content">
            <div v-if="isLoad">
                <v-loading></v-loading>
            </div>
            <div v-else>
                <div class="computers-container" v-if="hasNoData">
                    <h1>暂时没有数据</h1>
                </div>
                <div class="computers-container" v-else>
                    <h1>国美降价榜--今日最低价</h1>
                    <div v-for="product in products" class="product-container">
                        <v-product :product='product'></v-product>
                    </div>
                </div>
            </div>
        </div>
    </v-main>
</template>

<script type="text/ecmascript-6">
    import {gm_API} from '../utils/api';
    import {getDate} from '../utils/getDate';
    import main from 'components/main.vue';
    import product from 'components/product.vue';
    import loading from 'components/loading.vue';
    export default {
        data () {
            return {
                products: [],
                hasNoData: true,
                isLoad: true
            };
        },
        created () {
            var gmComp = JSON.parse(localStorage.getItem('bj_gmDown' + getDate(0))) || [];
            if(gmComp.length == 0){
                this.hasNoData = true;
                this.$http.jsonp(gm_API.getLowestPriceList).then((response) => {
                    this.isLoad = false;
                    if(response.body){
                        this.products = response.body;
                        //删除昨日国美降价榜
                        if (localStorage.getItem('bj_gmDown' + getDate(1))) {
                            localStorage.removeItem('bj_gmDown' + getDate(1));
                        }
                        //今日国美降价存储
                        localStorage.setItem('bj_gmDown' + getDate(0), JSON.stringify(response.body));
                        this.hasNoData = false;
                    }
                });
            }else{
                this.products = gmComp;
                this.isLoad = false;
                this.hasNoData = false;
            }
        },
        components: {
            'v-main': main,
            'v-product': product,
            'v-loading': loading
        }
    };
</script>

<style lang="less" rel="stylesheet/less">

</style>