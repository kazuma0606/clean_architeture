import { Request, Response } from "express";
import { AddBookUseCaseInterface } from "../../application/usecases/book/addBookUseCaseInterface";
import { AddBookRequestDto } from "../../application/dtos/book/addBookRequestDto";
import { findBookByIdUseCaseInterface } from "../../application/usecases/book/findBookByIdUseCaseInterface";
import { findBookByIdRequestDto } from "../../application/dtos/book/findBookByIdRequestDto";

export class BookController {
    constructor(
        private readonly addBookUseCase: AddBookUseCaseInterface,
        private readonly findBookByIdUseCase: findBookByIdUseCaseInterface
    ) {
    }

    async add(req: Request, res: Response): Promise<void> {
        try {
            const requestDto: AddBookRequestDto = {
                title: req.body.title,
            }
            const book = await this.addBookUseCase.execute(requestDto);
            res.status(201).json(book);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "書籍の登録に失敗しました" });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const requestDto: findBookByIdRequestDto = {
                id: req.params.id,
            }
            const book = await this.findBookByIdUseCase.execute(requestDto);
            if (book) {
                res.status(200).json(book);
                return;
            } else {
                res.status(404).json({ error: "書籍が見つかりませんでした" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "書籍の検索に失敗しました" });
        }
    }
}