<template>
  <div class="collection-manager">
    <h2>Manage Flashcard Collection</h2>
    <ul>
      <li v-for="(entry, index) in entries" :key="index">
        <span class="entry-row">
          <input v-model="entry.word" placeholder="palabra" />
          <input v-model="entry.past" placeholder="palabra en pasado" />
          <input v-model="entry.translation" placeholder="traduccion" />
          <button class="remove-btn" @click="removeEntry(index)">Eliminar</button>
        </span>
      </li>
    </ul>
    <div class="actions">
      <button @click="addEntry">Añadir</button>
      <button @click="save">Guardar</button>
      <button @click="toggleImporter">{{ showImporter ? 'Cancelar' : 'Añadir Colección' }}</button>
      <button @click="exportit">Exportar</button>
      <button @click="flushit">Flush</button>
    </div>
    <div v-if="showImporter" class="bulk-import">
      <textarea
        v-model="importText"
        placeholder="agregar una lista de palabras asi 'articulo|palabra|traduccion' separadas por una coma"
      ></textarea>
      <button @click="importEntries">Importar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCollectionStore } from '../stores/verbcollection'

const store = useCollectionStore()
let entries = store.entries;
const showImporter = ref(false)
const importText = ref('')

function addEntry() {
  store.addEntry()
}

function removeEntry(index: number) {
  store.removeEntry(index)
  entries.splice(index, 1)
}

function save() {
  store.save()
}
// Toggle bulk import textarea
function toggleImporter() {
  showImporter.value = !showImporter.value
  if (showImporter.value) importText.value = ''
}
// Parse CSV text of format "articulo|palabra|traduccion" separated by commas
function importEntries() {
  const text = importText.value || ''
  const items = text.split(',').map(s => s.trim()).filter(s => s)
  for (const item of items) {
    const parts = item.split('|').map(p => p.trim())
      let [word, translation, past] = parts
      store.entries.push({ word, translation, past })
  }
  importText.value = ''
  showImporter.value = false
  store.save()
}

function flushit() {
  if (confirm('Are you sure you want to delete all entries?')) {
    store.flush()
    entries.splice(0, entries.length)
  }
}

function exportit() {
  const csv = entries.map(entry => {
    return `${entry.word}|${entry.translation}|${entry.past}`
  }).join(', ')
  navigator.clipboard.writeText(csv).then(() => {
    alert('Exported to clipboard!')
  })
}

onMounted(() => {
  store.load()
})
</script>

<style scoped>
.bulk-import {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.bulk-import textarea {
  width: 100%;
  min-height: 4rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
}
.bulk-import button {
  align-self: flex-start;
  padding: 0.4rem 0.8rem;
  font-size: 1rem;
  cursor: pointer;
}
.collection-manager {
  padding: 1rem;
}
.collection-manager ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
}
.entry-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
}
.entry-row input {
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}
.remove-btn {
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
}
.actions {
  display: flex;
  gap: 1rem;
}
.actions button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
