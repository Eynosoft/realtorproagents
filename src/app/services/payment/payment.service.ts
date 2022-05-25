import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders,HttpResponse,HttpRequest } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TokenStorageService } from '../token-storage.service';

const API_URL = environment.apiUrl+'/payment/';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }
}
