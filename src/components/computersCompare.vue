<template>
    <div class="computers-compare">
        <div>
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
    import {jd_API, compare_API} from '../utils/api';
    import {getDate} from '../utils/getDate';
    import product from 'components/product.vue';
    export default {
        data () {
            return {
                noUniqueArr: [],
                products: [],
                hasNoData: true,
                isLoad: true
            };
        },
        created () {
            var jdComp = JSON.parse(localStorage.getItem('bj_jdComp' + getDate(0))) || [];
            var gmComp = JSON.parse(localStorage.getItem('bj_gmComp' + getDate(0))) || [];
            var allComp = jdComp.concat(gmComp);
            if (allComp.length == 0) {
                this.hasNoData = true;
            } else {
                for (let i = 0; i < allComp.length; i++) {
                    if (allComp[i].comparable) {
                        this.noUniqueArr.push(allComp[i]);
                    }
                }
                if (this.noUniqueArr.length == 0) {
                    this.hasNoData = true;
                } else {
                    //数组去重
                    for (let i = 0; i < this.noUniqueArr.length; i++) {
                        if (this.noUniqueArr.indexOf(this.noUniqueArr[i]) == i) {
                            this.products.push(this.noUniqueArr[i]);
                        }
                    }
                    this.hasNoData = false;
                }
            }
        },
        components: {
            'v-product': product
        }
    };
</script>

<style lang="less" rel="stylesheet/less">

</style>