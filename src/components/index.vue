<template>
    <v-main>
        <div slot="content">
            <!-- vue-awesome-swiper组件 -->
            <swiper :options="swiperOption" ref="mySwiperA">
                <!-- 幻灯内容 -->
                <swiper-slide>
                    <div class="slide-item milky">
                        比价网
                        <div class="little-mes">
                            <span>方便的价格比较</span>
                            <span>真实&nbsp;&nbsp;唯一</span>
                            <span>简约风格</span>
                        </div>
                        <div id="wordCloud" width="420px" height="300px">
                            <img src="http://ojcnbowye.bkt.clouddn.com/myProject/img/tagul2.png" alt="tagul图片"
                                 width="420px" height="300px"/>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="slide-item milky">
                        <div class="real-data">
                            <p>真实的数据展示</p>
                            <span>纯粹的比较</span>
                        </div>
                        <canvas id="myCanvas" width="800px" height="300px"></canvas>
                    </div>
                </swiper-slide>
                <!-- 以下控件元素均为可选（使用具名slot来确定并应用一些操作控件元素） -->
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
            <div class="today-recommend">
                <h3>今日推荐</h3>
                <div v-if="isLoad">
                    <v-loading></v-loading>
                </div>
                <div v-else>
                    <div v-if="hasNoData">暂时没有推荐</div>
                    <div v-for="(product,index) in products" class="product-container" v-else>
                        <div class="recommend">
                            <img :src="product.prd_img"/>
                            <div class="message-container">
                                <div class="polyline" :id="'polyline' + index"></div>
                                <p class="name-panel">
                                    <span>{{product.prd_name}}</span>
                                    <router-link
                                            :to="{name: 'detail',query:{id: product.prd_id, seller: product.prd_seller}}">
                                        详情>>
                                    </router-link>
                                </p>
                            </div>
                            <span v-if="product.comparable" class="canCompare"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-main>
</template>

