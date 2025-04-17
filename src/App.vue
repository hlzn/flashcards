<script setup lang="ts">
import { ref } from 'vue'
import CollectionManager from './components/CollectionManager.vue'
import Flashcards from './components/Flashcards.vue'

const mode = ref<'manage' | 'flashcards'>('manage')
</script>

<template>
  <div id="app">
    <nav class="app-nav">
      <button :class="{ active: mode === 'manage' }" @click="mode = 'manage'">Manage</button>
      <button :class="{ active: mode === 'flashcards' }" @click="mode = 'flashcards'">Flashcards</button>
    </nav>
    <CollectionManager v-if="mode === 'manage'" />
    <Flashcards v-else />
  </div>
</template>

<style scoped>
.app-nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.app-nav button {
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
.app-nav button.active {
  font-weight: bold;
  border-bottom: 2px solid currentColor;
}
</style>
