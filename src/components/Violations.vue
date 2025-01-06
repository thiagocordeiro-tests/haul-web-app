<template>
  <v-row>
    <v-col cols="12">
      <h3>Violations</h3>
    </v-col>

    <v-col cols="12">
      <v-table class="bg-surface-light">
        <thead>
          <tr>
            <th class="text-left">
              Code
            </th>
            <th class="text-left">
              Section
            </th>
            <th class="text-left">
              Unit
            </th>
            <th class="text-left">
              OOS
            </th>
            <th class="text-left">
              Description
            </th>
            <th class="text-left">
              IN SMS
            </th>
            <th class="text-left">
              BASIC
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="violation in violations"
            :key="violation.unit"
          >
            <td>{{ violation.code }}</td>
            <td>-</td>
            <td>{{ violation.unit }}</td>
            <td>{{ violation.oos ? "Yes" : "No" }}</td>
            <td>{{ violation.description }}</td>
            <td>{{ violation.convictedOfDifCharge ? "Yes" : "No" }}</td>
            <td>{{ violation.basic }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import type { Violation } from "@/types/inspections"

defineProps<{
  violations: Violation[]
}>()
</script>
