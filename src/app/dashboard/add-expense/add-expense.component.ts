import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { ExpenseService } from '../expense/expense.service';

@Component({
  selector: 'app-add-expense',
  imports: [CommonModule, ReactiveFormsModule, TranslocoModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent {
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private expenseService = inject(ExpenseService);

  isLoading = false;

  categories = [
    { key: 'food',          labelKey: 'dashboard.cat.food' },
    { key: 'housing',       labelKey: 'dashboard.cat.housing' },
    { key: 'transport',     labelKey: 'dashboard.cat.transport' },
    { key: 'shopping',      labelKey: 'dashboard.cat.shopping' },
    { key: 'health',        labelKey: 'dashboard.cat.health' },
    { key: 'entertainment', labelKey: 'dashboard.cat.entertainment' },
    { key: 'education',     labelKey: 'dashboard.cat.education' },
    { key: 'other',         labelKey: 'dashboard.cat.other' },
  ];

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    amount: [null, [Validators.required, Validators.min(1)]],
    category: ['', [Validators.required]],
    date: [new Date().toISOString().split('T')[0], [Validators.required]],
    note: ['']
  });

  get name() { return this.form.get('name')!; }
  get amount() { return this.form.get('amount')!; }
  get category() { return this.form.get('category')!; }
  get date() { return this.form.get('date')!; }

  selectCategory(key: string){
    this.form.patchValue({ category: key });
  }

  onSubmit(){
    if(this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isLoading = true;

    this.expenseService.createExpenseData(this.form.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.saved.emit();
        this.close.emit();
      },
      error: (err) => {
        this.isLoading = false;
      }
   });
  }

  onBackdropClick(e: MouseEvent){
    if((e.target as HTMLElement).classList.contains('modal-backdrop')) this.close.emit();
  }

}
