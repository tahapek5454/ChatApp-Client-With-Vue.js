<template>
        <nav class="navbar d-flex align-items-center justify-content-between px-5 navbar-expand-lg bg-body-tertiary">
            <h3 class="logo">Self Chat</h3>
                <ul class="navbar-nav mb-lg-0">
                    <RouterLink to="/login" active-class="active">
                        <li class="nav-item">
                            <span class="nav-link">Giriş Yap</span>
                        </li>
                    </RouterLink>
                    <RouterLink to="/register" active-class="active">
                        <li class="nav-item">
                            <span class="nav-link">Üye Ol</span>
                        </li>
                    </RouterLink>
                </ul>
                <ul v-if="$store.getters['getUser'].userName !== null" class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <span class="nav-link">Hoş Geldin {{ $store.getters['getUser'].userName }}</span>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
    </nav>
</template>


<script>
import { defineComponent } from 'vue';

export default defineComponent({

})
</script>