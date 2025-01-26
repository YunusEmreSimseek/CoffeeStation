import { Component, OnInit } from '@angular/core';
import { GetCouponModel } from '../../../../Models/Discount/DiscountModels';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DiscountService } from '../../../../Services/Discount/discount.service';
import { AddDiscountDialogComponent } from '../../../dialogs/add-discount-dialog/add-discount-dialog.component';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrl: './discounts.component.css'
})
export class DiscountsComponent implements OnInit {

  // Kuponlar tablosu için sütunlar
  displayedColumns: string[] = ['id', 'code', 'rate', 'actions'];
  // Kuponlar tablosu için veri kaynağı
  dataSource: GetCouponModel[] = [];

  constructor(
    private _discountService: DiscountService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { this.loadDiscounts(); }

  // Tüm kuponları yükle
  loadDiscounts() {
    this._discountService.getAllDiscounts().subscribe({
      next: (discounts) => {
        this.dataSource = discounts;
      },
      error: (err) => {
        this.snackBar.open('Kuponlar yüklenirken hata oluştu.', 'Kapat', {
          duration: 3000
        });
      }
    });
  }

  // Yeni kupon ekle diyaloğu aç
  openAddDiscountDialog() {
    const dialogRef = this.dialog.open(AddDiscountDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        // Kupon eklendiyse listeyi yenile
        this.loadDiscounts();
      }
    });
  }

  // Kupon sil
  deleteDiscount(couponId: string) {
    if (!confirm('Bu kuponu silmek istediğinize emin misiniz?')) {
      return;
    }

    this._discountService.deleteDiscount(couponId).subscribe({
      next: () => {
        this.snackBar.open('Kupon başarıyla silindi.', 'Kapat', { duration: 2000 });
        this.loadDiscounts();
      },
      error: (err) => {
        this.snackBar.open('Kupon silinirken hata oluştu.', 'Kapat', { duration: 3000 });
      }
    });}

}
