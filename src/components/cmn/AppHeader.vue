<template>
  <header class="header">
    <RouterLink class="logo" to="/">Shop</RouterLink>
    <nav class="nav">
      <RouterLink to="/products">상품</RouterLink>
      <RouterLink to="/cart">장바구니</RouterLink>
      <RouterLink to="/order">주문</RouterLink>
      <RouterLink to="/admin">관리자</RouterLink>
    </nav>
  </header>
</template>


<script setup>
</script>


<style scoped>
  .header { display:flex; align-items:center; justify-content:space-between; padding: .75rem 1rem; border-bottom:1px solid #eee; }
  .logo { font-weight:800; text-decoration:none; }
  .nav { display:flex; gap:1rem; }
  .nav a.router-link-active { font-weight:700; }
</style>