<template>
    <v-main>
        <div slot="content">
            <div class="detail-container">
                <h1>电脑详情页面</h1>
                <color-word :words="detail.prd_name"></color-word>
                <div class="am-panel am-panel-default">
                    <div class="am-panel-hd">
                        <h3 class="am-panel-title">商品信息</h3>
                    </div>
                    <div class="am-panel-bd">
                        <div class="column-wrapper">
                            <div class="column1">
                                <img :src="detail.prd_img"/>
                                <div class="comment" id="comment" style="width: 250px; height: 250px;"></div>
                            </div>
                            <div class="column2">
                                <div class="polyline" id="polyline" style="width: 600px; height: 250px;"></div>
                                <table class="am-table">
                                    <thead>
                                    <tr>
                                        <th colspan="2">最低价格</th>
                                        <th colspan="2">目前售价</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in sellerPrice">
                                        <td>{{item.seller}}</td>
                                        <td>{{item.minPrice}}元</td>
                                        <td>{{item.newPrice}}元</td>
                                        <td><a :href="item.url">直达链接</a></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="am-panel am-panel-default">
                    <div class="am-panel-hd">
                        <h3 class="am-panel-title">平台比价</h3>
                    </div>
                    <div class="am-panel-bd">
                        <p>以下为此款商品在不同平台一周内每日的比价图.
                        </p>
                        <div id="compare" style="width: 90%; height: 500px;"></div>
                    </div>
                </div>
                <div class="am-panel am-panel-default">
                    <div class="am-panel-hd">
                        <h3 class="am-panel-title">规格参数</h3>
                    </div>
                    <div class="am-panel-bd">
                        <table class="am-table am-table-striped">
                            <thead>
                            <tr>
                                <th>名称</th>
                                <th>参数</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>品牌</td>
                                <td>{{detail.prd_brand | strFilter}}</td>
                            </tr>
                            <tr>
                                <td>类型</td>
                                <td>{{detail.prd_type | strFilter}}</td>
                            </tr>
                            <tr>
                                <td>CPU</td>
                                <td>{{detail.prd_cpu | strFilter}}</td>
                            </tr>
                            <tr>
                                <td>GPU</td>
                                <td>{{detail.prd_gpu | strFilter}}</td>
                            </tr>
                            <tr>
                                <td>内存</td>
                                <td>{{detail.prd_memory | strFilter}}</td>
                            </tr>
                            <tr>
                                <td>硬盘</td>
                                <td>{{detail.prd_disk | strFilter}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </v-main>
</template>

<script type="text/ecmascript-6">
    import {jd_API, gm_API, compare_API} from '../utils/api';
    import {getDate} from '../utils/getDate';
    import {jd_id, gm_id} from '../utils/judgeCompare';
    import main from 'components/main.vue';
    import colorWord from 'components/colorWord.vue';
    import echarts from 'echarts';
    export default {
        data () {
            return {
                detail: {},
                jdArr: [],
                gmArr: [],
                dateArr: [],
                minPrice: [],
                urlArr: ['#', '#'],
                sellerPrice: [],
                anchorTitles: ['商品信息', '平台比价', '规格参数'],
                goodRate: 0
            };
        },
        created () {
            //数据的获取

            //如果可比价则获取两家数据
            if (this.$route.query.seller == 'jd') {
                for (var i = 0; i < jd_id.length; i++) {
                    if (this.$route.query.id == jd_id[i]) {
                        this.getTwoData('jd');
                        break;
                    }
                }
            } else if (this.$route.query.seller == 'gm') {
                for (var i = 0; i < gm_id.length; i++) {
                    if (this.$route.query.id == gm_id[i]) {
                        this.getTwoData('gm');
                        break;
                    }
                }
            }
            //如果不可比价则从各自商家获取
            switch (this.$route.query.seller) {
                case 'jd':
                    this.getJdData();
                    break;
                case 'gm':
                    this.getGmData();
                    break;
            }

            //处理日期显示
            var date = new Date();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            for (var i = 0; i < 7; i++) {
                var str = month + '-' + (day - i);
                this.dateArr.unshift(str);
            }

            //处理表格数据
            this.handlerSellerPrice();
        },
        mounted () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            //图表的渲染
            setTimeout(() => {
                if (!this.detail.comparable) {
                    //不可比价

                    //渲染第一个简单折线图
                    switch (this.$route.query.seller) {
                        case 'jd':
                            this.initPolyline('jd');
                            break;
                        case 'gm':
                            this.initPolyline('gm');
                            break;
                    }

                    //渲染第二个复杂折线图
                    switch (this.$route.query.seller) {
                        case 'jd':
                            this.initCompare('jd');
                            break;
                        case 'gm':
                            this.initCompare('gm');
                            break;
                    }
                } else {
                    //可比价

                    //渲染第一个简单折线图
                    this.initPolyline('two');

                    //渲染第二个复杂折线图
                    this.initCompare('two');
                }

                this.initGoodRate();
            }, 1000);
        },
        methods: {
            handlerGoodRate(){
                //将好评率字符串变为数字类型
                var goodRate = parseInt(this.detail.good_rate.replace('%', ''));
                this.goodRate = goodRate;
            },
            handlerSellerPrice () {
                setTimeout(() => {
                    //不可比价
                    if (!this.detail.comparable) {
                        if (this.$route.query.seller == 'jd') {
                            var obj = new Object();
                            obj.seller = '京东商城';
                            obj.minPrice = this.minPrice[0];
                            obj.newPrice = this.jdArr[6];
                            obj.url = this.detail.prd_url;
                            this.sellerPrice.push(obj);
                        } else if (this.$route.query.seller == 'gm') {
                            var obj = new Object();
                            obj.seller = '国美在线';
                            obj.minPrice = this.minPrice[1];
                            obj.newPrice = this.gmArr[6];
                            obj.url = this.detail.prd_url;
                            this.sellerPrice.push(obj);
                        }
                    } else {
                        //可比价
                        var jdObj = new Object();
                        jdObj.seller = '京东商城';
                        jdObj.minPrice = this.minPrice[0];
                        jdObj.newPrice = this.jdArr[6];
                        jdObj.url = this.urlArr[0];
                        this.sellerPrice.push(jdObj);

                        var gmObj = new Object();
                        gmObj.seller = '国美在线';
                        gmObj.minPrice = this.minPrice[1];
                        gmObj.newPrice = this.gmArr[6];
                        gmObj.url = this.urlArr[1];
                        this.sellerPrice.push(gmObj);
                    }
                }, 1000);
            },
            minFunction (arr, seller) {
                switch (seller) {
                    case 'jd':
                        this.minPrice[0] = Math.min.apply(null, arr);
                        break;
                    case 'gm':
                        this.minPrice[1] = Math.min.apply(null, arr);
                        break;
                }
            },
            getJdData () {
                //获取京东数据
                this.$http.jsonp(jd_API.findCompByID + this.$route.query.id).then((response) => {
                    this.detail = response.body[0];
                    this.urlArr[0] = response.body[0].prd_url;

                });
                this.$http.jsonp(jd_API.getPriceList + this.$route.query.id).then((response) => {
                    var arr = [];
                    var reverseArr = response.body.reverse();
                    for (var i = reverseArr.length - 1; i >= reverseArr.length - 7; i--) {
                        arr.unshift(reverseArr[i]);
                    }
                    this.jdArr = arr;
                    this.minFunction(arr, 'jd');
                });
            },
            getGmData () {
                //获取国美数据
                this.$http.jsonp(gm_API.findCompByID + this.$route.query.id).then((response) => {
                    this.detail = response.body[0];
                    this.urlArr[1] = response.body[0].prd_url;
                });
                this.$http.jsonp(gm_API.getPriceList + this.$route.query.id).then((response) => {
                    var arr = [];
                    var reverseArr = response.body.reverse();
                    for (var i = reverseArr.length - 1; i >= reverseArr.length - 7; i--) {
                        arr.unshift(reverseArr[i]);
                    }
                    this.gmArr = arr;
                    this.minFunction(arr, 'gm');
                });
            },
            getTwoData (sellerOrigin) {
                //参数sellerOrigin为从哪家开始
                //获取两家数据
                if (sellerOrigin == 'jd') {
                    this.getJdData();
                    //附加国美数组以及国美商品链接
                    this.$http.jsonp(compare_API).then((response) => {
                        var idArr = response.body;
                        for (let i = 0; i < idArr.length; i++) {
                            if (idArr[i].jd_id == this.$route.query.id) {
                                this.$http.jsonp(gm_API.getPriceList + idArr[i].gm_id).then((response) => {
                                    var arr = [];
                                    var reverseArr = response.body.reverse();
                                    for (var i = reverseArr.length - 1; i >= reverseArr.length - 7; i--) {
                                        arr.unshift(reverseArr[i]);
                                    }
                                    this.gmArr = arr;
                                    this.minFunction(arr, 'gm');
                                });
                                this.$http.jsonp(gm_API.findCompByID + idArr[i].gm_id).then((response) => {
                                    this.urlArr[1] = response.body[0].prd_url;
                                });
                                break;
                            }
                        }

                    });
                } else if (sellerOrigin == 'gm') {
                    this.getGmData();
                    //附加京东数组以及京东商品链接
                    this.$http.jsonp(compare_API).then((response) => {
                        var idArr = response.body;
                        for (let i = 0; i < idArr.length; i++) {
                            if (idArr[i].gm_id == this.$route.query.id) {
                                this.$http.jsonp(jd_API.getPriceList + idArr[i].jd_id).then((response) => {
                                    var arr = [];
                                    var reverseArr = response.body.reverse();
                                    for (var i = reverseArr.length - 1; i >= reverseArr.length - 7; i--) {
                                        arr.unshift(reverseArr[i]);
                                    }
                                    this.jdArr = arr;
                                    this.minFunction(arr, 'jd');
                                });
                                this.$http.jsonp(jd_API.findCompByID + idArr[i].jd_id).then((response) => {
                                    this.urlArr[0] = response.body[0].prd_url;
                                });
                                break;
                            }
                        }
                    });
                }
            },
            initGoodRate () {
                this.handlerGoodRate();
                var chart = echarts.init(document.getElementById('comment'));
                var option = {
                    legend: {
                        orient: 'horizontal',
                        x: 'center',
                        data: ['好评率', '差评率']
                    },
                    series: [
                        {
                            name: '用户评价',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: this.goodRate, name: '好评率'},
                                {value: 100 - this.goodRate, name: '差评率'}
                            ]
                        }
                    ]
                };
                chart.setOption(option);
            },
            initPolyline(myType) {
                //渲染简单折线图
                var polyline = document.getElementById('polyline');
                switch (myType) {
                    case 'jd':
                        this.initJd(polyline);
                        break;
                    case 'gm':
                        this.initGm(polyline);
                        break;
                    case 'two':
                        this.initTwo(polyline);
                        break;
                }
            },
            initCompare(myType) {
                //渲染复杂折线图
                var compare = document.getElementById('compare');
                switch (myType) {
                    case 'jd':
                        this.initJdCompare(compare);
                        break;
                    case 'gm':
                        this.initGmCompare(compare);
                        break;
                    case 'two':
                        this.initTwoCompare(compare);
                        break;
                }
            },
            initJd(objId){
                var chart = echarts.init(objId);
                var option = {
                    title: {
                        text: '该京东商品暂时不可比价'
                    },
                    legend: {
                        data: ['京东'],
                        y: 'bottom',
                        orient: 'horizontal'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        name: '日期',
                        data: [this.dateArr[0], this.dateArr[3], this.dateArr[6]]
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}￥'
                        }
                    },
                    series: [
                        {
                            name: '京东',
                            type: 'line',
                            stack: '总量',
                            data: [this.jdArr[0], this.jdArr[3], this.jdArr[6]],
                            markPoint: {
                                data: [
                                    {type: 'min', name: '最低价'}
                                ]
                            }
                        }
                    ]
                };
                chart.setOption(option);
            },
            initGm(objId){
                var chart = echarts.init(objId);
                var option = {
                    title: {
                        text: '该国美商品暂时不可比价'
                    },
                    legend: {
                        data: ['国美'],
                        y: 'bottom',
                        orient: 'horizontal'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        name: '日期',
                        data: [this.dateArr[0], this.dateArr[3], this.dateArr[6]]
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}￥'
                        }
                    },
                    series: [
                        {
                            name: '国美',
                            type: 'line',
                            stack: '总量',
                            data: [this.gmArr[0], this.gmArr[3], this.gmArr[6]],
                            markPoint: {
                                data: [
                                    {type: 'min', name: '最低价'}
                                ]
                            }
                        }
                    ]
                };
                chart.setOption(option);
            },
            initTwo(objId){
                var chart = echarts.init(objId);
                var option = {
                    title: {
                        text: '商品一周价格明细对比'
                    },
                    legend: {
                        data: ['国美', '京东'],
                        y: 'bottom',
                        orient: 'horizontal'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        name: '日期',
                        data: [this.dateArr[0], this.dateArr[3], this.dateArr[6]]
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}￥'
                        }
                    },
                    series: [
                        {
                            name: '国美',
                            type: 'line',
                            data: [this.gmArr[0], this.gmArr[3], this.gmArr[6]],
                            markPoint: {
                                data: [
                                    {type: 'min', name: '最低价'}
                                ]
                            }
                        },
                        {
                            name: '京东',
                            type: 'line',
                            data: [this.jdArr[0], this.jdArr[3], this.jdArr[6]],
                            markPoint: {
                                data: [
                                    {type: 'min', name: '最低价'}
                                ]
                            }
                        }
                    ]
                };
                chart.setOption(option);
            },
            initJdCompare(objId){
                var chart = echarts.init(objId);
                var option = {
                    title: {
                        text: '商品一周价格明细对比'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['京东']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.dateArr
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '京东',
                            type: 'line',
                            stack: '总量',
                            data: [this.jdArr[0], this.jdArr[1], this.jdArr[2], this.jdArr[3], this.jdArr[4], this.jdArr[5], this.jdArr[6]],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最贵'},
                                    {type: 'min', name: '最便宜'}
                                ]
                            }
                        }
                    ]
                };
                chart.setOption(option);
            },
            initGmCompare(objId){
                var chart = echarts.init(objId);
                var option = {
                    title: {
                        text: '商品一周价格明细对比'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['国美']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.dateArr
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '国美',
                            type: 'line',
                            stack: '总量',
                            data: [this.gmArr[0], this.gmArr[1], this.gmArr[2], this.gmArr[3], this.gmArr[4], this.gmArr[5], this.gmArr[6]],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最贵'},
                                    {type: 'min', name: '最便宜'}
                                ]
                            }
                        }
                    ]
                };
                chart.setOption(option);
            },
            initTwoCompare(objId){
                var chart = echarts.init(objId);
                var option = {
                    title: {
                        text: '商品一周价格明细对比'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['国美', '京东']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.dateArr
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '国美',
                            type: 'line',
                            data: [this.gmArr[0], this.gmArr[1], this.gmArr[2], this.gmArr[3], this.gmArr[4], this.gmArr[5], this.gmArr[6]],
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
                            data: [this.jdArr[0], this.jdArr[1], this.jdArr[2], this.jdArr[3], this.jdArr[4], this.jdArr[5], this.jdArr[6]],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最贵'},
                                    {type: 'min', name: '最便宜'}
                                ]
                            }
                        }
                    ]
                };
                chart.setOption(option);
            }
        },
        filters: {
            strFilter (val) {
                if (val == "" || val == "unknown") {
                    return val = "未知参数";
                } else {
                    return val;
                }
            }
        },
        components: {
            'v-main': main,
            'color-word': colorWord
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
    .detail-container {
        width: 100%;
        margin: 40px 0;
        padding: 0 60px;
        .column-wrapper {
            display: flex;
            flex-direction: row;
            .column1 {
                display: flex;
                flex-direction: column;
                width: 350px;
                img {
                    width: 250px;
                    height: 250px;
                }
            }
            .column2 {
                display: flex;
                flex-direction: column;
                flex: 1;
            }
        }
    }
</style>