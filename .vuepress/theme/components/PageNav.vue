<template>
  <ParentPageNav v-bind="props" />
</template>

<script setup>
import ParentPageNav from '@parent-theme/components/PageNav.vue'

const props = defineProps({
  sidebarItems: {
    type: Array,
    default: () => []
  }
})
</script>
