import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styles: [`
    :host ::ng-deep {
      .custom-accordion {
        .accordion-button {
          padding: 1.25rem;
          font-weight: 500;
          font-size: 1.1rem;
          border-radius: 0.25rem;
          background-color: #f8f9fa;
          
          &:not(.collapsed) {
            background-color: #f8f9fa;
            color: #0d6efd;
            box-shadow: none;
          }

          &:focus {
            box-shadow: none;
            border-color: rgba(0,0,0,.125);
          }
        }

        .accordion-body {
          padding: 1.25rem;
          background-color: #fff;
          border-radius: 0 0 0.25rem 0.25rem;
          font-size: 1rem;
          line-height: 1.6;
        }

        .accordion-item {
          background-color: transparent;
        }
      }
    }
  `]
})
export class FaqComponent {
  // Datos de ejemplo para el acordeón
  faqItems = [
    {
      id: 'panel-1',
      title: '¿Qué es la facturación electrónica?',
      content: 'La facturación electrónica es un sistema que permite generar, transmitir y almacenar facturas en formato digital, cumpliendo con los requisitos legales y fiscales establecidos. Este sistema facilita la gestión de documentos fiscales y mejora la eficiencia en los procesos administrativos.'
    },
    {
      id: 'panel-2',
      title: '¿Cómo puedo acceder al sistema de facturación?',
      content: 'Para acceder al sistema, necesitas tener una cuenta registrada. Puedes crear una cuenta nueva o iniciar sesión si ya tienes una existente. El proceso de registro es simple y solo requiere información básica de tu empresa.'
    },
    {
      id: 'panel-3',
      title: '¿Qué documentos necesito para facturar?',
      content: 'Necesitarás tener a mano la información del cliente, los detalles del servicio o producto, y los datos fiscales correspondientes para generar la factura correctamente. También es importante contar con tu certificado de firma electrónica vigente.'
    },
    {
      id: 'panel-4',
      title: '¿Cómo puedo cancelar una factura?',
      content: 'Para cancelar una factura, debes acceder al sistema, buscar la factura en cuestión y seleccionar la opción de cancelación. Es importante tener en cuenta que solo se pueden cancelar facturas dentro de los plazos establecidos por la autoridad fiscal.'
    },
    {
      id: 'panel-5',
      title: '¿Qué es el CFDI y para qué sirve?',
      content: 'El CFDI (Comprobante Fiscal Digital por Internet) es el documento electrónico que cumple con los requisitos del SAT. Sirve como comprobante de las operaciones comerciales y es obligatorio para la mayoría de las transacciones.'
    },
    {
      id: 'panel-6',
      title: '¿Cómo puedo obtener mi certificado de firma electrónica?',
      content: 'El certificado de firma electrónica se obtiene a través del SAT. Debes agendar una cita en el portal del SAT, presentar la documentación requerida y seguir el proceso de validación. Este certificado es esencial para la facturación electrónica.'
    },
    {
      id: 'panel-7',
      title: '¿Qué tipos de CFDI puedo emitir?',
      content: 'Puedes emitir diferentes tipos de CFDI según la operación: ingresos, egresos, nómina, pagos, etc. Cada tipo tiene sus propias características y requisitos específicos que debes cumplir al emitirlos.'
    },
    {
      id: 'panel-8',
      title: '¿Cómo puedo consultar el estado de mis facturas?',
      content: 'Puedes consultar el estado de tus facturas directamente en el sistema. La plataforma te permite filtrar por fecha, cliente, estado y otros criterios para encontrar fácilmente la información que necesitas.'
    },
    {
      id: 'panel-9',
      title: '¿Qué debo hacer si tengo problemas técnicos?',
      content: 'Si experimentas problemas técnicos, puedes contactar a nuestro equipo de soporte a través del chat en línea, correo electrónico o teléfono. Nuestro equipo está disponible para ayudarte a resolver cualquier inconveniente.'
    },
    {
      id: 'panel-10',
      title: '¿Cómo puedo configurar mi perfil de empresa?',
      content: 'Para configurar tu perfil de empresa, accede a la sección de configuración en el sistema. Allí podrás actualizar la información de tu empresa, configurar preferencias de facturación y personalizar otros aspectos del sistema.'
    }
  ];
}
