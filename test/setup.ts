import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { RolesService } from "src/roles/roles.service";


let app: INestApplication

beforeAll(async () => {
  const moduleFixture =  await Test.createTestingModule({
    imports: [AppModule, RolesService]
  }).compile()

  app = moduleFixture.createNestApplication()
  await app.init()
  global['app'] = app
  
})

afterAll(async () => {
  await app.close()
})
