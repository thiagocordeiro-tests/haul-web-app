export type EntryList<T> = {
  total: number,
  entries: T[],
}

export type InspectionStatus = "Unresolved" | "NoViolations"
export type ViolationBasic = "Driver Fitness"
  | "Drugs/Alcohol"
  | "HM Compliance"
  | "HOS Compliance"
  | "Unsafe Driving"
  | "Vehicle Maint."

export type OrderInspectionBy = {
  field: "InspectedAt" | "Status" | "InspectionNumber",
  direction: "ASC" | "DESC"
}

export type InspectionFilter = Partial<{
  page: number,
  entriesPerPage: number,
  basic: ViolationBasic,
  status: InspectionStatus,
  orderBy: OrderInspectionBy["field"],
  order: OrderInspectionBy["direction"],
}>

export type InspectionPreview = {
  id: string,
  inspectedAt: string,
  status: InspectionStatus,
  plate: string,
  violation?: string,
  weight?: number,
  importedAt: string,
}

export type Vehicle = {
  id: string,
  type: string,
  license: { number: string, state: string }
}

export type InspectedVehicle = {
  unit: number,
  vehicle: Vehicle,
}

export type Violation = {
  convictedOfDifCharge: boolean,
  code: string,
  description: string,
  oos: boolean,
  timeSeverityWeight: number,
  basic: ViolationBasic,
  unit: number
}

export type Inspection = {
  id: string,
  state: string,
  level: number,
  timeWeight: number,
  placarableHazmatInspection: boolean,
  hazmatInspection: boolean,
  inspectedAt: string,
  status: InspectionStatus,
  vehicles: InspectedVehicle[],
  violations: Violation[],
  importedAt: string,
}
