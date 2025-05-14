import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../../service/book-service.service'; // Correct import path
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = false;
  error: string | null = null;

  constructor(private bookservice: BookServiceService) {}

  ngOnInit(): void {
    this.bookservice.getAllBooks().subscribe({
      next: (value) => {
        this.books = value;
        this.loading = false;
        console.log(this.books);
      },
      error: (err) => {
        this.error = 'Failed to load books. Please try again later.';
        console.error('Error loading books:', err);
        this.loading = false;
      },
    });
  }
}
