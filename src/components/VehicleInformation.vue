<template>
  <v-row>
    <v-col cols="12">
      <h3>Vehicle Information</h3>
    </v-col>

    <v-col cols="12">
      <v-table class="bg-surface-light">
        <thead>
          <tr>
            <th class="text-left">
              Unit
            </th>
            <th class="text-left">
              Type
            </th>
            <th class="text-left">
              Make
            </th>
            <th class="text-left">
              Plate State
            </th>
            <th class="text-left">
              Plate Number
            </th>
            <th class="text-left">
              VIN
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="vehicle in vehicles"
            :key="vehicle.vehicle.id"
          >
            <td>{{ vehicle.unit }}</td>
            <td>{{ vehicle.vehicle.type }}</td>
            <td>-</td>
            <td>{{ vehicle.vehicle.license.state }}</td>
            <td>{{ vehicle.vehicle.license.number }}</td>
            <td>{{ vehicle.vehicle.id }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import type { InspectedVehicle } from "@/types/inspections"

defineProps<{
  vehicles: InspectedVehicle[]
}>()
</script>
