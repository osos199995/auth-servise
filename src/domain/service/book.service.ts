import {getCustomRepository} from "typeorm";

import {BookRepository} from "../../infrastructure/persistance/repositories/book.repository";
import {BookModel} from "../models/book.model";

export class BookService{
    private bookRepository: BookRepository;
    constructor() {
        this.bookRepository = getCustomRepository(BookRepository)
    }
    public find = async (filter?: any):Promise<BookModel[]>=>{
       return  this.bookRepository.find(filter);
    }
    public create = async (book:BookModel ):Promise<BookModel>=>{
        return await this.bookRepository.save(book);
    }
}
