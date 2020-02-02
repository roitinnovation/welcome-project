import { Hello } from "../model/Hello";
import { ExampleRepository } from "../repository/ExampleRepository";

export class ExampleService {

    private repository: ExampleRepository = new ExampleRepository

    list(): Array<Hello> {
        return this.repository.list()
    }

    findById(id: number): Hello {
        return this.repository.findById(id)
    }

    save(hello: Hello) {
        this.repository.save(hello)
    }

    update(id: number, hello: Hello) {
        this.repository.update(id, hello)
    }
}