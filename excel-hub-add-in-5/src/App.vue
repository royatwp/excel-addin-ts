<template>
  <div id="app">
    <h2>Vue.js Add-In Example</h2>
    <p>This is the App, and is certainly not cheddar.</p>
    <p>Something will have to change.</p>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
