<template>
  <div class='main-box'>

    <!-- 内容标题 -->
    <div class="main-top">
      <div class="title">
      </div>
      <el-select v-model="selectedValue" placeholder="请选择" @change="getStone">
        <el-option
         v-for="item in options"
         :key="item.id"
         :label="item.bricksName"
         :value="item.id"
        ></el-option>
      </el-select>
    </div>

    <template  v-if="selectedStone">
      <div class="main-content">
        <div class="left">
          <div class="left-pic" :style="'backgroundImage:url('+ selectedStone.bricksPic +');'"></div>
          <div class="left-text">{{ size }}</div>
        </div>
        <template v-if="selectedStone.bricksInfo">
          <div class="right">
          {{ selectedStone.bricksInfo }}
        </div>
        </template>
      </div>
    </template>

    <template v-else>
      <div class="empty-box"></div>
    </template>
  </div>
</template>

<script>
import { getStone, getStoneList } from '../api/controller'

export default {
  components: {},
  data () {
    return {
      selectedValue:'',
      selectedStone:null,
      options:[]
    }
  },
  // 监控data中的数据变化
  watch: {
    "$route":"getStoneList"
  },

  computed:{
    size(){
      let t = this.selectedStone ? this.selectedStone.bricksSize : ''
      let arr = t && t.split('*') || []
      if (arr.length) {
        return arr[0] + ' ' + '*' + ' ' + arr[1]
      }else{
        return '尺寸未知'
      }


      
    }

  },

  created () {
    this.getStoneList()
  },
  mounted () {``
    
  },

  methods: {
    // 重置数据
    reset(){
      this.selectedValue = ''
      this.selectedStone = null
      this.options = []
      // console.log('数据已重置');
    },

    // 获取画砖列表
    async getStoneList(){
      this.reset()

      let cityId = this.$route.params.district ? parseInt(this.$route.params.district) 
      : this.$route.params.city ? parseInt(this.$route.params.city) 
      : this.$route.params.address ? parseInt(this.$route.params.address) : ''
      console.log('地点id为：',cityId);
      let data = cityId && await getStoneList({
        cityId
      })
      this.options = data && data.data
      console.log('列表为：',this.options);

      if (data.status == '200') {
        this.$notify({
          message:'请求成功',
          type:'success',
        })

      }

      // 默认选择第一个
      this.selectedValue = this.options ? this.options[0].id : ''
      this.selectedValue && this.getStone()

    },

    async getStone(){
      console.log('选中id：',this.selectedValue);
      let msg = await getStone({
        brickId: parseInt(this.selectedValue)
      })
      console.log('信息为：',msg.data);
      this.selectedStone = msg.data
    }
  }
}
</script>

<style scoped>
.main-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.main-top {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.main-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  width: 63%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  vertical-align: center;
  padding: 0 5px;
  font-size: 28px;
  font-family: QianTuBiFeng, cursive;
  font-weight: bold;
}

.left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.left-pic {
  width: 300px;
  height: 300px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(225, 225, 225, 0.5);
  margin-bottom: 15px;
  border-radius: 5px;
}

.right {
  width: calc(45% - 40px);
  height: 240px;
  padding-right: 20px;
  font-size: 12px;
  line-height: 24px;
  text-align: start;
  text-indent: 20px;
  font-family: cursive;
}

.el-select {
  flex: 1;
  padding-right: 20px;
}

.left-text {
  font-size: 10px;
  font-family: cursive;
}

.empty-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../assets/picture/empty.jpg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>
