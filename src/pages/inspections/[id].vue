<template>
  <v-container v-if="inspection">
    <v-responsive
      class="mx-auto"
      max-width="1200"
    >
      <div class="py-4" />
      <v-card
        class="mx-auto"
        title="Inspection Overview"
      >
        <v-card-text class="pt-4">
          <inspection-overview :inspection="inspection" />
          <VehicleInformation :vehicles="inspection.vehicles" />
          <Violations :violations="inspection.violations" />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn @click="router.back()">
            Back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-responsive>
  </v-container>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { useAsyncState } from "@vueuse/core"
import { api } from "@/api/api"
import type { Inspection } from "@/types/inspections"
import VehicleInformation from "@/components/VehicleInformation.vue"
import InspectionOverview from "@/components/InspectionOverview.vue"
import Violations from "@/components/Violations.vue"

const router = useRouter()
const route = useRoute()
const id = String(route.params["id"])

const { state: inspection } = useAsyncState<Inspection | undefined>(
  () => api.inspections.load(id),
  undefined,
  {
    immediate: true,
  },
)

</script>
