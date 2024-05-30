import { PrismaService } from '../prisma/prisma.service';
import { OrderCreateDto } from './dto/order-create.dto';
import { Order } from '@prisma/client';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrder(data: OrderCreateDto): Promise<Order>;
    getOrdersByUserId(userId: number): Promise<Order[]>;
}
