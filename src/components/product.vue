<template>
    <div class="product" v-if="product.prd_name != 0">
        <img :src="product.prd_img" style="width: 180px; height: 180px;">
        <span class="price-tag-wrapper">
            <span class="price-tag">￥{{product.prd_price}}</span><small>起</small>
        </span>
        <span class="prod-name" v-if="product.prd_name != 0">{{product.prd_name | handleProductName}}</span>
        <span class="prod-name" v-else>暂无商品</span>
        <p class="rate">
            <span>好评率
                <span class="rate-tag" v-if="product.good_rate != 0">{{product.good_rate}}</span>
                <span v-else><small>暂无评价</small></span>
            </span>
            <router-link :to="{name:'detail',query: {id: product.prd_id,seller:product.prd_seller}}" class="more" v-if="product.prd_name != 0">详情&gt;&gt;
            </router-link>
        </p>
        <span v-if="product.comparable" class="canCompare"></span>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            product: {}
        },
        filters: {
            handleProductName (val) {
                var str = val.replace(/\?/g, ' ');
                return str;
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
    .product {
        background-color: #fff;
        width: 200px;
        height: 300px;
        float: left;
        margin: 10px 12px;
        border-radius: 4px;
        border: 1px solid #ddd;
        position: relative;
        transition: all 0.5s ease;
        &:hover {
            box-shadow: 2px 0 6px #c6d0da, 0 2px 6px #c6d0da, -2px 0 6px #c6d0da, 0 -2px 6px #c6d0da;
        }
        img {
            position: relative;
            left: 50%;
            margin-left: -90px;
        }
        .price-tag-wrapper {
            display: inline-block;
            width: 100%;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            font-size: 18px;
            .price-tag {
                color: red;
            }
        }
        .prod-name {
            display: inline-block;
            width: 100%;
            height: 25px;
            line-height: 25px;
            padding: 0 10px;
            font-size: 12px;
            color: #666;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .rate{
            width: 100%;
            padding: 0 10px;
            font-size: 14px;
            .rate-tag{
                color: #005AA0;
                font-size: 12px;
                font-weight: bold;
            }
            .more{
                display: inline-block;
                float: right;
                font-size: 12px;
                color: #333;
                text-decoration: none;
            }
        }
        .canCompare{
            position: absolute;
            display: inline-block;
            width: 0px;
            height: 0px;
            border-top: 30px solid orange;
            border-left: 30px solid transparent;
            top: 0;
            right: 0;
        }
    }
</style>