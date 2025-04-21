import { Component, Input } from '@angular/core';
import type { TaskType } from '../../dragula.component';
import { CommonModule } from '@angular/common';
import { SentenceCasePipe } from "../../../../../core/helpers/sentence-case.pipe";

@Component({
  selector: 'app-task-card',
  imports: [CommonModule, SentenceCasePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() item!: TaskType
}
