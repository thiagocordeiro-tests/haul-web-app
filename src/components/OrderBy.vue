<template>
  <v-icon
    v-if="!isSelected"
    icon="mdi-arrow-down"
    size="16"
    class="opacity-20"
    @click="select('ASC')"
  />
  <v-icon
    v-if="direction === 'ASC' && isSelected"
    icon="mdi-arrow-down"
    size="16"
    @click="select('DESC')"
  />
  <v-icon
    v-if="direction === 'DESC' && isSelected"
    icon="mdi-arrow-up"
    size="16"
    @click="select('ASC')"
  />
</template>
<script setup lang="ts">
import { computed, ref } from "vue"
import type { OrderInspectionBy } from "@/types/inspections"

const props = defineProps<{
  field: OrderInspectionBy["field"],
  selected: Partial<OrderInspectionBy>,
}>()

const emit = defineEmits(["change"])

const direction = ref<OrderInspectionBy["direction"]>(props.selected?.direction ?? "ASC")
const isSelected = computed(() => props.field == props.selected?.field)

const select = (selected: OrderInspectionBy["direction"]) => {
  direction.value = selected
  emit("change", { field: props.field, direction: selected })
}
</script>
