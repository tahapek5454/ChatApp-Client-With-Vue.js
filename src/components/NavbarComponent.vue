<template>
    <nav class="navbar d-flex align-items-center justify-content-between px-5 navbar-expand-lg bg-body-tertiary">
        <RouterLink to="/" style="text-decoration: none;">
            <h3 class="logo">Self Chat</h3>
        </RouterLink>
        <div>
            <ul v-if="$store.getters['getUser'].userName !== null" class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <span class="nav-link">Hoş Geldin {{ $store.getters['getUser'].userName }}</span>
                </li>
            </ul>
        </div>

        <div>
            <ul class="navbar-nav mb-lg-0">
                <RouterLink to="/login" active-class="active" style="text-decoration: none;">
                    <li class="nav-item">
                        <span class="nav-link">Giriş Yap</span>
                    </li>
                </RouterLink>
                <RouterLink to="/register" active-class="active" style="text-decoration: none;">
                    <li class="nav-item">
                        <span class="nav-link">Üye Ol</span>
                    </li>
                </RouterLink>
            </ul>

        </div>

    </nav>
</template>


<script>
import { defineComponent } from 'vue';

export default defineComponent({

})
</script>