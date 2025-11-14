import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PontosModule } from './pontos/pontos.module';
import { RegistrosModule } from './registros/registros.module';
import { RelatorioModule } from './relatorio/relatorio.module';

import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
    }),

    // Conexão com o Banco de Dados
    MongooseModule.forRoot('mongodb+srv://franyagoy_db_user:x5RyKPCFk5FbQc6R@cluster0.zvvrkzd.mongodb.net/projetoODS?appName=Cluster0'),

    // Módulos da nossa aplicação
    PontosModule,
    RegistrosModule,
    RelatorioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}