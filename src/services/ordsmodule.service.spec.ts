import { Test, TestingModule } from '@nestjs/testing';
import { OrdsmoduleService } from './ordsmodule.service';

describe('OrdsmoduleService', () => {
  let service: OrdsmoduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdsmoduleService],
    }).compile();

    service = module.get<OrdsmoduleService>(OrdsmoduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
