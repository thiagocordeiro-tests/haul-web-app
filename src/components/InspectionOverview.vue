<template>
  <v-row>
    <v-col cols="6">
      <v-text-field
        label="Status"
        :model-value="inspection.status"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        label="Report Number"
        :model-value="inspection.id"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        label="USDOT #"
        model-value="-"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        label="Report State"
        :model-value="inspection.state"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        label="Date"
        :model-value="inspection.inspectedAt"
      />
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="Start Time"
        model-value="-"
      />
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="End Time"
        model-value="-"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        label="Level"
        :model-value="inspection.level"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        label="Facility"
        model-value="-"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        label="Post Crash Inspection"
        model-value="-"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        label="Hazmat Placard Required"
        :model-value="inspection.placarableHazmatInspection?'Yes' : 'No'"
      />
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import type { Inspection } from "@/types/inspections"

defineProps<{
  inspection: Inspection
}>()
</script>
