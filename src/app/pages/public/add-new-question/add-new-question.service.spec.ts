import { TestBed } from '@angular/core/testing';

import { AddNewQuestionService } from './add-new-question.service';

describe('AddNewQuestionService', () => {
  let service: AddNewQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
