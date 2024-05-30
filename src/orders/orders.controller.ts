import {Body, Controller, Post} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderCreateDto, OrderDto } from './dto/order-create.dto';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Order } from '@prisma/client';


@ApiTags('order')
@ApiBearerAuth()
@Controller('order')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
    ) {}
    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'The order has been successfully created', type: OrderDto })
    async create(@Body() createOrderDto: OrderCreateDto): Promise<OrderDto> {
        const order = await this.ordersService.createOrder(createOrderDto);
        return this.toOrderDto(order);
    }

    private toOrderDto(order: Order): OrderDto {
        return <OrderDto>{
            id: order.id,
            userId: order.userId,
            items: order.items
        };
    }
}
