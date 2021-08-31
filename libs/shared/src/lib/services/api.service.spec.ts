import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    apiService = TestBed.get(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('get', () => {
    let expectedResponse: any;

    beforeEach(() => {
      apiService = TestBed.get(ApiService);
      expectedResponse = {
        test: 'value',
      };
    });

    it('should return expected data', () => {
      apiService
        .get('dummy/url')
        .subscribe((data) => expect(data).toEqual(expectedResponse));

      const req = httpTestingController.expectOne('dummy/url');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedResponse);
    });
  });
});
