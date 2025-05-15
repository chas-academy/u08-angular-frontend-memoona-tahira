import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { BookServiceService } from '../../service/book-service.service';
import { Book } from '../../models/book';


@Component({
  selector: 'app-book-edit',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.scss',
})
export class BookEditComponent implements OnInit {
  bookId: string = '';
  book: Book = {
    _id: '',
    title: '',
    author: '',
    year: 0,
    genre: '',
    rating: 0,
    isRead: false,
  };
  loading = true;
  error: string | null = null;

  constructor(
    private bookService: BookServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.bookId = params['id'];
      this.loadBook();
    });
  }

  loadBook(): void {
    this.loading = true;
    this.bookService.getBook(this.bookId).subscribe({
      next: (book: Book) => {
        this.book = book;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load book. Please try again later.';
        console.error('Error loading book:', err);
        this.loading = false;
      },
    });
  }

  updateBook(): void {
    this.bookService.updateBook(this.bookId, this.book).subscribe({
      next: () => {
        this.router.navigate(['/books']);
      },
      error: (err: any) => {
        this.error = 'Failed to update book. Please try again.';
        console.error('Error updating book:', err);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/books']);
  }
}
