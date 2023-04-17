<template>
  <div>HELLO {{ val }}</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { BetterPortal } from '@bettercorp/betterportal-sdk';

const bp = new BetterPortal();
const val = ref<string>('');

onMounted(async () => {
  val.value = await (await bp.plugins.getPlugin('test')).read('/abcp/test');
})
</script>