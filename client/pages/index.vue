<template>
  <section>
    <div class='p-mainVisual'>
    </div>
    <div class='l-container'>
      <div class='l-container__body'>
        <h2>mrbleのサイトへようこそ！</h2>
        <p>将来ポートフォリオになるサイトです。<br>
        とりあえずイラストとかブログ記事とか適当に追加していく予定です！</p>
      </div>
    </div>

    <div class='l-container l-container--grey'>
      <div class='l-container__body'>
        <h2>できること</h2>
        <ul>
          <li><nuxt-link to='works'>イラスト</nuxt-link></li>
          <li>HTML/CSS</li>
          <li>JavaScript</li>
        </ul>
      </div>
    </div>

  </section>
</template>

<script>

</script>

<style lang='scss'>
p {
  font-size: 14px;
}

h2 {
  font-weight: bold;
  font-size: 18px;
  line-height: 2;
}

ul {
  list-style: none;
}

.p-mainVisual {
  width: 100vw;
  height: 600px;
  /* background: url('~assets/images/pc/main_visual.jpg') no-repeat;
  background-size: cover;
  background-position: center; */

  img {
    width: 100%;
  }
}

.l-container {
  width: 100vw;
  padding: 10px 0;

  &--grey {
    background: #f8f9fa;
  }

  &__body {
    width: 1000px;
    margin: 30px auto;
  }
}
</style>
