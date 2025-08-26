<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <RouterLink to="/admin">대시보드</RouterLink>
      <RouterLink to="/admin/products">상품관리</RouterLink>
      <RouterLink to="/admin/orders">주문관리</RouterLink>
      <RouterLink to="/admin/users">회원관리</RouterLink>
    </aside>
    <section class="content">
      <header class="bar">관리자</header>
      <main>
        <RouterView />
      </main>
    </section>
  </div>
</template>


<script setup>
</script>


<style scoped>
  .admin-layout { display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; }
  .sidebar { padding: 1rem; border-right: 1px solid #eee; display: grid; gap: .5rem; }
  .bar { padding: .75rem 1rem; border-bottom: 1px solid #eee; font-weight: 600; }
  .content main { padding: 1rem; }
</style>