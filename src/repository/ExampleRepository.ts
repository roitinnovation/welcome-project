import { Hello } from "../model/Hello";
import * as randomName from "node-random-name"

export class ExampleRepository {

    private dataset: Array<Hello>

    constructor() {
        this.dataset = new Array

        for(let i = 0; i < 50; i++) {
            this.dataset.push({ id: i, message: `Hello ${randomName({ random: Math.random, female: true })}` })
        }
    }

    list(): Array<Hello> {
        return this.dataset
    }

    // TODO implement
    findById(id: number): Hello {
        return null
    }

    // TODO implement
    save(hello: Hello) {

    }

    // TODO implement
    update(id: number, hello: Hello) {

    }
}