import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './privacy.component.html',
  styles: [`
    :host ::ng-deep {
      .card-title {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 50px;
          height: 3px;
          border-radius: 2px;
        }
      }

      .video-container {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
        height: 0;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }

      .form-text {
        font-size: 1.1rem;
        color: #6c757d;
      }
    }
  `]
})
export class PrivacyComponent implements OnInit {
  videoId = 'ieJiLHOIBAw';
  safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://www.youtube.com/embed/${this.videoId}?rel=0`
  );

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // La URL ya está inicializada en la declaración de la propiedad
  }
}
