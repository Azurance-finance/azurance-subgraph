import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { InsuranceCreated } from "../generated/Contract/Contract"

export function createInsuranceCreatedEvent(
  creator: Address,
  target: Address,
  asset: Address
): InsuranceCreated {
  let insuranceCreatedEvent = changetype<InsuranceCreated>(newMockEvent())

  insuranceCreatedEvent.parameters = new Array()

  insuranceCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  insuranceCreatedEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  )
  insuranceCreatedEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )

  return insuranceCreatedEvent
}
