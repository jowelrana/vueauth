<template>
  <div class="hello">
    <ul class="nav">
      <li><router-link :to="{ name: 'home' }">Home</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>

