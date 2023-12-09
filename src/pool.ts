import { Address } from "@graphprotocol/graph-ts";
import { AzurancePool } from "../generated/AzuranceFactory/AzurancePool";
import { InsurancePool } from "../generated/schema";
import { getOrCreateToken } from "./token";

export function getOrCreatePool(address: Address) {
    let id = address.toHex();
    let pool = InsurancePool.load(id);

    if (pool == null) {
        pool = new InsurancePool(id);

        let instance = AzurancePool.bind(address);

        let multiplier = instance.try_multiplier();
        let multiplierDecimals = instance.try_multiplierDecimals();
        let maturityBlock = instance.try_maturityBlock();
        let staleBlock = instance.try_staleBlock();
        let underlyingToken = instance.try_underlyingToken();
        let fee = instance.try_fee();
        let feeTo = instance.try_feeTo();
        let condition = instance.try_condition();
        let buyerToken = instance.try_buyerToken();
        let sellerToken = instance.try_sellerToken();
        let status = instance.try_status();

        if (!multiplier.reverted) pool.multiplier = multiplier.value;
        if (!multiplierDecimals.reverted) pool.multiplierDecimals = multiplierDecimals.value;
        if (!maturityBlock.reverted) pool.maturityBlock = maturityBlock.value;
        if (!staleBlock.reverted) pool.staleBlock = staleBlock.value;
        if (!underlyingToken.reverted) pool.underlyingToken = getOrCreateToken(underlyingToken.value).id;
        if (!fee.reverted) pool.fee = fee.value;
        if (!feeTo.reverted) pool.feeTo = feeTo.value;
        if (!condition.reverted) pool.condition = condition.value;
        if (!buyerToken.reverted) pool.buyerToken = getOrCreatePool(buyerToken.value).id;
        if (!sellerToken.reverted) pool.sellerToken = getOrCreatePool(sellerToken.value).id;
        if (!status.reverted) pool.status = status.value;

        pool.save();
    }

    return pool;
}