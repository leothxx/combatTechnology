<template>
  <div class="auth-layout">
    <main class="card">
      <RouterView />
    </main>
  </div>
</template>


<script setup>
</script>


<style scoped>
  .auth-layout { min-height: 100vh; display: grid; place-items: center; padding: 2rem; }
  .card { width: min(440px, 95%); background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 1.25rem; box-shadow: 0 4px 20px rgba(0,0,0,.04); }
</style>