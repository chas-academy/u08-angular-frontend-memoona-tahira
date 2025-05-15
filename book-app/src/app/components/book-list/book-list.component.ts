import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../../service/book-service.service';
import { Book } from '../../models/book';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = false;
  error: string | null = null;

  constructor(private bookservice: BookServiceService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
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

  deleteBook(id: string): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookservice.deleteBook(id).subscribe({
        next: () => {
          this.loadBooks();
        },
        error: (err) => {
          this.error = 'Failed to delete book. Please try again.';
          console.error('Error deleting book:', err);
        },
      });
    }
  }
}
