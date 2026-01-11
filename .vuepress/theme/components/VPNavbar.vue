<script setup lang="ts">
import VPNavbarBrand from '@theme/VPNavbarBrand.vue'
import VPNavbarItems from '@theme/VPNavbarItems.vue'
import VPToggleColorModeButton from '@theme/VPToggleColorModeButton.vue'
import VPToggleSidebarButton from '@theme/VPToggleSidebarButton.vue'
import { useData } from '@theme/useData'
import { DeviceType, useUpdateDeviceStatus } from '@theme/useUpdateDeviceStatus'
import type { Slot } from '@vuepress/helper/client'
import { hasGlobalComponent } from '@vuepress/helper/client'
import { computed, ref, resolveComponent, useTemplateRef } from 'vue'

defineEmits<{
  toggleSidebar: []
}>()

defineSlots<{
  before?: Slot
  after?: Slot
}>()

const SearchBox = hasGlobalComponent('SearchBox')
  ? resolveComponent('SearchBox')
  : (): null => null

const { themeLocale } = useData()

const navbar = useTemplateRef<HTMLElement | null>('navbar')
const navbarBrand = useTemplateRef<HTMLElement | null>('navbar-brand')

const linksWrapperMaxWidth = ref(0)
const linksWrapperStyle = computed(() => {
  if (!linksWrapperMaxWidth.value) {
    return {}
  }
  return {
    maxWidth: `${linksWrapperMaxWidth.value}px`
  }
})

const getCssValue = (el: HTMLElement | null, property: string): number => {
  const val = el?.ownerDocument.defaultView?.getComputedStyle(el, null)[
    property as keyof CSSStyleDeclaration
  ]

  const num = Number.parseInt(val as string, 10)

  return Number.isNaN(num) ? 0 : num
}

useUpdateDeviceStatus(
  DeviceType.Mobile,
  (mobileDesktopBreakpoint: number): void => {
    const navbarHorizontalPadding =
      getCssValue(navbar.value, 'paddingLeft') + getCssValue(navbar.value, 'paddingRight')
    if (window.innerWidth < mobileDesktopBreakpoint) {
      linksWrapperMaxWidth.value = 0
    } else {
      linksWrapperMaxWidth.value =
        navbar.value!.offsetWidth -
        navbarHorizontalPadding -
        (navbarBrand.value?.offsetWidth ?? 0)
    }
  }
)
</script>

<template>
  <header ref="navbar" class="vp-navbar" vp-navbar>
    <VPToggleSidebarButton @toggle="$emit('toggleSidebar')" />

    <span ref="navbar-brand">
      <VPNavbarBrand />
    </span>

    <div class="vp-navbar-items-wrapper" :style="linksWrapperStyle">
      <slot name="before" />
      <SearchBox class="vp-search-box" />
      <VPNavbarItems class="vp-hide-mobile" />
      <slot name="after" />
      <VPToggleColorModeButton v-if="themeLocale.colorModeSwitch" />
    </div>
  </header>
</template>

<style lang="scss">
@use '../styles/variables' as *;

:root {
  --search-input-width: 24rem;
}

.vp-navbar {
  --navbar-line-height: calc(var(--navbar-height) - 2 * var(--navbar-padding-v));

  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 20;

  box-sizing: border-box;
  height: var(--navbar-height);
  padding: var(--navbar-padding-v) var(--navbar-padding-h);
  border-bottom: 1px solid var(--vp-c-border);

  background-color: var(--vp-navbar-c-bg);

  line-height: var(--navbar-line-height);

  transition:
    background-color var(--vp-t-color),
    border-color var(--vp-t-color);

  @media screen and (max-width: $MQMobile) {
    padding-inline-start: 4rem;
  }

  @media print {
    display: none;
  }
}

.vp-navbar-items-wrapper {
  position: absolute;
  inset-inline-end: var(--navbar-padding-h);
  top: var(--navbar-padding-v);

  display: flex;

  box-sizing: border-box;
  height: var(--navbar-line-height);
  padding-inline-start: var(--navbar-padding-h);

  font-size: 0.9rem;
  white-space: nowrap;
}

.vp-navbar .vp-search-box,
.vp-navbar .search-box {
  order: -1 !important;
  margin-inline-start: 0;
  margin-inline-end: 1rem;

  input {
    width: 14rem !important;
  }
}

.vp-navbar-items {
  order: 0 !important;
}

.vp-toggle-color-mode-button {
  order: 1 !important;
}
</style>
