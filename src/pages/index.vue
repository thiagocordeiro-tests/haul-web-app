<template>
  <v-container>
    <v-responsive
      class="mx-auto"
      max-width="1200"
    >
      <div class="py-4" />

      <v-form>
        <v-row>
          <v-col cols="3">
            <v-select
              v-model="filter.status"
              label="Status"
              :items="status"
              density="compact"
              clearable
              @update:model-value="listInspections()"
            />
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="filter.basic"
              label="BASIC"
              :items="basics"
              density="compact"
              clearable
              @update:model-value="listInspections()"
            />
          </v-col>
          <v-spacer />
          <v-col
            cols="3"
            align="end"
          >
            <upload-report-dialog @upload="listInspections()" />
          </v-col>
        </v-row>
      </v-form>

      <v-row>
        <v-col cols="12">
          <inspection-table
            :inspections="inspections"
            :order-by="filter.orderBy"
            :order="filter.order"
            @select="selectInspection($event)"
            @order="changeOrder($event)"
          />
        </v-col>
      </v-row>
      <v-row
        v-if="inspections.total > 0"
      >
        <v-col cols="3">
          <v-select
            v-model="filter.entriesPerPage"
            label="Rows Per page"
            :items="[10, 20, 50]"
          />
        </v-col>
        <v-col cols="9">
          <v-pagination
            v-model="filter.page"
            :length="pages"
            total-visible="8"
          />
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
<script lang="ts" setup>
import { useAsyncState } from "@vueuse/core"
import { api } from "@/api/api"
import { computed, reactive, watch } from "vue"
import { useRouter } from "vue-router"
import type {
  EntryList,
  InspectionFilter,
  InspectionPreview,
  InspectionStatus,
  OrderInspectionBy,
  ViolationBasic,
} from "@/types/inspections"
import UploadReportDialog from "@/components/UploadReportDialog.vue"
import InspectionTable from "@/components/InspectionTable.vue"

const router = useRouter()
const filter = reactive<InspectionFilter>({
  page: Number(router.currentRoute.value.query["page"] ?? 1),
  entriesPerPage: Number(router.currentRoute.value.query["entriesPerPage"] ?? 10),
  status: router.currentRoute.value.query["status"] as InspectionStatus,
  basic: router.currentRoute.value.query["basic"] as ViolationBasic,
  order: router.currentRoute.value.query["order"] as OrderInspectionBy["direction"],
  orderBy: router.currentRoute.value.query["orderBy"] as OrderInspectionBy["field"],
})

const status: InspectionStatus[] = ["Unresolved", "NoViolations"]
const basics: ViolationBasic[] = ["Driver Fitness", "Drugs/Alcohol", "HM Compliance", "HOS Compliance", "Unsafe Driving", "Vehicle Maint."]

watch(filter, () => {
  router.push({ query: filter })
  listInspections()
})

const { state: inspections, execute: listInspections } = useAsyncState<EntryList<InspectionPreview>>(
  () => api.inspections.list(filter),
  { total: 0, entries: [] },
  {
    immediate: true,
  },
)

const selectInspection = (inspection: InspectionPreview) => {
  router.push(`/inspections/${inspection.id}`)
}

const changeOrder = (selected: OrderInspectionBy) => {
  filter.order = selected.direction
  filter.orderBy = selected.field
}

const pages = computed(() => {
  return Math.ceil(inspections.value.total / 10)
})
</script>
