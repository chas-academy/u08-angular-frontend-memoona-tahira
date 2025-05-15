import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookServiceService {
  private apiUrl = 'https://book-collection-api-kj0g.onrender.com/api/v1/books';
  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<{ data: Book[] }>(this.apiUrl).pipe(
      map((response) => response.data),
      catchError((err) => {
        console.error('API error:', err);
        return throwError(() => err); // Return a new observable
      })
    );
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('API error:', err);
        return throwError(() => err);
      })
    );
  }
  getBook(id: string): Observable<Book> {
    return this.http.get<{ data: Book }>(`${this.apiUrl}/${id}`).pipe(
      map((response) => response.data),
      catchError((err) => {
        console.error('API error:', err);
        return throwError(() => err);
      })
    );
  }
  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put<{ data: Book }>(`${this.apiUrl}/${id}`, book).pipe(
      map((response) => response.data),
      catchError((err) => {
        console.error('API error:', err);
        return throwError(() => err);
      })
    );
  }
}
