<template>
  <div id="app" class="layout">
    <Layout>
      <Sider breakpoint="md" collapsible :width="300" :collapsed-width="78" v-model="isCollapsed" :style="{background: '#fff'}">
        <img src="https://app.beeline.sg/img/poweredbybeeline.svg" class="side-logo" />
        <div class="nav-form">
          <Input v-model="searchInput" icon="ios-search" />
          <div :style=" {'height':'75vh','overflow-y':'auto'}">
            <div class="sk-cube-grid" v-show="isLoading">
              <div class="sk-cube sk-cube1"></div>
              <div class="sk-cube sk-cube2"></div>
              <div class="sk-cube sk-cube3"></div>
              <div class="sk-cube sk-cube4"></div>
              <div class="sk-cube sk-cube5"></div>
              <div class="sk-cube sk-cube6"></div>
              <div class="sk-cube sk-cube7"></div>
              <div class="sk-cube sk-cube8"></div>
              <div class="sk-cube sk-cube9"></div>
            </div>
            <sugg-card v-for="(route, index) in routes" :key="index" :label="route.label" 
            :from="route.from" :to="route.to" :timing="route.trips|timeFromTrips" :search="searchInput"
            v-if="searchInput === '' ||
                    ( route.from.toLowerCase().includes(searchInput.toLowerCase())
                      || route.to.toLowerCase().includes(searchInput.toLowerCase())
                      || route.label.toLowerCase().includes(searchInput.toLowerCase()) )" />
          </div>
        </div>
        <div slot="trigger"></div>
      </Sider>
      <Layout style="min-height: 100vh">
        <Content>
          <google-map></google-map>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';

  import GoogleMap from './components/GoogleMap';
  import SuggCard from './components/SuggCard';

  // function debounce(func, wait, immediate) {
  //   let timeout;
  //   return function run(...arg) {
  //     const context = this;
  //     const args = arg;
  //     const later = function later() {
  //       timeout = null;
  //       if (!immediate) func.apply(context, args);
  //     };
  //     const callNow = immediate && !timeout;
  //     clearTimeout(timeout);
  //     timeout = setTimeout(later, wait);
  //     if (callNow) func.apply(context, args);
  //   };
  // }

  export default {
    name: 'app',
    components: {
      GoogleMap,
      SuggCard,
    },
    data() {
      return {
        url: 'https://api.beeline.sg',
        isCollapsed: false,
        routes: [],
        searchInput: '',
        isLoading: true,
      };
    },
    computed: {
      menuitemClasses() {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : '',
        ];
      },
    },
    methods: {
      async initRoutes() {
        const value = await this.$getItem('beelineData');
        if (value != null) {
          this.routes = value;
        } else {
          try {
            const allRoutes = await axios.get(`${this.url}/routes`, {
              params: {
                startDate: Date.now(),
                includePath: true,
                includeTrips: true,
                limitTrips: 5,
              },
            });
            this.routes = allRoutes.data;
            this.$setItem('beelineData', allRoutes.data, () => {
              console.log('woots');
            });
          } catch (e) {
            console.log(e);
          }
        }
        this.isLoading = false;
      },
    },
    filters: {
      timeFromTrips(value) {
        const start = moment(value[0].tripStops[0].time).format('hh:mm a');
        const lastTripIndex = value[value.length - 1].tripStops.length - 1;
        const end = moment(value[value.length - 1].tripStops[lastTripIndex].time).format('hh:mm a');
        return {
          start,
          end,
        };
      },
    },
    mounted() {
      this.initRoutes();
    },
  };

</script>

<style>
  .ivu-layout-sider-zero-width-trigger {
    z-index: 100000000;
    top: 55px
  }

  .side-logo {
    width: 130px;
    display: block;
    margin: 10px auto;
  }

  .nav-form {
    width: 100%;
    padding: 8px;
    margin-top: 40px;
  }

  .suggRoute {
    margin-top: 5px;
  }

  .sk-cube-grid {
    width: 40px;
    height: 40px;
    margin: 100px auto;
  }

  .sk-cube-grid .sk-cube {
    width: 33%;
    height: 33%;
    background-color: #BDBDBD;
    float: left;
    -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  }

  .sk-cube-grid .sk-cube1 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .sk-cube-grid .sk-cube2 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }

  .sk-cube-grid .sk-cube3 {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }

  .sk-cube-grid .sk-cube4 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }

  .sk-cube-grid .sk-cube5 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .sk-cube-grid .sk-cube6 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }

  .sk-cube-grid .sk-cube7 {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }

  .sk-cube-grid .sk-cube8 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }

  .sk-cube-grid .sk-cube9 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  @-webkit-keyframes sk-cubeGridScaleDelay {
    0%,
    70%,
    100% {
      -webkit-transform: scale3D(1, 1, 1);
      transform: scale3D(1, 1, 1);
    }
    35% {
      -webkit-transform: scale3D(0, 0, 1);
      transform: scale3D(0, 0, 1);
    }
  }

  @keyframes sk-cubeGridScaleDelay {
    0%,
    70%,
    100% {
      -webkit-transform: scale3D(1, 1, 1);
      transform: scale3D(1, 1, 1);
    }
    35% {
      -webkit-transform: scale3D(0, 0, 1);
      transform: scale3D(0, 0, 1);
    }
  }

</style>
