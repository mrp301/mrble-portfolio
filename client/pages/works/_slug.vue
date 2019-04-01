<template>
  <div class='container'>
    <div class='work'>
      <h1>{{ data.title }}</h1>
      {{ $route.params._id }}
      <div class='work__body'>
        <div class='work__img'>
          <img :src='"https://s3-ap-northeast-1.amazonaws.com/mrble-portfolio/img/"+ data.title'>
        </div>
        <div class='work__info'>
          <h2>コメント</h2>
          <p v-if='data.comment !== ""'>{{ data.comment }}</p>
          <p v-else>コメントがありません。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  async asyncData (route) {
    //let {data} = await axios.get('http://localhost:3000/api/db/getData', {
    let {data} = await axios.get('https://mrble-portfolio.herokuapp.com/api/db/getData', {
      params: {
        id: route.params.slug
      }
    })
    return { data: data }
  }
}

</script>

<style lang='scss' scoped>
.container {
  width: 1100px;
  margin: 0 auto;
}

.work {
  width: 800px;
  margin: 0 auto;

  &__body {
    display: flex;
  }

  &__img {
    width: 59%;
    margin-right: 2%;

    & > img {
      width: 100%;
    }
  }

  &__info {
    width: 29%;
  }
}
</style>
