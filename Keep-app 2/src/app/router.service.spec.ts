import { TestBed } from '@angular/core/testing';
import { RouterService } from './router.service';
import { HttpClientModule } from '@angular/common/http';

describe('RouterService', () => {
  let service: RouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(RouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
