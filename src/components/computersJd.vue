<template>
    <div class="computers-jd">
        <div v-if="isLoad">
            <v-loading></v-loading>
        </div>
        <div v-else>
            <div class="computers-container" v-if="hasNoData">
                <h1>暂时没有数据</h1>
            </div>
            <div class="computers-container" v-else>
                <div v-for="product in products" class="product-container">
                    <v-product :product='product'></v-product>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {jd_API} from '../utils/api';
    import {getDate} from '../utils/getDate';
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
            var jdComp = JSON.parse(localStorage.getItem('bj_jdComp' + getDate(0))) || [];
            if (jdComp.length == 0) {
                this.hasNoData = true;
                var that = this;
                this.$http.jsonp(jd_API.findAllComp).then((response) => {
                    that.isLoad = false;
                    that.products = response.body;
                    //删除昨日京东存储
                    if (localStorage.getItem('bj_jdComp' + getDate(1))) {
                        localStorage.removeItem('bj_jdComp' + getDate(1));
                    }
                    //今日京东存储
                    localStorage.setItem('bj_jdComp' + getDate(0), JSON.stringify(that.products));
                    if (that.products.length == 0) {
                        that.hasNoData = true;
                    } else {
                        that.hasNoData = false;
                    }
                });
            } else {
                this.products = jdComp;
                this.isLoad = false;
                this.hasNoData = false;
            }
        },
        components: {
            'v-product': product,
            'v-loading': loading
        }
    };
</script>

<style lang="less" rel="stylesheet/less">

</style>