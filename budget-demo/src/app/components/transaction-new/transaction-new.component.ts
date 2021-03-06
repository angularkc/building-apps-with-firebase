import { Component, OnInit } from '@angular/core';
import { LocalStorageTransactionService } from 'src/app/services/local-storage-transaction.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirestoreTransactionService } from 'src/app/services/firestore-transaction.service';

@Component({
  selector: 'app-transaction-new',
  templateUrl: './transaction-new.component.html',
  styleUrls: ['./transaction-new.component.css']
})
export class TransactionNewComponent implements OnInit {

  public hasError: boolean;
  public form: FormGroup;

  constructor(
    private readonly transactionService: FirestoreTransactionService,
    private readonly dialog: MatDialogRef<TransactionNewComponent>,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      category: '',
      date: new Date(),
      amount: 0
    });
  }

  public cancel(): void {
    this.dialog.close(null);
  }

  public async submit(value: any): Promise<void> {
    this.hasError = false;
    try {
      await this.transactionService.add(value);
      this.dialog.close(null);
    }
    catch (e) {
      console.error(e);
      this.hasError = true;
    }
  }
}
