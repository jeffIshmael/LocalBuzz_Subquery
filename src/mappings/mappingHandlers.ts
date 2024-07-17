import { PackagePurchased } from "../types";
import {
  packagePurchasedLog
} from "../types/abi-interfaces/LocalBuzzAbi";
import assert from "assert";

export async function handleLog(log: packagePurchasedLog
): Promise<void> {
  logger.info(`New transfer transaction log at block ${log.blockNumber}`);
  assert(log.args, "No log.args");

  const transaction = PackagePurchased.create({
    id: log.transactionHash,
    packageId: log.args.id.toBigInt(),
    buyer: log.args.buyer,
    amount: log.args.amount.toBigInt(),
    // client: log.args.from,
    // price: log.args.value.toBigInt(),
    
  });

  await transaction.save();
}

// export async function handleLog(log: purchasePackage): Promise<void> {
//   logger.info(`New transfer transaction log at block ${log.blockNumber}`);
//   assert(log.args, "No log.args");

//   const transaction = PurchasePackage.create({
//     id: log.transactionHash,
//     creator: log.args.to,
//     client: log.args.from,
//     price: log.args.value.toBigInt(),
    
//   });

//   await transaction.save();
// }

// export async function handleTransaction(tx: ApproveTransaction): Promise<void> {
//   logger.info(`New Approval transaction at block ${tx.blockNumber}`);
//   assert(tx.args, "No tx.args");

//   const approval = Approval.create({
//     id: tx.hash,
//     owner: tx.from,
//     spender: await tx.args[0],
//     value: BigInt(await tx.args[1].toString()),
//     contractAddress: tx.to,
//   });

//   await approval.save();
// }


