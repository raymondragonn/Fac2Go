import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-new-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-new-invoice.component.html',
  styles: [`
    .card {
      border-radius: 15px;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      border: none;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 25px rgba(0,0,0,0.15);
    }

    .card-header {
      background: linear-gradient(45deg, #4a90e2, #5cb3ff);
      color: white;
      border-radius: 15px 15px 0 0 !important;
      border: none;
      padding: 1.5rem;
    }

    .form-control, .form-select {
      border-radius: 10px;
      padding: 1rem;
      border: 1px solid #e0e0e0;
      transition: all 0.3s ease;
      font-size: 1rem;
    }

    .form-control:focus, .form-select:focus {
      border-color: #4a90e2;
      box-shadow: 0 0 0 0.2rem rgba(74, 144, 226, 0.25);
    }

    .form-floating > label {
      padding: 1rem;
      color: #6c757d;
    }

    .form-floating > .form-control:focus ~ label,
    .form-floating > .form-control:not(:placeholder-shown) ~ label {
      transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
      color: #4a90e2;
    }

    .btn-primary {
      padding: 1rem 2rem;
      border-radius: 10px;
      font-weight: 600;
      transition: all 0.3s ease;
      background: linear-gradient(45deg, #4a90e2, #5cb3ff);
      border: none;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(74, 144, 226, 0.3);
    }

    .btn-primary:disabled {
      background: #e9ecef;
      cursor: not-allowed;
    }

    .form-text {
      font-size: 0.9rem;
      opacity: 0.8;
    }

    .card-body {
      padding: 2rem;
    }

    .las {
      font-size: 1.1rem;
    }
  `]
})
export class FormNewInvoiceComponent {
  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      periodicity: ['', Validators.required],
      month: ['', Validators.required],
      numberOfInvoices: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      console.log(this.invoiceForm.value);
      // Aquí iría la lógica para procesar el formulario
    }
  }
}
