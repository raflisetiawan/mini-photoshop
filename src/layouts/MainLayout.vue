<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf">
      <q-header elevated>
        <q-bar :class="$q.dark.isActive ? 'q-electron-drag bg-dark' : 'q-electron-drag'">
          <div>Mini Photoshop</div>

          <q-space />

          <q-btn dense flat icon="minimize" @click="minimize" />
          <q-btn dense flat icon="crop_square" @click="toggleMaximize" />
          <q-btn dense flat icon="close" @click="closeApp" />
        </q-bar>
        <q-separator :class="$q.dark.isActive ? 'bg-grey' : ''"></q-separator>
        <div :class="$q.dark.isActive ? 'q-pa-sm q-pl-md row items-center bg-dark'
          : 'q-pa-sm q-pl-md row items-center'">
          <div class=" cursor-pointer non-selectable q-mr-md">
            <!-- <q-btn flat size="sm" icon="arrow_back" @click="$router.back()"></q-btn>
            <q-btn flat size="sm" icon="arrow_forward" @click="$router.forward()"></q-btn> -->
          </div>
          <div class="cursor-pointer non-selectable">
            File
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item clickable v-close-popup :to="{ name: 'HomePage' }">
                  <q-item-section>Open...</q-item-section>
                </q-item>
                <q-item clickable v-close-popup :to="{ name: 'AllImagePage' }">
                  <q-item-section>Riwayat gambar</q-item-section>
                </q-item>

                <q-separator />

                <q-item clickable v-close-popup @click="closeApp">
                  <q-item-section>Quit</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>

          <div class="q-ml-md cursor-pointer non-selectable">
            Edit
            <q-menu auto-close>
              <q-list dense style="min-width: 100px">
                <q-item clickable>
                  <q-item-section>Cut</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Copy</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Paste</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>Select All</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
          <div class="q-ml-md cursor-pointer non-selectable">
            Settings
            <q-menu auto-close>
              <q-list dense style="min-width: 100px">
                <q-item clickable @click="handleDarkMode()">
                  <q-item-section>Dark mode</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </div>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>
<script setup>
import { useDarkStore } from 'src/stores/dark';
const { toggleDarkMode } = useDarkStore()

const handleDarkMode = () => {
  toggleDarkMode()
}

// We guard the Electron API calls with the optional chaining JS operator,
// but this is only needed if we build same app with other Quasar Modes
// as well (SPA/PWA/Cordova/SSR...)
function minimize() {
  window.myWindowAPI?.minimize()
}

function toggleMaximize() {
  window.myWindowAPI?.toggleMaximize()
}

function closeApp() {
  window.myWindowAPI?.close()
}

</script>
