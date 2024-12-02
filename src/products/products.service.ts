import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common';
import { PrismaClient } from '@prisma/client';
import enviroment from '../config/configuration';

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

    const totalPages = await this.products.count({
      where: { availability: true },
    });

    return {
      data,
      meta: {
        currentPage: page,
        perPage: limit,
        totalItems: data.length,
        totalPages,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.products.findFirst({
      where: { id, availability: true },
    });

    if (!product)
      throw new NotFoundException(`Product with id #${id} not found`);

    return product;
  }

  async update(productId: number, updateProductDto: UpdateProductDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: __, ...rest } = updateProductDto;

    await this.findOne(productId);

    return this.products.update({
      where: { id: productId },
      data: rest,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.products.update({
      where: { id },
      data: { availability: false },
    });
  }
}
