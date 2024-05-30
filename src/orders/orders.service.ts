import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderCreateDto } from './dto/order-create.dto';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) {}

    async createOrder(data: OrderCreateDto): Promise<Order> {
        return this.prisma.order.create({
            data,
        });
    }

    async getOrdersByUserId(userId: number): Promise<Order[]> {
        return this.prisma.order.findMany({
            where: {userId},
        });
    }
}
