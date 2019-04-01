<template>
  <div class='container'>
    <h2>作品集</h2>
    <ul>
      <li>2016年</li>
      <li>2017年</li>
      <li>2018年</li>
      <!-- <li>
        <nuxt-link
          :to='{query: {sort: "2019"}, path: "/works"}'>2019年
        </nuxt-link>
      </li> -->
    </ul>

    <!-- <h2>ソート：{{ sort }}</h2> -->
    <div>
      <ul
        v-if='data'
        class='worksList'>
        <li v-for='item in data'>
          <nuxt-link :to='{name:"works-slug", params:{slug:item.title}}'>
            <img :src='"https://s3-ap-northeast-1.amazonaws.com/mrble-portfolio/img/"+ item.title +".jpg"'>
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
</template>

<script>
const axios = require('axios');
export default {
  watchQuery: ['sort'],

  data() {
    return {
      work: {
        _id: 0,
        title: '',
        createYear: 2019,
      },
      res: {
        data: '',
        db: '',
      },

      validation: {
        work: {
          required: true,
        }
      }
    }
  },

  async asyncData (context) {
    //let {data} = await axios.get('http://localhost:3000/api/db/getData')
    let {data} = await axios.get('https://mrble-portfolio.herokuapp.com/api/db/getData')
    return { data: data }
  },
}

</script>

<style lang='scss' scoped>

p {
  font-size: 14px;
}

ul {
  list-style-position: inside;
}

h2 {
  margin: 30px 0 10px;
  padding: 10px 10px;
  background: #eaeaea;
  font-size: 20px;
  font-weight: bold;
}

.container {
  width: 1100px;
  margin: 0 auto;
}

.worksList {
  /* display: flex;
  flex-wrap: wrap; */
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
}

</style>
