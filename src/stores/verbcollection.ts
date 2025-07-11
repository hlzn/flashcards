import { defineStore } from 'pinia'

export interface FlashcardEntry {
  word: string
  past: string
  translation: string
  example?: string
  drawing?: string
}

const STORAGE_KEY = 'verben-flashcards-collection'

export const useVerbCollectionStore = defineStore('verbcollection', {
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
      this.entries.push({ word: '', translation: '', past: '' })
    },
    removeEntry(index: number) {
      this.entries.splice(index, 1)
    },
    flush() {
      this.entries = [];
      localStorage.removeItem(STORAGE_KEY);
    }
  },
})