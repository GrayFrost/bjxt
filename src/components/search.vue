<template>
    <v-main>
        <div slot="content">
            <div class="search-container">
                <h1>搜一搜</h1>
                <div class="search-panel">
                    <form>
                        <fieldset class="radio-container">
                            <div class="radio-options">
                                <div class="toggle">选择类型</div>
                                <ul>
                                    <li>
                                        <input type="radio" name="my-choice" id="choice1" value="Name" v-model="picked">
                                        <label for="choice1">商品名</label>
                                    </li>
                                    <li>
                                        <input type="radio" name="my-choice" id="choice2" value="Brand"
                                               v-model="picked">
                                        <label for="choice2">品牌</label>
                                    </li>
                                </ul>
                            </div>
                        </fieldset>
                    </form>
                    <input type="text" class="my-search-text" v-model="searchText">
                    <button class="my-search-btn" @click="searchProduct">搜索</button>
                </div>
                <div v-if="isLoad">
                    <v-loading></v-loading>
                </div>
                <div v-else>
                    <div v-if="hasNoData">暂时没有搜索到相关数据</div>
                    <div v-for="product in products" class="product-container" v-else>
                        <v-product :product='product'></v-product>
                    </div>
                </div>
            </div>
        </div>
    </v-main>
</template>

<script type="text/ecmascript-6">
    import {jd_API, gm_API} from '../utils/api';
    import {jd_id, gm_id} from '../utils/judgeCompare';
    import main from 'components/main.vue';
    import product from 'components/product.vue';
    import loading from 'components/loading.vue';
    export default {
        data () {
            return {
                products: [],
                hasNoData: true,
                picked: '',
                searchText: '',
                isLoad: false
            };
        },
        watch: {
            '$route': 'getData'
        },
        created () {
            this.searchText = this.$route.query.wd;
            this.getData();
        },
        methods: {
            getData () {
                this.products.splice(0, this.products.length);
                switch (this.$route.query.type) {
                    case 'Brand':
                        this.getBrandData();
                        break;
                    case 'Name':
                        this.getNameData();
                        break;
                }
            },
            searchProduct () {
                this.products = [];
                this.picked = this.picked || 'Brand';
                switch (this.picked) {
                    case 'Name':
                        this.getNameData();
                        break;
                    case 'Brand':
                        this.getBrandData();
                        break;
                }
            },
            isNull(obj){
                /*因为传回来的null是个字符串*/
                if (obj == 'null') {
                    return true;
                } else {
                    return false;
                }
            },
            getBrandData () {
                this.$route.query.wd = this.searchText;
                this.$route.query.type = this.picked;
                this.isLoad = true;
                this.$http.jsonp(jd_API.findCompByBrand + this.$route.query.wd).then((response) => {
                    if (this.isNull(response.body)) {
                        this.products = [];
                    } else {
                        this.products = response.body;
                    }
                    this.$http.jsonp(gm_API.findCompByBrand + this.$route.query.wd).then((response) => {
                        if (this.isNull(response.body)) {
                            this.products = this.products.concat([]);
                        } else {
                            this.products = this.products.concat(response.body);
                        }
                        this.isLoad = false;
                        if (this.products.length == 0) {
                            this.hasNoData = true;
                        } else {
                            this.hasNoData = false;
                        }
                    });
                });
            },
            getNameData () {
                this.$route.query.wd = this.searchText;
                this.$route.query.type = this.picked;
                this.isLoad = true;
                this.$http.jsonp(jd_API.findCompByName + this.$route.query.wd).then((response) => {
                    if (this.isNull(response.body)) {
                        this.products = [];
                    } else {
                        this.products = response.body;
                    }
                    this.isLoad = false;
                    if (this.products.length == 0) {
                        this.hasNoData = true;
                    } else {
                        this.hasNoData = false;
                    }
                });
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
    .search-container {
        padding: 0 60px;
        .search-panel {
            width: 100%;
            &:after {
                display: block;
                content: '.';
                height: 0;
                visibility: hidden;
                clear: both;
            }
            .my-search-text {
                float: left;
                margin: 0 30px;
                width: 300px;
                height: 60px;
                line-height: 60px;
                font-size: 24px;
            }
            .my-search-btn {
                float: left;
                width: 100px;
                height: 60px;
                line-height: 60px;
                font-size: 24px;
                background-color: #5f6f81;
                color: #d6ebe0;
                border: none;
                border-radius: 5px;
            }
            form {
                width: 300px;
                position: relative;
                float: left;
                fieldset {
                    border: none;
                    margin: 0;
                    padding: 0;
                    font-family: "Unica One";
                    ul {
                        margin: 0;
                        padding: 0;
                    }
                }
            }
        }
    }

    .radio-container {
        position: relative;
        height: 4em;
        font-size: 1.5em;
        line-height: 1;
        color: #d6ebe0;
    }

    .no-touch .radio-container:hover, .radio-container.active {
        z-index: 9999;
    }

    .radio-options {
        position: absolute;
        max-height: 3em;
        width: 100%;
        overflow: hidden;
        -webkit-transition: 0.7s;
        -moz-transition: 0.7s;
        -o-transition: 0.7s;
        transition: 0.7s;
    }

    .radio-options ul {
        margin-top: 18px;
        -webkit-transition: 0.5s;
        -moz-transition: 0.5s;
        -o-transition: 0.5s;
        transition: 0.5s;
    }

    .radio-options li {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .radio-options label {
        display: block;
        padding: 0.75em;
        background: #5f6f81;
        opacity: 0;
        -webkit-transition: 0s;
        -moz-transition: 0s;
        -o-transition: 0s;
        transition: 0s;
    }

    .radio-options input {
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
        height: 3em;
        opacity: 0;
        z-index: 1;
        cursor: pointer;
    }

    .radio-options input:checked ~ label {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        opacity: 1;
        z-index: 2;
        padding: 0.75em;
        background: #5f6f81;
        border-radius: 10px;
    }

    .no-touch .radio-options li:hover label {
        background: #5f6f81;
    }

    .radio-options .checked label {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 0.75em;
        background: #5f6f81;
        visibility: visible;
        z-index: 2;
    }

    .no-touch .radio-options:hover, .active .radio-options {
        max-height: 100em;
    }

    .no-touch .radio-options:hover ul, .active .radio-options ul {
        position: relative;
        margin-top: 9px;
    }

    .no-touch .radio-options:hover li, .active .radio-options li {
        position: relative;
    }

    .no-touch .radio-options:hover label, .active .radio-options label {
        opacity: 1;
        -webkit-transition: 0.5s;
        -moz-transition: 0.5s;
        -o-transition: 0.5s;
        transition: 0.5s;
    }

    .no-touch .radio-options:hover input:checked ~ label, .active .radio-options input:checked ~ label {
        position: static;
        border-radius: 0;
    }

    .no-touch .radio-options:hover .checked label {
        position: static;
    }

    .no-touch .radio-options:hover ul:before, .active .radio-options ul:before {
        content: "";
        position: absolute;
        width: 0px;
        height: 0px;
        right: 0.75em;
        margin-right: -4px;
        top: -9px;
        border-style: solid;
        border-width: 0 9px 9px 9px;
        border-color: transparent transparent #5f6f81 transparent;
        -webkit-transform: rotate(360deg);
    }

    .radio-options .toggle {
        position: relative;
        cursor: pointer;
        padding: 0.75em;
        background: #5f6f81;
        border-radius: 10px;
        z-index: 1;
    }

    .radio-options .toggle:before {
        content: "";
        border-style: solid;
        border-width: 5px 0 5px 8.7px;
        border-color: transparent transparent transparent #d6ebe0;
        height: 0px;
        position: absolute;
        right: 0.75em;
        top: 50%;
        margin-top: -5px;
        width: 0px;
        -webkit-transform: rotate(360deg);
    }

    .no-touch .radio-options:hover .toggle:before, .active .radio-options .toggle:before {
        border-width: 8.7px 5px 0 5px;
        border-color: #d6ebe0 transparent transparent transparent;
        margin-top: -2px;
    }

    .radio-options input:checked ~ label:before {
        content: "";
        border-style: solid;
        border-width: 5px 0 5px 8.7px;
        border-color: transparent transparent transparent #d6ebe0;
        height: 0px;
        position: absolute;
        right: 0.75em;
        top: 50%;
        margin-top: -5px;
        width: 0px;
        -webkit-transform: rotate(360deg);
    }

    .radio-options li.checked label:before {
        content: "";
        border-style: solid;
        border-width: 5px 0 5px 8.7px;
        border-color: transparent transparent transparent #d6ebe0;
        height: 0px;
        position: absolute;
        right: 0.75em;
        top: 50%;
        margin-top: -5px;
        width: 0px;
        -webkit-transform: rotate(360deg);
    }

    .no-touch .radio-options:hover input:checked ~ label:before, .active .radio-options input:checked ~ label:before {
        content: none;
    }

    .no-touch .radio-options:hover li.checked label:before {
        content: none;
    }

    .no-opacity .radio-options label {
        visibility: hidden;
    }

    .no-opacity .radio-options:hover label {
        visibility: visible;
    }

    .no-opacity .radio-options li.checked label {
        visibility: visible;
    }

    .no-opacity input {
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    }
</style>