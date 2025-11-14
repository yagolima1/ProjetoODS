import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrosController } from './registros.controller';
import { RegistrosService } from './registros.service';
import { RegistroDescarteSchema } from './registro.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'RegistroDescarte', schema: RegistroDescarteSchema }]),
  ],
  controllers: [RegistrosController],
  providers: [RegistrosService],
})
export class RegistrosModule {}