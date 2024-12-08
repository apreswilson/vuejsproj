<script setup></script>

<template>
  <main>
    <div class="top-area">
      <h1 class="title">Vue.js Project</h1>
      <div class="links">
        <RouterLink to="/">Todos</RouterLink>
        <div class="bar"></div>
        <RouterLink to="/about">Wireframe</RouterLink>
      </div>
    </div>
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
@use './assets/globals.scss' as global;
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

main {
  width: 75%;
  margin: auto;
  font-family: 'Open Sans', 'Inter', sans-serif, Times;

  button {
    font-family: 'Open Sans', 'Inter', sans-serif, Times;
  }

  .top-area {
    display: flex;
    place-items: center;
    flex-direction: column;
    border-bottom: 1px solid black;
    padding: 1rem;

    .title {
      text-align: center;
      color: rgb(0, 110, 255);
    }

    .links {
      display: flex;
      gap: 2rem;
    }

    .links > a {
      color: black;
      text-decoration: none;
      font-size: 1.25rem;
      padding: 0.25rem;
      border-radius: 0.25rem;
    }

    .bar {
      width: 1px;
      background-color: black;
    }

    a:hover {
      color: white;
      background-color: rgb(0, 110, 255);
    }
  }
}

@media screen and (max-width: 700px) {
  main {
    width: 95%;
  }
}

/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
