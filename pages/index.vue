<template>
  <!-- 轮播图区域 -->
  <div class="banners">
    <el-carousel height="700px" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div>
          <img :src="item" alt />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return{
      banners: [
        "http://157.122.54.189:9095/assets/images/th01.jfif",
        "http://157.122.54.189:9095/assets/images/th02.jfif",
        "http://157.122.54.189:9095/assets/images/th03.jfif",
        "http://157.122.54.189:9095/assets/images/th04.jfif"
      ]
    }
  }
};
</script>

<style scope  lang="less">
.banners{
  img{
    width: 100%;
  }
}
</style>