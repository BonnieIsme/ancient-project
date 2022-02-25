<template>
    <div class="home">
      <div class="home-main">
          <el-menu
            router
            class="el-menu-vertical-demo">
            <div class="mark-box">
              <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170705%2Fd84d022fecf24b98b83fd6e92caa68d1_th.png&refer=http%3A%2F%2Fimg.mp.sohu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647409919&t=d1fd31b653939147135784b55a50eee8" alt="" srcset="">
              <span>四川大学</span>
            </div>
            <el-submenu index="/1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>四川省</span>
              </template>

              <template v-if="cityMsg[0]">

                <template  v-for="(city) in cityMsg[0].children" >

                  <template v-if="city.children.length">
                    <el-submenu :index="`/1/${city.id}`" :key="city.id">
                      <template slot="title">
                        <div style="width:28px"></div>
                        <span>{{city.city}}</span>
                      </template>
                      <el-menu-item v-for="(child,index) in city.children" :key="index" :index="`/1/${city.id}/${child.id}`">
                        <span>{{child.city}}</span>
                      </el-menu-item>
                    </el-submenu>
                  </template>

                  <template v-else>
                    <el-menu-item :index="`/1/${city.id}`" :key="city.id">
                      <span class="single-item">{{city.city}}</span>
                    </el-menu-item>
                  </template>
                  
                </template>

                

              </template>
            </el-submenu>

            <el-menu-item index="/2" style="display:flex;align-items: center;">
              <i class="el-icon-location"></i>
              <span>重庆市</span>
            </el-menu-item>
          </el-menu>

        <!-- 主要内容 -->
        <div class="home-content">
          <router-view></router-view>
        </div>
      </div>

    </div>
</template>



<script>
import { getCity } from '../api/controller'

export default {
  data() {
    return {
      cityMsg:[]
    }
  },
  created() {
    this.getCityData()
  },
  mounted() {
    
  },
  methods: {
    async getCityData(){
      let data = await getCity()
      this.cityMsg = data.data
      console.log('aaa',this.cityMsg);
    }
  },
};
</script>

<style>
  .home {
    width: 100%;
    height: 100vh;
  }

  .home-main {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
  }

  .home-content {
    width: calc(100% - 150px);
    height: 100%;
  }

  .el-menu {
    width: 150px;
    height: inherit;
    overflow-y: auto;
    overflow-x: hidden;
    /* background-color: transparent; */
    /* border: none; */
  }

.el-submenu__title , .el-menu-item{
  padding: 0 10px !important;
  height: 40px;
  line-height: 40px;
  font-family: cursive;
  font-weight: bold;
}

.el-submenu__title {
  display: flex;
  align-items: center;
  font-size: 12px !important;
}

.el-menu-item {
  font-size: 10px !important;
  min-width: 100px !important;
}

.el-submenu__icon-arrow {
  right: 10px;
}

.mark-box {
  font-size: 22px;
  font-weight: bold;
  margin: 15px 0 10px 0;
  font-family: QianTuBiFeng, cursive;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.mark-box img {
  width: 24px;
  height: 24px;
  position: relative;
  top: 2px;
  right: 2px;
}

.mark-box span {
  position: relative;
  right: 8px;
}

.single-item {
  position: relative;
  left: -18px;
}
</style>