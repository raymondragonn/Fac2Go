import { Component, ViewEncapsulation } from '@angular/core'
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import { comments, lightbox } from '../../data'
import { CommonModule } from '@angular/common'
import { credits, currentYear } from '@/app/common/constants'
import { QuillEditorComponent } from 'ngx-quill'
import Editor from 'quill/core/editor'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-personal-detail',
  imports: [
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    CommonModule,
    QuillEditorComponent,
    FormsModule
  ],
  templateUrl: './personal-detail.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class PersonalDetailComponent {
  lightboxData = lightbox
  currentYear = currentYear
  commentData = comments
  credits = credits
  
  editor!: Editor

  content: string = ` <div id="editor">
                    <p>Hola E4!</p>
                    <p>Tengo un problema con el <strong>sistema de facturación</strong>.</p>
                    <p>Ocupo de su apoyo...</p>
                </div>`
  public model = {
    editorData: this.content,
  }

  editorConfig = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  }

  editorConfigBubble = {
    toolbar: [
      ['bold', 'italic', 'link', 'blockquote'],
      [{ header: 1 }, { header: 2 }],
    ],
  }
}
