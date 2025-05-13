import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

    private apiUrl = 'https://book-collection-api-kj0g.onrender.com/api/v1/books';
  constructor(private http: HttpClient) { }

  getAllBooks() : Observable<Book[]>  {
    return this.http.get<{data: Book[]}>(this.apiUrl)
    .pipe(
          map(response => response.data),
           catchError(err => {
                    console.error('API error:', err);
                    return throwError(() => err); // Return a new observable
                  })
        );

    }


}
