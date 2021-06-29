<template>
  <div class="wrapper">
    <header>
      <h1>ChatApp</h1>
      <button @click="logout">Logout</button>
    </header>

    <section>
      <main>
        <div v-for="(msg, index) in messages" v-bind:key="'index-'+index"
             :class="['message', sentOrReceived(msg.userUID)]">
          <img :src="msg.photoURL" :alt="msg.displayName">
          <p>{{ msg.text }}</p>
        </div>

        <div ref="scrollable"></div>
      </main>

      <form v-on:submit.prevent="sendMessage">
        <input v-model="message" type="text" placeholder="Enter your message!">
        <button :disabled="!message" type="submit">Send</button>
      </form>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  mounted() {
    this.db.collection('messages').orderBy('createdAt')
        .onSnapshot(querySnap => {
          this.messages = querySnap.docs.map(doc => doc.data())
        })
  },
  data() {
    return {
      user: firebase.auth().currentUser,
      db: firebase.firestore(),
      message: '',
      messages: [],
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut()
    },
    sentOrReceived(userUID) {
      return userUID === this.user.uid ? 'sent' : 'received'
    },
    async sendMessage() {
      const messageInfo = {
        'userUID': this.user.uid,
        'displayName': this.user.displayName,
        'photoURL': this.user.photoURL,
        'text': this.message,
        'createdAt': Date.now(),
      }
      await this.db.collection('messages').add(messageInfo)
      this.message = ''
      this.$refs['scrollable'].scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style>
html {
  font-family: 'Montserrat', sans-serif;
}
body {
  margin: 0;
}
.wrapper {
  text-align: center;
  max-width: 728px;
  margin: 0 auto;
}
.wrapper header {
  background: linear-gradient(to left, #ffd7d7, #ffb6b7);
  height: 10vh;
  min-height: 50px;
  color: #fff;
  position: fixed;
  width: 100%;
  max-width: 728px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
  padding: 10px;
  box-sizing: border-box;
}
.wrapper header button {
  color: #fff;
  background-color: transparent;
}
.wrapper section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: #fff;
}
.wrapper section main {
  padding: 10px;
  height: 75vh;
  margin: 10vh 0 10vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}
 .wrapper section main::-webkit-scrollbar {
  width: 0.25rem;
}
.wrapper section main::-webkit-scrollbar-track {
  background: #1e1e24;
}
.wrapper section main::-webkit-scrollbar-thumb {
  background: #ff9d9e;
} 
.wrapper section form {
  height: 10vh;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 728px;
  display: flex;
  font-size: 1.5rem;
  border-top: 1px solid #ffd7d7;
}
.wrapper section form button {
  width: 20%;
  color: #ffb6b7;
  background-color: #fff;
}
.wrapper section form input {
  line-height: 1.5;
  width: 100%;
  font-size: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  color: #fd8d8e;
  outline: none;
  border: none;  
  padding: 0 10px;
}
.wrapper section form ::placeholder {
    color: #ffb6b7;
    font-weight: 100;
    font-family: 'Montserrat', sans-serif;
}
.wrapper button {
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  font-size: 1.25rem;
}
.wrapper button:disabled {
  color: #ffb6b7;
  cursor: default;
}
.wrapper button, .wrapper input {
  border: none;
}
.wrapper p {
  max-width: 500px;
  margin-bottom: 12px;
  line-height: 24px;
  padding: 10px 20px;
  border-radius: 25px;
  position: relative;
  color: #fff;
  text-align: center;
}
.wrapper .message {
  display: flex;
  align-items: center;
}
.wrapper .message.received p {
  background: #122543;
  color: #ffb6b7;
}
.wrapper .message.sent {
  flex-direction: row-reverse;
}
.wrapper .message.sent p {
  color: #fff;
  background: #ffb6b7;
  align-self: flex-end;
}
.wrapper .message img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 2px 5px;
}
.wrapper .message p {
  max-width: 500px;
  margin-bottom: 12px;
  line-height: 24px;
  padding: 10px 20px;
  border-radius: 25px;
  position: relative;
  color: #fff;
  text-align: center;
}
</style>