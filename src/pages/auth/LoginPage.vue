<template>
  <form class="vstack" @submit.prevent="onSubmit">
    <h1>로그인</h1>
    <input v-model="email" type="email" placeholder="이메일" required>
    <input v-model="password" type="password" placeholder="비밀번호" required>
    <button type="submit">로그인</button>
  </form>
</template>


<script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '@/store/auth'
  import { useRoute, useRouter } from 'vue-router'


  const email = ref('')
  const password = ref('')
  const auth = useAuthStore()
  const route = useRoute()
  const router = useRouter()


  const onSubmit = async () => {
    const ok = await auth.login({ email: email.value, password: password.value })
    if (ok) {
      router.replace(route.query.redirect?.toString() || '/')
    } else {
      alert('로그인 실패')
    }
  }
</script>


<style scoped>
  .vstack { display: grid; gap: .75rem; }
  input, button { padding: .6rem .8rem; border:1px solid #ddd; border-radius:8px; }
  button { cursor: pointer; }
</style>