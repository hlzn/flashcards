<template>
  <button @click.stop.prevent="scramble()">Scramble!</button>
  <div class="flashcards">
    <div
      v-for="(entry, idx) in entries"
      :key="idx"
      class="card-container"
    >
      <div :class="['card', { flipped: flipped[idx] }]">
        <div
          class="card-face front"
          :style="{ borderColor: colors[idx % colors.length] }"
        >
          <div class="front-content">
            <span class="translation">
              {{ entry.word }}
            </span>
            <input
              v-model="guesses[idx]"
              type="text"
              placeholder="Escribe la palabra..."
              :class="{ wrong: wrong[idx] }"
            />
            <button @click.stop.prevent="check(idx)">Comprobar</button>
          </div>
        </div>
        <div
          class="card-face back"
          :style="{ borderColor: colors[idx % colors.length] }"
        >
          <span class="word">
            {{ entry.article ? entry.article + ' ' : '' }}{{ entry.translation }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCollectionStore } from '../stores/collection'

interface Entry {
  word: string
  translation: string
  article: string
  example: string
  drawing: string
}

const store = useCollectionStore()
onMounted(() => store.load())
const entries = store.entries as Entry[]
const flipped = ref<boolean[]>(entries.map(() => false))
const guesses = ref<string[]>(entries.map(() => ''))
const colors = ['#FF7F50', '#87CEEB', '#90EE90', '#FFD700', '#DA70D6', '#FFA07A', '#20B2AA']
// Track wrong attempts to trigger input blink
const wrong = ref<boolean[]>(entries.map(() => false))

function scramble() {
  const shuffledEntries = [...entries].sort(() => Math.random() - 0.5)
  entries.splice(0, entries.length, ...shuffledEntries)
  flipped.value = entries.map(() => false)
  guesses.value = entries.map(() => '')
  wrong.value = entries.map(() => false)
}

function check(index: number) {
  const guess = guesses.value[index]?.trim().toLowerCase()
  const entry = entries[index]
  const answer = ((entry.article ? entry.article + ' ' : '') + entry.translation)
    .trim()
    .toLowerCase()
  if (guess === answer) {
    flipped.value[index] = true
    guesses.value[index] = ''
    wrong.value[index] = false
  } else {
    wrong.value[index] = true
    setTimeout(() => {
      wrong.value[index] = false
    }, 1200)
  }
}
</script>

<style scoped>
.flashcards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: space-evenly;
  padding: 1rem;
  gap: 1rem;
  box-sizing: border-box;
}
.card-container {
  perspective: 1000px;
}
.card {
  width: 120px;
  height: 160px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  cursor: pointer;
}
.card.flipped {
  transform: rotateY(180deg);
}
.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid;
  border-radius: 8px;
  box-sizing: border-box;
  background: transparent;
}
.card-face.back {
  transform: rotateY(180deg);
  background: #fff;
  color: #000;
}
.word {
  font-size: 1.2rem;
  font-weight: bold;
}
/* Front face content styling */
.front-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
}
.translation {
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
}
.front-content input {
  width: 100%;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
}
.front-content button {
  padding: 0.3rem 0.5rem;
  font-size: 0.9rem;
}
/* Wrong guess blinking border */
@keyframes blink-border {
  0%, 100% { border-color: red; }
  50% { border-color: transparent; }
}
.front-content input.wrong {
  border: 1px solid red !important;
  animation: blink-border 0.4s ease-in-out 3;
}
</style>