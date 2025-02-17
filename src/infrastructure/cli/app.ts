import { PrismaClient } from "@prisma/client";
import { UUIDGenerator } from "../../adapter/utils/uuidGenerator";
import { PrismaBookRepository } from "../../adapter/repositories/prismaBookRepository";
import { AddBookUseCase } from "../../application/usecases/book/addBookUseCase";
import { BookCommand } from "../../adapter/commands/bookCommand";
import inquirer from "inquirer";

async function main() {
    const prisma = new PrismaClient();
    const uuidGenerator = new UUIDGenerator();
    const bookRepositry = new PrismaBookRepository(prisma);
    const addBookUseCase = new AddBookUseCase(bookRepositry, uuidGenerator);
    const bookCommand = new BookCommand(addBookUseCase);

    const { command } = await inquirer.prompt([
        {
            type: 'list',
            name: 'command',
            message: 'どのコマンドを実行しますか？',
            choices: ['書籍登録']
        }
    ]);

    if (command === '書籍登録') {
        const { title } = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'タイトルを入力してください'
            }
        ]);
        await bookCommand.addBook(title);
    }
}

main();