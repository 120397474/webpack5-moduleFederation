<template>
  <div>
    <a-layout-header class="header">
      <div class="logo">
        <img src="../assets/logo.png" alt />
        <div>
          <div class="platform">
            <span>云建智慧工地</span>
          </div>
        </div>
      </div>
      <div :style="style">
        <a-menu :selectedKeys="[defaultSystem]" theme="dark" mode="horizontal">
          <a-menu-item @click="changeSystem" v-for="item in system" :key="item.key">{{item.title}}</a-menu-item>
        </a-menu>
        <div class="avactor">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              系统操作 <DownOutlined />
            </a>
            <template v-slot:overlay>
              <a-menu @click="onClick">
                <a-menu-item key="1">
                  退出系统
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>
  </div>
</template>

<script>
import { defineComponent, reactive , toRefs} from 'vue'
import { DownOutlined } from '@ant-design/icons-vue';
import { useRouter} from "vue-router";
export default defineComponent({
  name: "headerMenu",
  components:{
    DownOutlined
  },
  // setup 初始化
  setup(props, ctx){
    // 路由
    const router = useRouter()
    const state = reactive({
      style: {
        lineHeight: "64px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "64px"
      },
      system: []
    })

    const showConfirm = async (e) => {

    }

    const changeSystem = async (args) => {
      let key = args.key;
      this.setCurrentSystem(key);
      let currentMenuGroup = Menu.find(ele => {
        if (ele.system == key) {
          return true;
        }
        return false;
      });
      console.log(currentMenuGroup);
      this.$router.push(`/${currentMenuGroup.children[0].key}`);
    }

    const onClick = async ({ key }) => {
      sessionStorage.setItem('username', '')
      router.replace('/')
    }
    return {
      ...toRefs(state),
      showConfirm,
      changeSystem,
      onClick
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .platform {
    color: #fff;
  }
  .avactor {
    float: right;
    margin-left: 20px;
  }
  .ant-menu-item,
  .ant-menu-item-selected {
    height: 64px;
    line-height: 64px;
  }
}
.logo {
  width: 260px;
  height: 100%;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 120px;
    height: 40px;
    margin-right: 20px;
  }
}
</style>