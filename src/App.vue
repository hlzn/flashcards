<template>
  <ul class="horizontal-menu">
    <li><router-link to="/regular-words">Regular Words</router-link></li>
    <li><router-link to="/verbs">Verbs</router-link></li>
  </ul>
  <router-view />
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<style scoped>
  .horizontal-menu {
    display: flex;
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .horizontal-menu a {
    text-decoration: none;
    color: #333;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    font-size: 1rem;
    cursor: pointer;
  }
  .horizontal-menu a:hover {
    background-color: #f0f0f0;
  }
  .horizontal-menu a.router-link-active {
    background-color: #e0e0e0;
    font-weight: bold;
  } 

</style>