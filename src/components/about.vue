<template>
    <v-main>
        <div slot="content">
            <div class="about-container">
                <table class="am-table">
                    <thead>
                    <tr>
                        <th>学生</th>
                        <th>学号</th>
                        <th>专业</th>
                        <th>负责内容</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>张志辉</td>
                        <td>1</td>
                        <td>网络工程</td>
                        <td>前端</td>
                    </tr>
                    <tr>
                        <td>龚文韬</td>
                        <td>2</td>
                        <td>计算机科学与技术</td>
                        <td>后台</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </v-main>
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
.about-container{
    padding: 20px 60px;
}
</style>