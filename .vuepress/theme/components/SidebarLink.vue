<template>
  <ParentSidebarLink v-bind="props" />
</template>

<script setup>
import ParentSidebarLink from '@parent-theme/components/SidebarLink.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  sidebarDepth: {
    type: Number,
    default: null
  }
})
</script>
