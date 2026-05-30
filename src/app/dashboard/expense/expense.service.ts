import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ExpensesDto } from './expense.dto';
import { Expense } from '../dashboard.component';


@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/expenses';

  getExpenses(month: number, year: number){
    return this.http.get<Expense[]>(this.apiUrl, {
      params: { month: month.toString(), year: year.toString() 
      },
      withCredentials: true,
    });
  }

  createExpenseData(data: ExpensesDto){
    return this.http.post(`${this.apiUrl}`, data, { withCredentials: true });
  }

  deleteExpense(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
