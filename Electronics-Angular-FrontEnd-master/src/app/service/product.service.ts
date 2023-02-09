import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
      charset: 'UTF-8',
    }),
  };
  // postFile(fileToUpload: File, jwt: string): Observable<any> {
  //   const endpoint = 'http://localhost:8089/api/emps/uploadFile';
  //   const formData: FormData = new FormData();
  //   formData.append('fileKey', fileToUpload, fileToUpload.name);
  //   console.log(formData);
  //   this.httpOptions.headers = this.httpOptions.headers.set(
  //     'Authorization',
  //     jwt
  //   );
  //   return this.http.post(endpoint, formData, this.httpOptions);
  // }
  getFromApi(url: string, jwt: string): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      jwt
    );
    return this.http.get(url, this.httpOptions);
  }
  get(url: string) {
    return this.http.get(url);
  }
  // getFilter(url:string,request:any,jwt:string){
  //   this.httpOptions.headers = this.httpOptions.headers.set(
  //     'Authorization',
  //     jwt
  //   );
  //   return this.http.get()
  // }
  // getJwt(url:string){
  //   return this.http.post(url);
  // }
  post(url: string, entity: any, jwt: string) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      jwt
    );
    return this.http.post(url, entity, this.httpOptions);
  }
  postToApi(url: string, entity: any): Observable<any> {
    return this.http.post(url, entity, { responseType: 'text' });
  }
  putToApi(url: string, id: any, jwt: string): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      jwt
    );
    return this.http.put(url, id, this.httpOptions);
  }
  deleteFromApi(url: string, jwt: string): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      jwt
    );
    return this.http.delete(url, this.httpOptions);
  }
  // getProductPage(url: string, jwt: string, pageNumber: number) {
  //   this.httpOptions.headers = this.httpOptions.headers.set(
  //     'Authorization',
  //     jwt
  //   );
  //   return this.http.get(url + pageNumber, this.httpOptions);
  // }
}
