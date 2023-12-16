<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: rgb(177, 221, 247) !important;">
        <div class="container">
            <a class="navbar-brand" href="#">Chatt App</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <RouterLink to="/" active-class="active">
                        <li class="nav-item">
                            <span class="nav-link">Sohbete Başla</span>
                        </li>
                    </RouterLink>
                </ul>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
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
            </div>
        </div>
    </nav>
</template>


<script>
import { defineComponent } from 'vue';

export default defineComponent({

})
</script>