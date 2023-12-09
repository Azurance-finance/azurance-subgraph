import { InsuranceCreated } from "../generated/AzuranceFactory/AzuranceFactory"
import { getOrCreatePool } from "./pool"

export function handleInsuranceCreated(event: InsuranceCreated): void {
  getOrCreatePool(event.address);
}

