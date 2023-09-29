import { TestBed } from '@angular/core/testing';
import { NotesService } from './notes.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,MatFormFieldModule,MatToolbarModule]
    });
    service = TestBed.inject(NotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
