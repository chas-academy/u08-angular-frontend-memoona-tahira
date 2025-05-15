// book-create.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookServiceService } from '../../service/book-service.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss',
})
export class BookCreateComponent {
  book: Book = {
    _id: '',
    title: '',
    author: '',
    year: new Date().getFullYear(),
    genre: '',
    rating: 5,
    isRead: false,
  };
  error: string | null = null;
  submitting = false;

  constructor(
    private bookService: BookServiceService,
    private router: Router
  ) {}

  createBook(): void {
    // Basic validation
    if (!this.book.title || !this.book.author) {
      this.error = 'Title and author are required.';
      return;
    }

    this.submitting = true;
    this.error = null;

    this.bookService.createBook(this.book).subscribe({
      next: () => {
        this.router.navigate(['/books']);
      },
      error: (err: any) => {
        this.error = 'Failed to create book. Please try again.';
        console.error('Error creating book:', err);
        this.submitting = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/books']);
  }
}
