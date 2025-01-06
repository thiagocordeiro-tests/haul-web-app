<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Date
          <order-by
            field="InspectedAt"
            :selected="selectedOrder"
            @change="changeOrder($event)"
          />
        </th>
        <th class="text-left">
          Status
          <order-by
            field="Status"
            :selected="selectedOrder"
            @change="changeOrder($event)"
          />
        </th>
        <th class="text-left">
          Inspection Number
          <order-by
            field="InspectionNumber"
            :selected="selectedOrder"
            @change="changeOrder($event)"
          />
        </th>
        <th class="text-left">
          Vehicle Plate
        </th>
        <th class="text-left">
          BASIC
        </th>
        <th class="text-left">
          Weight
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="inspection in inspections.entries"
        :key="inspection.id"
        class="cursor-pointer"
        @click="emit('select', inspection)"
      >
        <td>{{ inspection.inspectedAt }}</td>
        <td>{{ inspection.status }}</td>
        <td>{{ inspection.id }}</td>
        <td>{{ inspection.plate }}</td>
        <td>{{ inspection.violation ?? "-" }}</td>
        <td>{{ inspection.weight ?? "-" }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
<script setup lang="ts">
import type { EntryList, InspectionPreview, OrderInspectionBy } from "@/types/inspections"
import { ref } from "vue"
import OrderBy from "@/components/OrderBy.vue"

const props = defineProps<{
  inspections: EntryList<InspectionPreview>,
  orderBy: OrderInspectionBy["field"] | undefined,
  order: OrderInspectionBy["direction"] | undefined,
}>()

const emit = defineEmits(["select", "order"])

const selectedOrder = ref<Partial<OrderInspectionBy>>({
  field: props.orderBy,
  direction: props.order,
})

const changeOrder = (selected: OrderInspectionBy) => {
  selectedOrder.value = selected
  emit("order", selectedOrder.value)
}
</script>
