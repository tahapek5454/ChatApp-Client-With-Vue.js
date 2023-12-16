<template>
  <NavbarComponent/>
  <RouterView></RouterView>
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '@/assets/global.css'
import { defineComponent } from 'vue';
import NavbarComponent from './components/NavbarComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavbarComponent
  }
});
</script>

<style>

</style>
