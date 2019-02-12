<template>
    <div id="app">
        <h1>Seed</h1>
        <h2>A city map with components library by Vue2.0.js</h2>
        <div class="">
            <nav class="nav">
                <router-link to="/mul">mul-chooser</router-link>
                <router-link to="/map-modal">map-modal</router-link>
                <router-link to="/filter-city">filter-city</router-link>
                <router-link to="/table-plus">table-plus</router-link>
                <router-link to="/select-group">select-group</router-link>
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
/*开发模式*/

/*@import '../src/assets/css/main.css';*/

</style>
<style scoped>
body {
    background-color: #f8f8f9;
    position: relative;
}
#app {
    text-align: center;
    color: #2c3e50;
    padding-top: 60px;
    .nav {
        display: flex;
        padding: 10px;
        a {
            margin-right: 10px;
        }
    }
    .components {
        margin: 88px auto 0;
        text-align: left;
    }
    h1 {
        font-size: 32px;
    }
    h2 {
        font-size: 24px;
        margin-top: 20px;
    }
}

</style>
