import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BudgetInterface, BudgetsDto } from './budgets.dto';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/budgets';

  getBudget(month: number, year: number){
    return this.http.get<BudgetInterface | null>(this.apiUrl, { params: { month, year }, withCredentials: true});
  }

  setBudget(data: BudgetsDto){
    return this.http.put(this.apiUrl, data, { withCredentials: true });
  }
}
