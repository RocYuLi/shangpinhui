<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
        <!-- 事件委派 -->
      <div  @mouseleave="leaveShow" @mouseenter="enterShow" >
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
       <transition name="sort">
          <div class="sort" v-show="show">
          <!-- 事件委派+编程式导航实现 -->
          <div class="all-sort-list2" @click="goSearch" >
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a :data-categoryName="c1.categoryName" :data-category1id="c1.categoryId">{{ c1.categoryName }}</a>
              </h3>
              <!-- 二三级分类 -->
              <div class="item-list clearfix" :style="{display:currentIndex == index?'block':'none'}">
                <div
                  class="subitem"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2id="c2.categoryId">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <a :data-categoryName="c3.categoryName" :data-category3id="c3.categoryId">{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
        
      </div>
      
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle"

export default {
  name: "TypeNav",
  //组件挂载完毕 可以向服务器放请求

  data() {
    return {
      //存储用户鼠标移上的分类
      currentIndex: -1,
      show:true
    };
  },
  methods: {
    //鼠标进入修改响应式数据currentIndex属性
    changeIndex:throttle(function(index){
         //index指鼠标移上去的索引值
      //正常情况： 鼠标进入，每一个一级分类h3 都会触发鼠标进入事件
      //非正常情况（用户操作很快） ： 本身一级分类都应该触发，但只有几个h3触发了
      // 就是由于用户行为过快，导致浏览器反应不过来，因为回调函数出现大量业务，所以会出现卡顿
      this.currentIndex = index;
    },50),
   
    goSearch(event){
       //事件委派存在问题：
       //1. 如何确定点击的是a标签？ 因为里边还有div h3 等标签 2.如何获取参数【1，2，3级分类的名字及id】

       //第一个问题 如何确定点击的是a标签？ 加上自定义属性data-category属性 其余节点没有
       let element = event.target
       //获取触发当前事件的节点 h3\a\dl\dt 需要带data-categoryname这样的节点【一定是a标签】
       //节点有一个属性dataset属性，可以获取到当前节点下的值
       console.log(element.dataset)
       let {categoryname,category1id,category2id,category3id} = element.dataset
       //如果标签上有categoryName这个值 一定是a标签
       if(categoryname){
         //整理路由跳转的参数
         let location = {name:"search"}
         let query = {categoryName:categoryname}
         //一级 二级 三级分类的a标签
          if(category1id){
            query.category1Id = category1id
          }else if(category2id){
            query.category2Id = category2id
          }else if(category3id){
            query.category3Id = category3id
          }
          //整理参数
          location.query = query
          //路由跳转
          this.$router.push(location)
       }
    },
    //鼠标移入展示商品
    enterShow(){
       //鼠标移入 商品列表展示
      this.show = true
    }, 
    leaveShow(){
      this.currentIndex = -1;
      // 鼠标离开 商品列表隐藏
      if(this.$route.path != "/home"){
        this.show = false
      }
    }
  },
  mounted() {
    //通知vuex发送请求，获取数据，存储于仓库中
    this.$store.dispatch("categoryList");
    //如果不是home路由组件，将typenav组件隐藏
    
    if(this.$route.path!="/home"){
      this.show = false
    }
    
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
};
</script>
<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cur {
          background: rgb(255, 37, 27);
        }
      }
    }
    .sort-enter{
      height: 0px;
    }
    //过渡动画结束状态
    .sort-enter-to{
      height: 461px;
    }
    //定义动画时间 速率
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
</style>