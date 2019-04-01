<template>
  <footer>
    <div class='footer-container'>
      <div class='footer l-footer'>
        <ul class='footer-list footer-list-start'>
          <li><a href='/'>© 2019_mrble_Inc. /</a></li>
          <li><a href='/edit'>edit /</a></li>
          <li><a href='/works'>works /</a></li>
          <li><a target='_blank' href='https://aws.amazon.com/jp/'>aws /</a></li>
          <li><a target='_blank' href='https://jp.heroku.com/'>heroku</a></li>
        </ul>
        <ul class='footer-list footer-list-end'>
          <li><a target='_blank' href='https://github.com/mrp301/mrble-portfolio'>github /</a></li>
          <li><a target='_blank' href='https://twitter.com/tubdaka616'>twitter</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style lang='scss' scoped>
.footer-container {
  margin-top: 20px;
  width: 100%;
  background: #f6f6f6;
  padding: 16px;

  .footer {
    font-size: 1.2rem;
    max-width: 1000px;
    margin: 0 auto;
    padding: 10px 32px;
  }

  .l-footer {
    display: flex;
    justify-content: space-between;
  }

  .footer-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    &.footer-list-start {
      width: 60%;
    }

    &.footer-list-end {
      justify-content: flex-end;
      width: 40%;
    }

    li {
      list-style: none;
      margin-right: 8px;
      align-items: center;

      a {
        font-size: 1.2rem;
        color: #888;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
/* smartPhone */
@media screen and (max-width: 640px) {
  .footer-container {
    padding-right: 3%;
    padding-left: 3%;
    .footer {
      height: auto;
      padding: 0;
    }
    .l-footer {
      display: block;
    }
    .footer-list {
      flex-wrap: wrap;
      &.footer-list-start,
      &.footer-list-end {
        width: 100%;
      }
      &.footer-list-end {
        justify-content: flex-start;
      }
    }
  }
}
</style>
