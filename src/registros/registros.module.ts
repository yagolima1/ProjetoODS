import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrosController } from './registros.controller';
import { RegistrosService } from './registros.service';
import { RegistroDescarteSchema } from './registro.schema';

@Module({
  imports: [
    // 3. ESSA É A LINHA QUE FALTAVA (ou estava errada):
    MongooseModule.forFeature([{ name: 'RegistroDescarte', schema: RegistroDescarteSchema }]),
  ],
  controllers: [RegistrosController],
  providers: [RegistrosService],
})
export class RegistrosModule {}