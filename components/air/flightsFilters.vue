<template>
    <div class="filters">
        <!--  左上角显示单程广州-上海/2019-06-17的区域 -->
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}} 
                / 
                {{data.info.departDate}}
            </el-col>
            <!-- 显示起来机场的区域 -->
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option
                    v-for="(item,index) in data.options.airport" 
                    :key="index" 
                    :label="item" 
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <!-- 显示起飞时间的区域 -->
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option
                    v-for='(item,index) in data.options.flightTimes'
                    :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    value="1"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <!-- 显示航空公司的区域 -->
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    v-for="(item,index) in data.options.company" 
                    :key="index" 
                    :label="item"
                    :value="item"> 
                    </el-option>
                </el-select>
            </el-col>
            <!-- 显示机型的区域 -->
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                    label="大"
                    value="大">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小
        }
    },
        
     /* 
        【注意贤哥教文件命名规则，这里都是有对应关联起来的，在实际开发很能体会出行业内统一使用的文件命名的好处，不要怕命名文件夹】
        注意：父子组件之间的通信就是 props down,events up，父组件通过 属性props向下传递数据给子组件，
        子组件通过 事件events 给父组件发送消息。
        可以理解成：components/air/flightsFilters(公共组件为：子组件)
                   pages/air/flights(航空列表展示页面为：父组件)的】
        现实中打电话案例：props:是父亲的手机号，这个props是放在flightsFilters(儿子手机里面)组件里面，这样子就能两者相关联起来，就能实现通信，传值了

      */
     //props:为父组件给子组件通信传数据的属性,里面是传一个原生的JS：data的数据对象给保存起来，到时方便获取与使用
     props:{
        data:{
            type:Object,

            default:{}
        }
     },
    methods: {
        // 选择机场时候触发
        handleAirport(value){
            console.log(value)
            
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            
        },

         // 选择航空公司时候触发
        handleCompany(value){
            
        },

         // 选择机型时候触发
        handleAirSize(value){
           
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>