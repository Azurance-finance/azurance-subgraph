import { InsuranceCreated } from "../generated/Contract/Contract"
import { getOrCreatePool } from "./pool"

export function handleInsuranceCreated(event: InsuranceCreated): void {
  getOrCreatePool(event.address);
}

