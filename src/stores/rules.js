import { defineStore } from 'pinia'

// displays the modal containing the leasing rules of the library, always available in the nav menu
export const useRulesStore = defineStore('rules', {
    state: () => ({
        displayRules: false
    }),
    actions: {
        toggleDisplayRules() {
            this.displayRules = !this.displayRules
        }
    }
})