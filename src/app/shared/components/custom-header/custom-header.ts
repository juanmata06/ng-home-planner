import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-custom-header',
  imports: [],
  template: `
    <header>
      <nav class="p-2 flex justify-between items-center gap-4 bg-primary">
        <h1 class="font-bold text-white">
          {{ 'Home Planner' }}
        </h1>
        <img
          src="https://s1.ppllstatics.com/mujerhoy/www/multimedia/202502/11/media/cortadas/zuckeberg1-k7bF-U230828106152o7E-1248x1248@MujerHoy.jpg"
          alt="Foto de perfil"
          class="w-10 h-10 rounded-full object-cover"
        />
      </nav>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomHeader {
  userImage!: string;
  userName!: string;
}
