import { Module } from '@nestjs/common';
import { RelatorioController } from './relatorio.controller';
import { RelatorioService } from './relatorio.service';
import { MongooseModule } from '@nestjs/mongoose'; // 1. Importar Mongoose
import { PontoDescarteSchema } from 'src/pontos/ponto.schema'; // 2. Importar Schema de Ponto
import { RegistroDescarteSchema } from 'src/registros/registro.schema'; // 3. Importar Schema de Registro

@Module({
  imports: [
    // 4. Registrar AMBOS os Schemas para que este módulo possa usá-los
    MongooseModule.forFeature([
      { name: 'PontoDescarte', schema: PontoDescarteSchema },
      { name: 'RegistroDescarte', schema: RegistroDescarteSchema },
    ]),
  ],
  controllers: [RelatorioController],
  providers: [RelatorioService],
})
export class RelatorioModule {}