import { Test, TestingModule } from '@nestjs/testing';
import { OrdsmoduleController } from '../../controllers/ordsmodule.controller';

describe('OrdsmoduleController', () => {
  let controller: OrdsmoduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdsmoduleController],
    }).compile();

    controller = module.get<OrdsmoduleController>(OrdsmoduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
