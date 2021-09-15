import {BookService} from "../domain/service/book.service";
import {BookModel} from "../domain/models/book.model";
import {BookResponseDto} from "./dto/responses/bookResponse.dto";
import {validate} from "express-validation";
import {CreateBookRequestDto} from "./dto/requests/book-request.dto";

export class BookApp{
    private bookService: BookService
    constructor() {
        this.bookService = new BookService()
    }
    public find =  async (filter?:any):Promise<BookResponseDto[]>=>{
      const  books = await this.bookService.find(filter)
        return books.map(book=>{
            return {
                id: book.id,
                title: book.title,
                description: book.description
            }
        })
    }

    async create(req: BookModel):Promise<BookModel> {
        validate(CreateBookRequestDto, {}, {})
         const book = await this.bookService.create(req);
         return {
             id: book.id,
             title: book.title,
             description: book.description
         }
    }
}
