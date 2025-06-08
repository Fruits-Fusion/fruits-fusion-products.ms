import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import enviroment from '../config/env.config';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductService');

  onModuleInit() {
    this.$connect();
    this.logger.log(
      `${enviroment().MICROSERVICE_NAME} running database instance successfully`,
    );
  }

  create(createProductDto: CreateProductDto) {
    return this.products.create({ data: createProductDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const data = await this.products.findMany({
      where: { availability: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: {
        currentPage: page,
        perPage: limit,
        totalItems: data.length,
        totalPages: data.length / page,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.products.findFirst({
      where: { id, availability: true },
    });

    if (!product) {
      throw new RpcException({
        message: `Product with id #${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return product;
  }

  async update(updateProductDto: UpdateProductDto) {
    const { id, ...rest } = updateProductDto;

    await this.findOne(id);

    try {
      await this.products.update({
        where: { id },
        data: rest,
      });

      return {
        statusCode: HttpStatus.OK,
        message: `Product with id #${id} was successfully updated`,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new RpcException({
        message: 'Interal Server Error',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      await this.products.update({
        where: { id },
        data: { availability: false },
      });

      return {
        statusCode: HttpStatus.OK,
        message: `Product with id #${id} was successfully removed`,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new RpcException({
        message: 'Interal Server Error',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