<script type="text/ecmascript-6">
    import main from 'components/main.vue';
    import loading from 'components/loading.vue';
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    import {jd_API, gm_API, compare_API} from '../utils/api';
    import {getDate} from '../utils/getDate';
    import {jd_id, gm_id} from '../utils/judgeCompare';
    import echarts from 'echarts';
    export default {
        data () {
            return {
                swiperOption: {
                    notNextTick: true,
                    autoplay: 3000,
                    autoplayStopOnLast: false,
                    autoplayDisableOnInteraction: false,
                    speed: 800,
                    direction: 'horizontal',
                    grabCursor: true,
                    setWrapperSize: true,
                    autoHeight: true,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    prevButton: '.swiper-button-prev',
                    nextButton: '.swiper-button-next',
                    mousewheelControl: true,
                    observeParents: true,
                    debugger: true
                },
                products: [],
                hasNoData: true,
                isLoad: true,
                jdArr: [[],[],[],[],[]],
                gmArr: [[],[],[],[],[]]
            };
        },
        created () {
            var compRecommend = JSON.parse(localStorage.getItem('bj_compRecommend' + getDate(0))) || [];
            if (compRecommend.length == 0) {
                this.$http.jsonp(gm_API.getTodayRecommendList).then((response) => {
                    if (response.body) {
                        this.hasNoData = false;
                        for (var i = 0; i < response.body.length; i++) {
                            this.$http.jsonp(gm_API.findCompByID + (response.body)[i]).then((res) => {
                                var product = res.body[0];
                                this.products.push(product);
                                //今日国美推荐存储
                                localStorage.setItem('bj_compRecommend' + getDate(0), JSON.stringify(this.products));
                            });
                        }
                        //删除昨日国美推荐存储
                        if (localStorage.getItem('bj_compRecommend' + getDate(1))) {
                            localStorage.removeItem('bj_compRecommend' + getDate(1));
                        }
                    } else {
                        this.hasNoData = true;
                    }
                    this.isLoad = false;
                });
            } else {
                this.products = compRecommend;
                this.isLoad = false;
                this.hasNoData = false;
            }
        },
        mounted () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            //banner柱状图
            setTimeout(() => {
                this.renderMyCanvas();
            }, 1000);

            for (let i = 0; i < this.products.length; i++) {
                if (!this.products[i].comparable) {
                    //商品不可比价则只获取国美数据
                    var that = this;
                    this.$http.jsonp(gm_API.getPriceList + this.products[i].prd_id).then((response) => {
                        var arr = response.body.reverse();
                        that.$set(that.gmArr, i, that.getOneWeekArr(arr));
                    });
                } else {
                    //商品可比价则获取京东和国美数据
                    var that = this;
                    var myGmId = this.products[i].prd_id;
                    this.$http.jsonp(compare_API).then((response) => {
                        var myJdId;
                        for(let n = 0; n < response.body.length; n++){
                            if(response.body[n].gm_id == myGmId){
                                myJdId = response.body[n].jd_id;
                                break;
                            }
                        }
                        this.$http.jsonp(jd_API.getPriceList + myJdId).then((response) => {
                            var arr = response.body.reverse();
                            that.$set(that.jdArr, i, that.getOneWeekArr(arr));
                        });
                    });
                    this.$http.jsonp(gm_API.getPriceList + this.products[i].prd_id).then((response) => {
                        var arr = response.body.reverse();
                        that.$set(that.gmArr, i, that.getOneWeekArr(arr));
                    });
                }
            }

            setTimeout(() => {
                for (let i = 0; i < 5; i++) {
                    if (!this.products[i].comparable) {
                        //不可比价则只渲染国美
                        this.renderGm('polyline' + i, this.gmArr[i]);
                    } else {
                        //可比价则渲染京东与国美
                        this.renderCompare('polyline' + i, this.jdArr[i], this.gmArr[i]);
                    }
                }
            }, 2000);

        },
        methods: {
            yAxisArr () {
                //动态更新图表y轴
                let date = new Date();
                let month = date.getMonth() + 1;
                let today = date.getDate();
                let arr = [];
                for (let i = 0; i < 7; i++) {
                    var str = month + '-' + (today -i);
                    arr.unshift(str);
                }
                return arr;
            },
            getOneWeekArr (arr) {
                //将数组的最后七天数据提取出来
                var myArr = [];
                for (var i = arr.length - 1; i >= arr.length - 7; i--) {
                    myArr.unshift(arr[i]);
                }
                return myArr;
            },
            renderMyCanvas () {
                var myChart = echarts.init(document.getElementById('myCanvas'));
                var option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    calculable: true,
                    grid: {
                        borderWidth: 0,
                        y: 80,
                        y2: 60
                    },
                    xAxis: [
                        {
                            type: 'category',
                            show: false
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            show: false
                        }
                    ],
                    series: [
                        {
                            name: '真实的数据展示',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        // build a color map as your need.
                                        var colorList = [
                                            '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                                        ];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            },
                            data: [12, 21, 10, 4, 12, 5, 6, 5, 25, 23, 7]
                        }
                    ]
                };
                myChart.setOption(option);
            },
            renderGm (objId, arr) {
                var gmChart = echarts.init(document.getElementById(objId));
                var option = {
                    legend: {
                        data: ['国美'],
                        y: 'bottom',
                        orient: 'horizontal'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        name: '日期',
                        data: this.yAxisArr()
                    },
                    yAxis: {
                        type: 'value',
                        name: '价格',
                        show: false,
                        splitLine: false
                    },
                    series: [
                        {
                            name: '国美',
                            type: 'line',
                            stack: '总量',
                            data: arr,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最贵'},
                                    {type: 'min', name: '最便宜'}
                                ]
                            }
                        }
                    ]
                };
                gmChart.setOption(option);
            },
            renderCompare (objId, jdArr, gmArr) {
                var compareChart = echarts.init(document.getElementById(objId));
                var option = {
                    legend: {
                        data: ['国美','京东'],
                        y: 'bottom',
                        orient: 'horizontal'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        name: '日期',
                        data: this.yAxisArr()
                    },
                    yAxis: {
                        type: 'value',
                        name: '价格',
                        show: false,
                        splitLine: false
                    },
                    series: [
                        {
                            name: '国美',
                            type: 'line',
                            data: gmArr,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最贵'},
                                    {type: 'min', name: '最便宜'}
                                ]
                            }
                        },
                        {
                            name: '京东',
                            type: 'line',
                            data: jdArr,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最贵'},
                                    {type: 'min', name: '最便宜'}
                                ]
                            }
                        }
                    ]
                };
                compareChart.setOption(option);
            }
        },
        components: {
            swiper,
            swiperSlide,
            'v-main': main,
            'v-loading': loading
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
    .slide-item {
        width: 100%;
        height: 400px;
    }

    .milky {
        font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;;
        text-transform: uppercase;
        display: block;
        font-size: 80px;
        color: #fff;
        font-weight: bold;
        letter-spacing: -4px;
        background: linear-gradient(to bottom, #4a667a 0%, #24303a 100%);
        padding: 40px 100px;
    }

    .mes_pos(@toLeft) {
        display: block;
        height: 40px;
        line-height: 40px;
        position: relative;
        left: @toLeft * 100px;
    }

    .little-mes {
        font-size: 20px;
        letter-spacing: 5px;
        span:nth-child(1) {
            .mes_pos(1);
        }
        span:nth-child(2) {
            .mes_pos(2);
        }
        span:nth-child(3) {
            .mes_pos(3);
        }
    }

    #wordCloud {
        position: absolute;
        right: 150px;
        top: 40px;
    }

    .real-data {
        position: absolute;
        right: 100px;
        top: 80px;
        font-size: 45px;
        letter-spacing: 5px;
        text-align: center;
        span {
            font-size: 30px;
        }

    }

    .today-recommend {
        padding: 20px 60px 30px;
        &:after {
            display: block;
            content: ".";
            visibility: hidden;
            height: 0;
            clear: both;
        }
        .recommend {
            width: 80%;
            height: 280px;
            position: relative;
            display: flex;
            margin: 20px auto 20px;
            padding: 20px;
            flex-direction: row;
            -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 60px rgba(0, 0, 0, 0.06) inset;
            -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 60px rgba(0, 0, 0, 0.06) inset;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 60px rgba(0, 0, 0, 0.06) inset;
            img {
                width: 200px;
                height: 200px;
                margin-right: 20px;
            }
            .message-container {
                flex: 1;
                display: flex;
                flex-direction: column;
                .polyline {
                    width: 540px;
                    height: 260px;
                }
                .name-panel {
                    box-sizing: border-box;
                    width: 90%;
                    height: 30px;
                    line-height: 30px;
                    font-size: 15px;
                    span {
                        display: inline-block;
                        width: 500px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    a {
                        margin-right: 10px;
                        float: right;
                    }
                }
            }
            .canCompare {
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
    }
</style>