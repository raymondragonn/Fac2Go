import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxScannerQrcodeComponent, LOAD_WASM, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { BehaviorSubject } from 'rxjs';

LOAD_WASM('assets/wasm/ngx-scanner-qrcode.wasm').subscribe();

@Component({
  selector: 'app-qr-scanner',
  imports: [CommonModule, NgxScannerQrcodeComponent],
  templateUrl: './qr-scanner.component.html',
  styles: ``,
})
export class QrScannerComponent {
  qrValue: string | null = null;

  extractValue(data: BehaviorSubject<ScannerQRCodeResult[]>): void {
    data.subscribe((results) => {
      const qrResult = results.find((result) => result.value);
      this.qrValue = qrResult ? qrResult.value : null;
      console.log(this.qrValue);
    });
  }
}


