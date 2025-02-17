import { PrismaClient } from "@prisma/client";
import { TransactionManagerInterface } from "../../application/utils/transactionManegerInterface";
import { TransactionContextInterface } from "../../domain/utils/transactionContextInterface";

export class PrismaTransactionManager implements TransactionManagerInterface {
    constructor(private readonly prisma: PrismaClient) { }

    async run<T>(operation: (ctx: TransactionContextInterface) => Promise<T>): Promise<T> {
        return await this.prisma.$transaction(async (ctx) => await operation(ctx));
    }
}