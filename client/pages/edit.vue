<template>
  <div class='container'>
    <h1>編集ページ</h1>
    <div class='editArea'>
      <div class='editArea__left'>
        <h2>DBリスト</h2>

          <table>
            <thead>
              <tr>
                <th>_id</th>
                <th>title</th>
                <th>createYear</th>
                <th>詳細</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody class='editArea_body'>
              <tr v-for='(item,index) in data'>
                <td><input class='no' type='number' v-model='data[index]._id'></td>
                <td><input type='text' v-model='data[index].title' ></td>
                <td><input class='no' type='number' v-model='data[index].createYear'></td>
                <td><button @click='openModal(index)'>詳細</button></td>
                <td><button class='delete' @click='deleteRow(index)'>削除</button></td>
              </tr>
            </tbody>
          </table>
          <div>
            <button @click='createRow()'>行の追加</button>
            <button @click='submitData()'>DB更新</button>
          </div>
      </div>
      <div class='editArea__right'>
        <h2>▼登録内容(JSON)</h2>
        <ol>
          <li v-for='item in data'>{{ item }}</li>
        </ol>
      </div>
    </div>
    <div v-if='log.message !== ""'>
      <h2>ログ</h2>
      <textarea
        ref = 'textArea'
        class='log'
        rows='5'
        v-model='log'>
      </textarea>
    </div>
    <div
      class='modal'
      ref='modal'>
      <p class='modal__header'>{{ modal.data.title }}</p>
      <dl>
        <div v-if='modal.data.title !== ""'>
          <dt>画像</dt>
          <dd class='modal__img'>
            <img
              :alt='modal.data.title'
              :src='"https://s3-ap-northeast-1.amazonaws.com/mrble-portfolio/img/"+ modal.data.title +".jpg"'>
          </dd>
        </div>
        <div>
          <dt>_id</dt>
          <dd>{{ modal.data._id }}</dd>
        </div>
        <div>
          <dt>title</dt>
          <dd>{{ modal.data.title }}</dd>
        </div>
        <div>
          <dt>createYear</dt>
          <dd>{{ modal.data.createYear }}</dd>
        </div>
        <div>
          <dt>コメント</dt>
          <dd><textarea v-model='data[modal.index].comment' rows='5'>{{ data[modal.index].comment }}</textarea></dd>
        </div>
        <div>
          <dt>ファイルパス</dt>
          <dd><input type='file'></dd>
        </div>
      </dl>
      <div class='modal__btnContainer'>
        <!-- <button @click='updateDate()'>登録</button> -->
        <button @click='closeModal()'>閉じる</button>
      </div>
    </div>
    <div
      class='overlay'
      ref='overlay'
      @click='closeModal()'></div>
  </div>
</template>

<script>
const axios = require('axios');

export default {

  data() {
    return {
      log: '',
      currentTime: '',
      modal: {
        index: 0,
        data: {
          _id: '',
          title: '',
          createYear: '',
          comment: '',
          filePath: ''
        },
      }
    }
  },

  async asyncData (context) {
    console.log('async発火')
    //let {data} = await axios.get('http://localhost:3000/api/db/getData')
    let {data} = await axios.get('https://mrble-portfolio.herokuapp.com/api/db/getData')
    return { data: data }
  },

  methods: {
    async submitData() {
      //await axios.post('http://localhost:3000/api/db/addData', this.data)
      await axios.post('https://mrble-portfolio.herokuapp.com/api/db/addData', this.data)
      .then((response) => {
       this.insertLog('通信成功\n')
      }).catch(() => {
        this.insertLog('通信失敗\n')
      })
      this.$router.push('/edit')
    },

    createRow() {
      this.data.push({
        _id: parseInt(this.data.slice(-1)[0]._id) + 1,
        title: '',
        createYear: '2019',
        comment: '説明文が入ります',
        filePath: ''
      })
      this.insertLog('行を追加しました\n')
    },

    deleteRow(index) {
      this.insertLog(index +'行：'+ JSON.stringify(this.data[index]) +'を削除しました\n')
      this.data.splice(index,1)
    },

    scrollTextArea() {
      this.$refs.textArea.scrollTop = this.$refs.textArea.scrollHeight
    },

    insertLog(text) {
      this.getCurrentTime()
      this.log += this.currentTime + text
      this.scrollTextArea()
    },

    getCurrentTime() {
      const date = new Date()
      const hour = date.getHours()
      const time = date.getMinutes()
      const sec = date.getSeconds()
      this.currentTime = hour +'時'+ time +'分'+ sec +'秒：'
    },

    closeModal() {
      this.$refs.modal.style.display = 'none'
      this.$refs.overlay.style.display = 'none'
    },

    openModal(index) {
      this.modal.index = index
      this.modal.data = this.data[index]
      this.$refs.modal.style.display = 'block'
      this.$refs.overlay.style.display = 'block'
    }
  },
}

</script>

<style lang='scss' scoped>

.editArea {
  display: flex;

  &__left {
    width: 50%;
    margin-right: 1%;
  }

  &__right {
    width: 49%;
  }
}

.container {
  width: 1000px;
  margin: 0 auto;
}

table {
  width: 100%;
  border: solid 1px #333;
  button {
    margin: 0;
  }
}

th,td {
  padding: 5px 8px;
}

tbody {
  display: block;
  overflow-y: scroll;
  height: 500px;
  & tr:nth-child(even) {
    background: #eee;
  }
}

thead {
  display: block;
  background: #eee;
  border-bottom: solid 1px #333;
  text-align: left;
}

.no {
  width: 40px;
}

button {
  margin: 10px 0;
  padding: 5px 10px;
  background: #bbb;
  text-align: center;

  &:hover {
    opacity: .7;
  }

  &.delete {
    width: 100%;
    background: #fd4040;
  }
}

ul,
ol {
  list-style-position: inside;
  font-size: 10px;
}

ol {
  max-height: 528px;
  overflow-y: scroll;
  border: solid 1px #333;

  li:nth-child(even) {
    background: #eee;
  }
}

h1 {
  background: #eee;
  padding: 5px;
  font-size: 16px;
}

h2 {
  margin-top: 10px;
}

.log {
  width: 100%;
  border: solid 1px #333;
  padding: 3px;
}

input {
  & .is-required {
    border: solid 1px #fd4040;
  }
}

.modal {
  position: fixed;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-350px, -300px);
  width: 700px;
  max-height: 800px;
  background: #fff;
  z-index: 110;
  box-shadow: 0 1px 3px 0 #404040;

  dl {
    overflow-y: scroll;
    max-height: 600px;
  }

  &__header {
    width: 100%;
    background: #4ea9dc;
    padding: 10px;
    color: #fff;
    font-weight: bold;
  }

  &__btnContainer {
    text-align: center;
  }

  &__img {
    width: 25%;

    img {
      width: 100%;
    }
  }
}

.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 100;
}

dl {
  padding: 10px;

  div {
    display: flex;
    padding: 10px 5px;
    border-bottom: solid 1px #c3c3c3;

    dt {
      width: 15%;
      margin-right: 2%;
    }

    dd {
      width: 83%;
    }
  }

  input,
  textarea {
    border: solid 1px #c3c3c3;
    width: 100%;
  }
}

</style>
