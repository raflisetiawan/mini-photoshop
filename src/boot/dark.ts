import { LocalStorage } from 'quasar';
import { boot } from 'quasar/wrappers';
import { useDarkStore } from 'src/stores/dark';

export default boot((/* { app, router, ... } */) => {
  // something to do
  // Ambil nilai 'dark' dari local storage saat aplikasi dimulai
  const darkValue = LocalStorage.getItem('dark');
  const { $state, setDark } = useDarkStore();

  // Set nilai 'dark' pada store menggunakan nilai dari local storage atau default menjadi false
  $state.dark = darkValue !== null ? darkValue === 'true' : false;
  setDark();
});
