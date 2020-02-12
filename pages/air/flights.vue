<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <div>
          <!-- 1.3使用列表头部组件 -->
          <FlightsListHead></FlightsListHead>
        </div>

        <!-- 航班信息 -->
        <div>
          <!-- 2.3使用机票列表组件组件 -->
          <FlightsItem></FlightsItem>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
//1.1引入列表头部组件
import FlightsListHead from "@/components/air/flightsListHead.vue";
//2.1引入机票列表组件组件
import FlightsItem from "@/components/air/flightsItem.vue";

export default {
  data() {
    return {};
  },
  components: {
    //1.2注册列表头部组件 2.2注册机票列表组件组件
    FlightsListHead,
    FlightsItem
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>