import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  private messagesService = inject(MessagesService);
  messages$ = this.messagesService.messages$;

  // ngOnInit() {
  //   const subscription = this.messagesService.messages$.subscribe((messages) => {
  //     this.messages = messages;
  //     // trigger change detection manually
  //     this.cdRef.markForCheck();
  //   });
  //   // unsubscribe when component is destroyed
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
