<template>
  <main class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl font-bold">404 - Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <RouterLink :to="{ path: '/' }" class="text-blue-600 hover:underline">Go to home page</RouterLink>
  </main>
</template>
