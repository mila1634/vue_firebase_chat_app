import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyCJdHdtsjP41GL9UB2qiN9iv5QC8QsQUqU",
  authDomain: "vue-chat-app-84c8c.firebaseapp.com",
  projectId: "vue-chat-app-84c8c",
  storageBucket: "vue-chat-app-84c8c.appspot.com",
  messagingSenderId: "1007582950224",
  appId: "1:1007582950224:web:4855b46bc0eab1e9b47255"
};

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(() => new Vue({
  render: h => h(App),
}).$mount('#app'))
