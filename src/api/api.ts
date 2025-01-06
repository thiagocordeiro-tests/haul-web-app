import axios from "axios"
import type { EntryList, Inspection, InspectionFilter, InspectionPreview } from "@/types/inspections"

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
})

export const api = {
  inspections: {
    async list(filter: InspectionFilter): Promise<EntryList<InspectionPreview>> {
      const response = await client.get<EntryList<InspectionPreview>>("/inspections", {
        params: filter,
      })

      return response.data
    },
    async load(id: string): Promise<Inspection> {
      const response = await client.get<Inspection>(`/inspections/${id}`)

      return response.data
    },
    async upload(file: File): Promise<void> {
      const formData = new FormData()
      formData.append("report", file)

      await client.post<void>(`/inspections/reports`,
        formData,
        {
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
    },
  },
}
