import { OrdersService } from './orders.service';
import { OrderCreateDto, OrderDto } from './dto/order-create.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: OrderCreateDto): Promise<OrderDto>;
    private toOrderDto;
}
