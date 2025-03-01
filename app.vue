<template >
  <main class="bg-(--bg) text-(--text)" style="font-family: var(--font-title);">
    <div 
      class="py-12 px-5 mx-auto max-w-2xl mx-auto">
      <AppHeader/>
      <UApp>
        <NuxtPage />
      </UApp>
      <!-- <NuxtPage /> -->
    </div>
  </main>
  <footer class="bg-(--bg) text-(--text)" style="font-family: var(--font-title);">
    <AppFooter class="mx-auto max-w-2xl mx-auto"/>
  </footer>
</template>