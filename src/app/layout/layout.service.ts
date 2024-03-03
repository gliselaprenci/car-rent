import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  #sidebarOpen: WritableSignal<boolean> = signal<boolean>(true);
  #isAdmin: WritableSignal<boolean> = signal<boolean>(true);

  get sidebarOpen(): Signal<boolean> {
    return this.#sidebarOpen.asReadonly();
  }

  set sidebarOpen(sidebarOpen: boolean) {
    this.#sidebarOpen.set(sidebarOpen);
  }

  get isAdmin(): Signal<boolean> {
    return this.#isAdmin.asReadonly();
  }

  set isAdmin(isAdmin: boolean) {
    this.#isAdmin.set(isAdmin);
  }
}
