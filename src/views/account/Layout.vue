<script setup>
import { useAuthStore } from '@/stores';
import { router } from '@/router';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
  if (authStore.user) {
    router.push('/');
  }
});
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-8 offset-sm-2">
                <router-view />
            </div>
        </div>
    </div>
</template>