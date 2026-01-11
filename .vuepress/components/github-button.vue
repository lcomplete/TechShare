<template>
  <span ref="root">
    <a
      ref="link"
      :href="href"
      :aria-label="ariaLabel"
      :title="title"
      :data-icon="dataIcon"
      :data-color-scheme="dataColorScheme"
      :data-size="dataSize"
      :data-show-count="dataShowCount"
      :data-text="dataText"
    >
      <slot />
    </a>
  </span>
</template>

<script setup>
import { onBeforeUnmount, onBeforeUpdate, onMounted, onUpdated, ref } from 'vue'

const props = defineProps({
  href: String,
  ariaLabel: String,
  title: String,
  dataIcon: String,
  dataColorScheme: String,
  dataSize: String,
  dataShowCount: String,
  dataText: String
})

const root = ref(null)
const link = ref(null)

const paint = async () => {
  if (!root.value || !link.value) return
  const placeholder = document.createElement('span')
  root.value.appendChild(placeholder)

  const module = await import('github-buttons')
  module.render(placeholder.appendChild(link.value), (el) => {
    try {
      placeholder.parentNode.replaceChild(el, placeholder)
    } catch (error) {
      console.error(error)
    }
  })
}

const reset = () => {
  if (!root.value || !link.value || !root.value.lastChild) return
  root.value.replaceChild(link.value, root.value.lastChild)
}

onMounted(paint)
onBeforeUpdate(reset)
onUpdated(paint)
onBeforeUnmount(reset)
</script>
