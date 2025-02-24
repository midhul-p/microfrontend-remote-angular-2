import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'mf2-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'micro-frontend-2';
  chatHistory = signal<string[]>([]);
  message = signal<string>('');

  sayHello() {
    const msg = 'MF2: Hello from micro-frontend-2';
    this.chatHistory.set([...this.chatHistory(), msg]);
    window.dispatchEvent(new CustomEvent('mf2-message', { detail: msg }));
  }

  sendMessage() {
    if (this.message().trim()) {
      const msg = `MF2: ${this.message()}`;
      this.chatHistory.set([...this.chatHistory(), msg]);
      window.dispatchEvent(new CustomEvent('mf2-message', { detail: msg }));
      this.message.set(''); // Clear input after sending
    }
  }

  @HostListener('window:mf1-message', ['$event'])
  receiveMessage(event: any) {
    this.chatHistory.set([...this.chatHistory(), event.detail]);
  }

  showInput() {
    return this.chatHistory().length > 0;
  }
  
}
