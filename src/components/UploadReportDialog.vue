<template>
  <v-dialog v-model="dialog" max-width="500">
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        text="Upload"
        height="40"
        append-icon="mdi-file-upload-outline"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="Upload FMCSA Inspection Report">
        <v-card-text>
          <v-file-upload
            v-model="report"
            title="Drag and Drop Here"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            text="Close"
            @click="isActive.value = false"
          />
          <v-btn
            text="Upload"
            variant="flat"
            :disabled="!report"
            :loading="isLoading"
            @click="upload()"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { useAsyncState } from "@vueuse/core"
import { api } from "@/api/api"
import { ref } from "vue"

const dialog = ref(false)
const report = defineModel<File>("report")
const emit = defineEmits(["upload"])

const { isLoading, execute: upload } = useAsyncState(
  () => api.inspections.upload(report.value as File),
  null,
  {
    immediate: false,
    onSuccess() {
      dialog.value = false
      emit("upload")
    },
  },
)
</script>
