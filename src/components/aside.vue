<template>
    <ul id="gn-menu" class="gn-menu-main">
        <li class="gn-trigger">
            <a class="gn-icon gn-icon-menu"><span>Menu</span></a>
            <nav class="gn-menu-wrapper">
                <div class="gn-scroller">
                    <ul class="gn-menu">
                        <li class="gn-search-item">
                            <input placeholder="请输入品牌，如Lenovo" type="search" class="gn-search" ref="searchWd" @keydown="mouseSearch($event)">
                            <a href="javascript:void(0)" class="gn-icon icon-search" @click="searchProd">
                                <span>Search</span>
                            </a>
                        </li>
                        <li>
                            <router-link class="gn-icon icon-index" to="/">首页</router-link>
                        </li>
                        <li>
                            <router-link class="gn-icon icon-computer" :to="{name:'computersJd'}">电脑页面</router-link>
                        </li>
                        <li>
                            <router-link class="gn-icon icon-jd" :to="{name: 'jd'}">京东降价榜</router-link>
                        </li>
                        <li>
                            <router-link class="gn-icon icon-gm" :to="{name: 'gm'}">国美降价榜</router-link>
                        </li>
                    </ul>
                </div><!-- /gn-scroller -->
            </nav>
        </li>
        <li class="my-title">
            <router-link to="/">比价网</router-link>
        </li>
        <li class="my-title"><a class="codrops-icon" href="javascript:void(0)"><span>{{pageTitle}}</span></a></li>
        <li style="visibility: hidden"><span></span></li>
    </ul>
</template>

<script type="text/ecmascript-6">
    export default {
        computed:{
            pageTitle () {
                /*解决视图更新的问题*/
                return this.$store.state.webTitle;
            }
        },
        mounted () {
            new gnMenu(document.getElementById('gn-menu'));

        },
        methods: {
            mouseSearch(ev) {
                if(ev.keyCode == 13){
                    this.searchProd();
                }
            },
            searchProd () {
                this.$router.push({name: 'search', query: {wd: this.$refs.searchWd.value, type: 'Brand'}});
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
    #gn-menu {
        z-index: 1000;
        border-bottom: 1px solid #c6d0da;
        .my-title {
            font-family: "微软雅黑";
            font-size: 18px;
        }
        .gn-menu-wrapper{
            border-right: 1px solid #c6d0da;
            .icon-search:hover{
                cursor: pointer;
            }
        }
    }
</style>