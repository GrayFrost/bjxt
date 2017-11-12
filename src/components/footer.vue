<template>
    <footer>
        <div class="footer-wrapper">
            <section>
                <h2>免责声明</h2>

                <p>本站不担保网络服务一定能满足用户的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保;
                    本站所提供的信息都来自第三方网上商城，本网站不经营、销售任何产品，具体详情及解释以该信息所属商家为准。</p>
            </section>
            <section>
                <h2>用户协议</h2>

                <p>本网站上的链接服务可以直接进入其他站点，这些链接的站点不受本网站的控制，对任何与本站链接网站的内容不负责任。</p>
            </section>
            <section>
                <h2>学生比价</h2>

                <ul class="other-message">
                    <li>
                        <router-link :to="{name: 'about'}">关于我们</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'thank'}">鸣谢</router-link>
                    </li>
                </ul>
            </section>
        </div>
        <div class="copyright">
            <p>
                <span>备案号</span>
                <span>&copy;Copyright</span>
            </p>
        </div>
    </footer>
</template>

<script type="text/ecmascript-6">
    import main from 'components/main.vue';
    export default {
        components: {
            'v-main': main
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
footer{
    width: 100%;
    background-color: #5f6f81;
    color: #fff;
    .footer-wrapper{
        display: flex;
        flex-direction: row;
        padding: 0 60px;
        section{
            width: 33%;//兼容
            flex: 1;
            box-sizing: border-box;
            padding: 10px;
            .other-message{
                position: relative;
                left: -30px;
                li{
                    list-style: none;
                    a{
                        color: #fff;
                    }
                }
            }
        }
    }
    .copyright{
        height: 60px;
        p{
            margin-left: 70px;
        }
    }
}
</style>