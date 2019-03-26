<template>
  <div class='container'>
    <div class='work'>
      <h1>{{ $route.params.slug }}</h1>
      <div class='work__body'>
        <div class='work__img'>
          <img :src='"https://s3-ap-northeast-1.amazonaws.com/mrble-portfolio/img/"+ $route.params.slug +".jpg"'>
        </div>
        <div class='work__info'>
          <h2>詳細</h2>
          <p>作品の説明が入ります作品の説明が入ります作品の説明が入ります作品の説明が入ります作品の説明が入ります作品の説明が入ります</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

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
