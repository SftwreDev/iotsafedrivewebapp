<script setup>
import { CheckCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid'
</script>

<script>
export default {
  props: {
    content: String,
  },
}
</script>

<template>
  <div class="rounded-md bg-red-50 p-4 border border-red-300 mt-5">
    <div class="flex">
      <div class="flex-shrink-0">
        <CheckCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium text-red-800">{{ content }}</p>
      </div>
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>