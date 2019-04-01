<template>
  <div>
    <div
      v-if='loading'
      class='overlay'>
      <div class='loadContainer'><img src='~/assets/images/load.gif'></div>
    </div>
    <div class='sortContainer'>
      <ul class='sort'>
        <li :class='{"is-actibe": sort === "2014"}'>
          <nuxt-link
            :to='{query: {createYear: "2014"}, path: "/works"}'>2014年
          </nuxt-link>
        </li>
        <li :class='{"is-actibe": sort === "2015"}'>
          <nuxt-link
            :to='{query: {createYear: "2015"}, path: "/works"}'>2015年
          </nuxt-link>
        </li>
        <li :class='{"is-actibe": sort === "2016"}'>
          <nuxt-link
            :to='{query: {createYear: "2016"}, path: "/works"}'>2016年
          </nuxt-link>
        </li>
        <li :class='{"is-actibe": sort === "2017"}'>
          <nuxt-link
            :to='{query: {createYear: "2017"}, path: "/works"}'>2017年
          </nuxt-link>
        </li>
        <li :class='{"is-actibe": sort === "2018"}'>
          <nuxt-link
            :to='{query: {createYear: "2018"}, path: "/works"}'>2018年
          </nuxt-link>
        </li>
        <li :class='{"is-actibe": sort === "2019"}'>
          <nuxt-link
            :to='{query: {createYear: "2019"}, path: "/works"}'>2019年
          </nuxt-link>
        </li>
        <li :class='{"is-actibe": sort === "all"}'>
          <nuxt-link
            :to='{path: "/works"}'>すべて
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class='container'>
      <div>
        <ul
          v-if='data'
          class='worksList'>
          <li v-for='item in data'>
            <nuxt-link :to='{name:"works-slug", params:{slug:item._id}}'>
              <img :src='"https://s3-ap-northeast-1.amazonaws.com/mrble-portfolio/img/"+ item.title'>
              <div class='worksList-head'>
                <div class='creafix'>
                  <p class='worksList-id'>id {{ item._id }}</p>
                  <p class='worksList-createYear'>createYear {{ item.createYear }}年</p>
                </div>
                <p class='worksList-title'>{{ item.title }}</p>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  watchQuery: ['createYear'],

  data() {
    return {
      loading: true
    }
  },

  mounted() {
    this.loading = false
  },

  async asyncData (context) {
    if(context.query.createYear) {
      //let {data} = await axios.get('http://localhost:3000/api/db/getData', {
      let {data} = await axios.get('https://mrble-portfolio.herokuapp.com/api/db/getData', {
        params: {
          createYear: context.query.createYear
        }
      })
      return { data: data, loading: false, sort: context.query.createYear }
    } else {
      //let {data} = await axios.get('http://localhost:3000/api/db/getData')
      let {data} = await axios.get('https://mrble-portfolio.herokuapp.com/api/db/getData')
      return { data: data, loading: false, sort: 'all' }
    }
  },
}

</script>

<style lang='scss' scoped>

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, .8);
}

.loadContainer {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-30px, -30px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, .7);
  width: 60px;
  height: 60px;
  border-radius: 4px;
}

.sortContainer {
  position: fixed;
  top: 0;
  width: 100%;
  background: #f5f5f5;
  border-bottom: solid 1px #d6dee5;
  margin-bottom: 15px;
  z-index: 10;
  box-shadow: 0 0 7px 0 #b3b3b3;
}

.sort {
  width: 1100px;
  padding: 10px;
  margin: 0 auto;
  display: flex;

  li {
    border-radius: 4px;
    max-width: 200px;
    text-align: center;
    list-style: none;
    margin-right: 5px;

    &.is-actibe {
      opacity: .5;
    }

    &:first-child {
      background: rgb(153, 114, 92);
    }

    &:nth-child(2) {
      background: rgb(153, 92, 145);
    }

    &:nth-child(3) {
      background: rgb(92, 153, 151);
    }

    &:nth-child(4) {
      background: rgb(153, 141, 92);
    }

    &:nth-child(5) {
      background: rgb(153, 92, 133);
    }

    &:nth-child(6) {
      background: rgb(153, 114, 92);
    }

    &:nth-child(7) {
      background: rgb(92, 153, 133);
    }

    &:hover {
      opacity: .5;
    }

    a {
      padding: 10px 30px;
      display: block;
      font-weight: bold;
      color: #fff;
    }
  }
}

p {
  font-size: 14px;
}

ul {
  list-style-position: inside;
}

h2 {
  margin-bottom: 10px;
  padding: 10px 10px;
  background: #eaeaea;
  font-size: 20px;
  font-weight: bold;
}

.container {
  width: 1100px;
  margin: 70px auto 0;
}

.worksList {
  list-style: none;
  column-count: 4;
  column-gap: 5px;
  column-fill: auto;
  text-align: center;

  li {
    display: inline-block;
    margin-bottom: 5px;
    border: solid 1px  #d4d4d4;
    background: #fff;
    box-shadow: 0 2px 3px 0 #f1f1f1;

    .worksList-head {
      padding: 10px;
      color: #666;
      line-height: 1;
    }

    .worksList-id {
      font-size: 10px;
      float: left;
    }

    .worksList-createYear {
      font-size: 8px;
      float: right;
    }

    .worksList-title {
      font-size: 12px;
      font-weight: bold;
      margin-top: 5px;
      text-align: left;
    }

    img {
      width: 100%;
    }

    &:hover {
      opacity: .7;
    }
  }
}

.creafix::after {
  content: '';
  clear: both;
  display: block;
}

input {
  border: solid 1px #333;
}

.u-flex {
  display: flex;
}

dl {
  dt {
    margin-bottom: 10px;
  }
}

@media screen and (max-width:576px) {
  .worksList {
    column-count: 2;
  }

  .sortContainer {
    overflow-x: scroll;
  }
}

@media screen and (min-width:578px) and (max-width:992px) {
  .worksList {
    column-count: 3;
  }
}

@media screen and (max-width:992px) {
  .container {
    width: 100%;
    padding: 0 3%;
  }

  .sortContainer {
    width: 100%;
  }
}

</style>
