import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadServiceService {
  private apiUrl = 'http://localhost:3000/user/client/editprogressImage';
  constructor(private http: HttpClient) {}
  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http
      .post<any>(this.apiUrl, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          if (event.type === HttpEventType.Response) {
            return event.body.url; // Assuming your API returns the file URL in the response body
          }
          return null;
        })
      );
  }
}
