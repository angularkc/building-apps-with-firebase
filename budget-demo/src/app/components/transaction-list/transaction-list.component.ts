import { Component, OnInit } from '@angular/core';
import { LocalStorageTransactionService } from 'src/app/services/local-storage-transaction.service';
import { Observable } from 'rxjs';
import { TransactionModel } from 'src/app/models/transaction.model';
import { MatDialog } from '@angular/material/dialog';
import { TransactionNewComponent } from '../transaction-new/transaction-new.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  public transactions$: Observable<Array<TransactionModel>>;

  constructor(
    private readonly transactionService: LocalStorageTransactionService,
    private readonly dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.transactions$ = this.transactionService.transactions$;
  }

  public createTransaction(): void {
    this.dialog.open(TransactionNewComponent);
  }

}