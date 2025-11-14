import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PontosController } from './pontos.controller';
import { PontosService } from './pontos.service';
import { PontoDescarteSchema } from './ponto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PontoDescarte', schema: PontoDescarteSchema }]),
  ],
  controllers: [PontosController],
  providers: [PontosService],
})
export class PontosModule {}