<template>
<div class="wrapper-login">
    <section>
        <div class="landing-text">
            <h1>My Chat App</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br>Error maxime fugit molestias aliquam?</p>
        </div>
        
        <div class="login-container">
            <button @click="loginSubmit">Login with Google!</button>
        </div>
    </section>
</div>
</template>

<script>
import firebase from 'firebase'
export default {
  methods: {
    loginSubmit() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
        .catch(console.log)
    }
  }
}
</script>

<style>
.wrapper-login {
    text-align: center;
    max-width: 728px;
    margin: 0 auto;
    background-color: #122543;
}
.wrapper-login section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
}
.landing-text h1 {
    font-size: 36px;
    color: #ccd5e1;
}
.landing-text p {
    color: #546a8b;
}
.login-container {
    width: 100%;
    text-align: center;
    padding-top: 16px;
}
.login-container button {
    width: 50%;
    background-color: #ffb6b7;
    color: #122543;
    font-weight: bold;
    font-size: 18pt;
    padding: 20px;
    border-radius: 30px;
    border: none;
    box-shadow: #00000040 0px 5px 10px;
    cursor: pointer;
}
.login-container button:hover {
    background-color: #ec9899;
    color: #fff;
}
</style>