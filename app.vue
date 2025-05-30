<template>
  <div class="layout-wrapper">
    <main class="bg-(--bg) text-(--text)" style="font-family: var(--font-title);">
      <div class="py-12 px-5 mx-auto max-w-2xl">
        <AppHeader />
        <UApp>
          <NuxtPage />
        </UApp>
      </div>
    </main>
    <footer class="bg-(--bg) text-(--text)" style="font-family: var(--font-title);">
      <AppFooter class="mx-auto max-w-2xl" />
    </footer>
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>