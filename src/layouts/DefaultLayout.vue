<template>
  <div class="layout">
    <AppHeader />
    <main class="container">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>


<script setup>
  import AppHeader from '@/components/cmn/AppHeader.vue'
  import AppFooter from '@/components/cmn/AppFooter.vue'
</script>


<style scoped>
  .layout { min-height: 100vh; display: grid; grid-template-rows: auto 1fr auto; }
  .container { width: min(1200px, 95%); margin: 1rem auto; }
</style>