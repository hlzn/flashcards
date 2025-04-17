import { defineStore } from 'pinia'

export interface FlashcardEntry {
  article: string
  word: string
  translation: string
  example?: string
  drawing?: string
}

const STORAGE_KEY = 'flashcards-collection'

export const useCollectionStore = defineStore('collection', {
  state: () => ({
    entries: [] as FlashcardEntry[],
  }),
  actions: {
    load() {
      const json = localStorage.getItem(STORAGE_KEY)
      if (json) {
        try {
          this.entries = JSON.parse(json)
        } catch {
          this.entries = []
        }
      } else {
        this.entries = []
      }
    },
    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries))
      } catch {
        // ignore write errors
      }
    },
    addEntry() {
      this.entries.push({ article: '', word: '', translation: '' })
    },
    removeEntry(index: number) {
      this.entries.splice(index, 1)
    },
    flush() {
      this.entries = [];
    }
  },
})