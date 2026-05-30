import { ChangeDetectorRef, Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ExpenseService } from './expense/expense.service';
import { BudgetService } from './budgets/budget.service';
import { AddExpenseComponent } from './add-expense/add-expense.component';

export interface Expense {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  note?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslocoModule, AddExpenseComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private transloco = inject(TranslocoService);
  private expenseService = inject(ExpenseService);
  private budgetService = inject(BudgetService);
  private cdr = inject(ChangeDetectorRef);

  username = 'ken';
  monthBudget = 0;
  totalSpent = 0;

  expenses: Expense[] = [];

  currentDate  = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear  = this.currentDate.getFullYear();
  showUserMenu = false;
  sidebarOpen  = true;
  currentLang  = this.transloco.getActiveLang();

  languages = [
    { code: 'en', label: 'EN' },
    { code: 'ja', label: 'JA' },
    { code: 'id', label: 'ID' },
  ];

  ngOnInit(){
    this.loadExpenses();
  }

  get remaining()    { return this.monthBudget - this.totalSpent; }
  get spentPercent() {
    if(this.monthBudget === 0) return 0; 
    return Math.min(Math.round((this.totalSpent / this.monthBudget) * 100), 100); 
  }
  get isOverBudget() { return this.totalSpent > this.monthBudget; }
  get daysLeft() {
    const last = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    return Math.max(last - new Date().getDate(), 0);
  }
  get monthLabel(): string {
    return new Date(this.currentYear, this.currentMonth, 1)
      .toLocaleDateString('en', { month: 'long', year: 'numeric' });
  }
  get dailyAvg(): number {
    const now = new Date();
    const isCurrentMonth = this.currentYear === now.getFullYear() && this.currentMonth === now.getMonth();
    const isFutureMonth = this.currentYear > now.getFullYear() ||
      (this.currentYear === now.getFullYear() && this.currentMonth > now.getMonth());
    if (isFutureMonth) return 0;
    const divisor = isCurrentMonth
      ? now.getDate()
      : new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    return divisor > 0 ? Math.round(this.totalSpent / divisor) : 0;
  }
  
  get topCategory(): string {
    const totals = new Map<string, number>();
    this.expenses.forEach(e => totals.set(e.category, (totals.get(e.category) ?? 0) + e.amount));
    let top = 'other', max = 0;
    totals.forEach((v, k) => { if (v > max) { max = v; top = k; } });
    return top;
  }

  readonly ringCircumference = 339.29;
  get ringOffset(): number {
    return this.ringCircumference * (1 - this.spentPercent / 100);
  }

  prevMonth() {
    if (this.currentMonth === 0) { this.currentMonth = 11; this.currentYear--; }
    else this.currentMonth--;
    this.loadExpenses();
  }
  nextMonth() {
    if (this.currentMonth === 11) { this.currentMonth = 0; this.currentYear++; }
    else this.currentMonth++;
    this.loadExpenses();
  }

  expenseToDelete: Expense | null = null;

  requestDelete(expense: Expense) {
    this.expenseToDelete = expense;
  }

  cancelDelete() {
    this.expenseToDelete = null;
  }

  confirmDelete() {
    if (!this.expenseToDelete) return;
    const { id, amount } = this.expenseToDelete;
    this.expenses = this.expenses.filter(e => e.id !== id);
    this.totalSpent = Math.max(0, this.totalSpent - Number(amount));
    this.expenseToDelete = null;
    this.expenseService.deleteExpense(id).subscribe();
  }

  showAddModal = false;

  openAddExpense() {
    this.showAddModal = true;
  }

  switchLang(code: string) {
    this.transloco.setActiveLang(code);
    this.currentLang = code;
    localStorage.setItem('lang', code);
  }

  toggleUserMenu() { this.showUserMenu = !this.showUserMenu; }

  @HostListener('document:click', ['$event'])
  onDocClick(e: Event) {
    if (!(e.target as HTMLElement).closest('.user-menu')) this.showUserMenu = false;
  }

  loadExpenses(){
    this.expenseService.getExpenses(this.currentMonth + 1, this.currentYear).subscribe({
      next: expenses => {
        this.expenses = expenses;
        this.totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
        this.cdr.detectChanges();
      },
      error: err => console.error('getExpenses failed:', err)
    });

    this.budgetService.getBudget(this.currentMonth + 1, this.currentYear).subscribe({
      next: budget => {
        this.monthBudget = budget ? budget.amount : 0;
        this.cdr.detectChanges();
      },
      error: err => console.error('getBudget failed:', err)
    });
  }

  logout() {
    // TODO: authService.logout().subscribe(() => router.navigate(['/']))
  }

  formatAmount(n: number): string {
    return `¥${Math.abs(n).toLocaleString('ja-JP')}`;
  }
  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('en', { month: 'short', day: 'numeric' });
  }
}
