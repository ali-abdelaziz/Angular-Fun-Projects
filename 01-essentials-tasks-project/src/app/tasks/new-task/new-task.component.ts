import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { type NewTaskData } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string;
  @Output() close = new EventEmitter<void>();
  // enteredTitle = signal('');
  enteredTitle = '';
  // enteredSummary = signal('');
  enteredSummary = '';
  // enteredDate = signal('');
  enteredDate = '';
  private tasksService = inject(TasksService);

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    this.tasksService.addTask(
      {
        // title: this.enteredTitle(),
        title: this.enteredTitle,
        // summary: this.enteredSummary(),
        summary: this.enteredSummary,
        // date: this.enteredDate(),
        date: this.enteredDate,
      },
      this.userId
    );
    this.close.emit();
  }
}
