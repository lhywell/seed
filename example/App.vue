<template>
  <div id="app">
    <h1>Seed</h1>
    <h2>A city map with components library by Vue2.0.js</h2>
    <div class="">
      <nav class="nav">
        <router-link to="/mul">mul-chooser</router-link>
      </nav>
      <div class="components">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App'
}

</script>
<style>
@import 'main.css';

</style>
<style scoped>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .nav {
    display: flex;
    padding: 10px;
  }
  .components {
    margin: 0 auto;
    width: 980px;
  }
}

</style>
