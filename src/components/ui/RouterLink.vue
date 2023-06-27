<script setup>
import { RouterLink } from "vue-router";
defineProps({
  to: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "bg-blue-500",
  },
  hover: {
    type: String,
    default: "hover:bg-blue-700",
  },
});
</script>
<template>
  <RouterLink
    :class="[
      color,
      hover,
      'uppercase',
      'text-white',
      'font-bold',
      'py-2',
      'px-6',
      'rounded-full',
      'focus:outline-none',
      'focus:shadow-outline',
      'shadow-lg',
    ]"
    :to="{ name: to }"
  >
    <slot></slot>
  </RouterLink>
</template>
<style lang="scss" scoped></style>
