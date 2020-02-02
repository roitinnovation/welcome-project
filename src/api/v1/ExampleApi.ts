import { Post, Wrapper, Get, Put, Controller } from "@overnightjs/core"
import { Handle, OkResponse } from "@roit/roit-response-handler"
import { Request, Response } from "express"
import { ExampleService } from "../../service/ExampleService"
import { Logger } from "@overnightjs/logger"
import { ModelMapperRequest } from "@roit/roit-model-mapper"
import { Hello } from "../../model/Hello"

@Controller('api/v1/example')
export class ExampleApi {

    private service: ExampleService = new ExampleService

    @Get()
    @Wrapper(Handle.asyncDispatcher)
    private async list(req: Request, res: Response) {

        const result = this.service.list()

        Logger.Info(`Finding all...`)

        return res.send(OkResponse(result))
    }

    @Get(':id')
    @Wrapper(Handle.asyncDispatcher)
    private async findById(req: Request, res: Response) {

        const { id } = req.params

        Logger.Info(`Finding by id ${id}`)

        const result = this.service.findById(Number(id))

        return res.send(OkResponse(result))
    }

    @Post()
    @Wrapper(Handle.asyncDispatcher)
    private async save(req: ModelMapperRequest, res: Response) {

        const hello: Hello = req.mapper.bodyToObject(Hello)

        Logger.Info(`Create with payload ${JSON.stringify(hello)}`)

        this.service.save(hello)

        return res.send(OkResponse(null))
    }

    @Put(':id')
    @Wrapper(Handle.asyncDispatcher)
    private async update(req: ModelMapperRequest, res: Response) {

        const hello: Hello = req.mapper.bodyToObject(Hello)
        const { id } = req.params

        Logger.Info(`Update with payload ${JSON.stringify(hello)} and id: ${id}`)

        this.service.update(Number(id), hello)

        return res.send(OkResponse(null))
    }
}