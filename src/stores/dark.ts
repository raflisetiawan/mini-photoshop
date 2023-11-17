import { defineStore } from 'pinia';
import { Dark } from 'quasar';

export const useDarkStore = defineStore('dark', {
  state: () => ({
    dark: false,
  }),
  actions: {
    toggleDarkMode() {
      const darkCondition = !this.dark;

      this.dark = darkCondition;
      Dark.set(this.dark);
    },
    setDark() {
      Dark.set(this.dark);
    },
  },
});
