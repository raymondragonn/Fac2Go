import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../../services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contact.component.html',
  styles: [`
    :host ::ng-deep {
      .form-control, .form-select {
        &:focus {
          box-shadow: none;
          border-color: #0d6efd;
        }
      }

      .alert-info {
        background-color: #d4edda;
        border-color: #c3e6cb;
        color: #155724;
      }

      .alert-link {
        color: #155724;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }

      .file-input-wrapper {
        position: relative;
        overflow: hidden;
        display: inline-block;
      }

      .file-input-wrapper input[type=file] {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
      }

      .card-title {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 50px;
          height: 3px;
          background-color: #6c757d;
          border-radius: 2px;
        }
      }

      .form-label {
        font-size: 1.1rem;
        font-weight: 500;
        color: #2c3e50;
      }

      .text-muted {
        font-size: 1.05rem;
      }
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  selectedFiles: File[] = [];
  maxFileSize = 5 * 1024 * 1024; // 5MB

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private toastr: ToastrService
  ) {
    this.contactForm = this.fb.group({
      subject: ['', [Validators.required, Validators.minLength(5)]],
      queryType: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      
      // Validar tamaño de archivos
      const invalidFiles = files.filter(file => file.size > this.maxFileSize);
      if (invalidFiles.length > 0) {
        this.toastr.error('Algunos archivos exceden el tamaño máximo permitido de 5MB', 'Error');
        return;
      }

      this.selectedFiles = files;
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      const ticketData = {
        ...this.contactForm.value,
        attachments: this.selectedFiles
      };

      this.contactService.submitTicket(ticketData).subscribe({
        next: (response) => {
          this.toastr.success('Tu ticket ha sido enviado correctamente', '¡Éxito!');
          this.contactForm.reset();
          this.selectedFiles = [];
          this.isSubmitting = false;
        },
        error: (error) => {
          this.toastr.error('Hubo un error al enviar tu ticket. Por favor, intenta nuevamente.', 'Error');
          this.isSubmitting = false;
          console.error('Error al enviar ticket:', error);
        }
      });
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
