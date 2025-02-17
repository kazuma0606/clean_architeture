import express from 'express';
import { BookController } from '../../adapter/controllers/bookController';
import { PrismaBookRepository } from '../../adapter/repositries/prismaBookRepository';
import { PrismaClient } from '@prisma/client';
import { UUIDGenerator } from '../../adapter/utils/uuidGenerator';
import { AddBookUseCase } from '../../application/usecases/book/addBookUseCase';
import { bookRoutes } from './routers/bookRouter';
import { FindBookByIdUseCase } from '../../application/usecases/book/findBookByIdUseCase';

const app = express();

app.use(express.json());

const prisma = new PrismaClient();
const uuidgenerator = new UUIDGenerator();

const bookRepositry = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepositry, uuidgenerator);
const findBookByIdUseCase = new FindBookByIdUseCase(bookRepositry);

const bookController = new BookController(addBookUseCase, findBookByIdUseCase);

app.use('/books', bookRoutes(bookController));

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});