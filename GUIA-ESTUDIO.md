# 📚 Guía de Estudio - Angular 20 Avanzado (1 Semana)

> **Proyecto**: NgHomePlanner - Kanban Board Application  
> **Stack Final**: Angular 20 + ASP.NET Core 9.0 Web API + Docker + Ubuntu Server  
> **Duración**: 7 días

---

## 🎯 Objetivos de Aprendizaje

- ✅ Dominar Signals, Computed y Effects en Angular 20
- ✅ Implementar NGRX Signal Store para state management
- ✅ Sistema de autenticación completo (JWT + Google OAuth)
- ✅ Guards de rutas y protección de endpoints
- ✅ Configurar microfrontends con Module Federation
- ✅ Preparar deployment con Docker y ASP.NET Core

---

## 📅 DÍA 1: Fundamentos de Signals

### 🎓 Teoría (2 horas)
- [✅] Leer documentación oficial: [Angular Signals](https://angular.dev/guide/signals)
- [✅] Entender la diferencia entre Signals y RxJS Observables
- [✅] Conceptos clave:
  - `signal()` - crear señales mutables
  - `.set()` y `.update()` - modificar valores
  - Reactive context y automatic tracking
  - Ventajas: menos boilerplate, mejor performance, tree-shakeable

### 💻 Práctica en NgHomePlanner (3 horas)
- [✅] **Tarea 1.1**: Refactorizar `draggable-table.ts` para usar Signals
  ```typescript
  // Antes: arrays normales
  todo: Task[] = [...]
  
  // Después: usar signals
  todo = signal<Task[]>([...]);
  doing = signal<Task[]>([...]);
  done = signal<Task[]>([...]);
  ```

- [✅] **Tarea 1.2**: Actualizar el template para usar signals con `()`
  ```html
  @for (task of todo(); track task.id) { ... }
  ```

- [✅] **Tarea 1.3**: Modificar `drop()` para usar `.update()`
  ```typescript
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      this.todo.update(tasks => {
        moveItemInArray(tasks, event.previousIndex, event.currentIndex);
        return [...tasks];
      });
    }
  }
  ```

### 📝 Checkpoint del Día
- [✅] Todas las listas del Kanban usan Signals
- [✅] El drag & drop funciona correctamente
- [ ] Commit: `feat: migrate kanban to signals`

---

## 📅 DÍA 2: Computed Signals y Effects

### 🎓 Teoría (2 horas)
- [✅] Estudiar `computed()` - signals derivados
- [✅] Entender `effect()` - side effects reactivos
- [✅] Leer sobre: [Signals Deep Dive](https://blog.angular.dev/angular-v16-is-here-4d7a28ec680d)
- [✅] Lazy evaluation y memoization

### 💻 Práctica en NgHomePlanner (3-4 horas)
- [✅] **Tarea 2.1**: Crear computed signals para estadísticas del Kanban
  ```typescript
  totalTasks = computed(() => 
    this.todo().length + this.doing().length + this.done().length
  );
  
  completionRate = computed(() => 
    this.totalTasks() > 0 
      ? (this.done().length / this.totalTasks() * 100).toFixed(1)
      : 0
  );
  
  tasksInProgress = computed(() => this.doing().length);
  ```

- [ ] **Tarea 2.2**: Crear componente `KanbanStats` para mostrar estadísticas
  ```bash
  ng generate component shared/components/kanban-stats --standalone --change-detection OnPush --inline-template
  ```
  - Mostrar: Total tareas, % completadas, Tareas en progreso
  - Usar Tailwind para crear cards con las métricas

- [ ] **Tarea 2.3**: Implementar effect para persistencia en localStorage
  ```typescript
  constructor() {
    effect(() => {
      localStorage.setItem('kanban-todo', JSON.stringify(this.todo()));
      localStorage.setItem('kanban-doing', JSON.stringify(this.doing()));
      localStorage.setItem('kanban-done', JSON.stringify(this.done()));
    });
  }
  ```

- [ ] **Tarea 2.4**: Cargar datos desde localStorage en `ngOnInit()`

### 📝 Checkpoint del Día
- [ ] Dashboard muestra estadísticas en tiempo real
- [ ] Los datos persisten al recargar la página
- [ ] Commit: `feat: add computed stats and localStorage persistence`

---

## 📅 DÍA 3: NGRX SignalStore - Introducción

### 🎓 Teoría (2-3 horas)
- [ ] Documentación oficial: [NGRX SignalStore](https://ngrx.io/guide/signals)
- [ ] Instalación: `npm install @ngrx/signals`
- [ ] Conceptos fundamentales:
  - `signalStore()` - crear stores
  - `withState()` - definir estado inicial
  - `withMethods()` - acciones/mutaciones
  - `withComputed()` - selectors derivados
  - `withHooks()` - lifecycle hooks

### 💻 Práctica en NgHomePlanner (3 horas)
- [ ] **Tarea 3.1**: Instalar NGRX Signals
  ```bash
  npm install @ngrx/signals
  ```

- [ ] **Tarea 3.2**: Crear `TaskStore` en `src/app/shared/stores/task.store.ts`
  ```typescript
  import { signalStore, withState, withMethods, withComputed } from '@ngrx/signals';
  import { Task, TaskStatus } from '@shared/interfaces';
  
  interface TaskState {
    todo: Task[];
    doing: Task[];
    done: Task[];
  }
  
  const initialState: TaskState = {
    todo: [],
    doing: [],
    done: []
  };
  
  export const TaskStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((state) => ({
      totalTasks: computed(() => 
        state.todo().length + state.doing().length + state.done().length
      ),
      completionRate: computed(() => {
        const total = state.todo().length + state.doing().length + state.done().length;
        return total > 0 ? (state.done().length / total * 100) : 0;
      })
    })),
    withMethods((store) => ({
      // Implementar métodos mañana
    }))
  );
  ```

- [ ] **Tarea 3.3**: Crear `index.ts` en stores: `export * from './task.store';`

- [ ] **Tarea 3.4**: Actualizar `tsconfig.json` con path alias
  ```json
  "@stores/*": ["app/shared/stores/*"],
  "@services/*": ["app/shared/services/*"],
  "@guards/*": ["app/shared/guards/*"],
  "@interceptors/*": ["app/shared/interceptors/*"]
  ```

- [ ] **Tarea 3.5**: Crear `AuthStore` básico en `src/app/shared/stores/auth.store.ts`
  ```typescript
  import { signalStore, withState, withMethods, withComputed } from '@ngrx/signals';
  
  interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }
  
  const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false
  };
  
  export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((state) => ({
      isLoggedIn: computed(() => state.isAuthenticated() && !!state.token())
    })),
    withMethods((store) => ({
      // Métodos de autenticación mañana
    }))
  );
  ```

- [ ] **Tarea 3.6**: Crear interfaz `User` en `src/app/shared/interfaces/user.interface.ts`
  ```typescript
  export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    provider?: 'local' | 'google';
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    user: User;
    token: string;
    refreshToken?: string;
  }
  ```

### 📝 Checkpoint del Día
- [ ] NGRX Signals instalado correctamente
- [ ] TaskStore creado con estado inicial y computed
- [ ] AuthStore básico creado
- [ ] Interfaces de usuario definidas
- [ ] Commit: `feat: setup NGRX SignalStore with AuthStore`

---

## 📅 DÍA 4: NGRX SignalStore - Métodos y Hooks

### 🎓 Teoría (1-2 horas)
- [ ] Patrones de actualización inmutable en SignalStore
- [ ] `patchState()` para actualizaciones
- [ ] Integración con servicios HTTP (preparar para ASP.NET Core)

### 💻 Práctica en NgHomePlanner (4-5 horas)
- [ ] **Tarea 4.1**: Implementar métodos en `TaskStore`
  ```typescript
  withMethods((store, tasksService = inject(TasksService)) => ({
    loadTasks(): void {
      // Por ahora desde localStorage, después desde API
      const saved = localStorage.getItem('kanban-tasks');
      if (saved) {
        const data = JSON.parse(saved);
        patchState(store, data);
      }
    },
    
    moveTask(task: Task, newStatus: TaskStatus): void {
      const removeFromColumn = (tasks: Task[]) => 
        tasks.filter(t => t.id !== task.id);
      
      const updatedTask = { ...task, status: newStatus };
      
      patchState(store, (state) => ({
        todo: newStatus === 'TODO' 
          ? [...removeFromColumn(state.todo), updatedTask]
          : removeFromColumn(state.todo),
        doing: newStatus === 'DOING'
          ? [...removeFromColumn(state.doing), updatedTask]
          : removeFromColumn(state.doing),
        done: newStatus === 'DONE'
          ? [...removeFromColumn(state.done), updatedTask]
          : removeFromColumn(state.done)
      }));
      
      this.saveTasks();
    },
    
    addTask(task: Task): void {
      patchState(store, (state) => ({
        todo: [...state.todo, task]
      }));
      this.saveTasks();
    },
    
    deleteTask(taskId: string): void {
      patchState(store, (state) => ({
        todo: state.todo.filter(t => t.id !== taskId),
        doing: state.doing.filter(t => t.id !== taskId),
        done: state.done.filter(t => t.id !== taskId)
      }));
      this.saveTasks();
    },
    
    saveTasks(): void {
      localStorage.setItem('kanban-tasks', JSON.stringify({
        todo: store.todo(),
        doing: store.doing(),
        done: store.done()
      }));
    }
  })),
  
  withHooks({
    onInit(store) {
      store.loadTasks();
    }
  })
  ```

- [ ] **Tarea 4.2**: Refactorizar `draggable-table.ts` para usar TaskStore
  ```typescript
  import { TaskStore } from '@stores/task.store';
  
  export class DraggableTable {
    readonly store = inject(TaskStore);
    
    drop(event: CdkDragDrop<Task[]>) {
      const task = event.item.data;
      const newStatus = this.getStatusFromContainer(event.container.id);
      this.store.moveTask(task, newStatus);
    }
  }
  ```

- [ ] **Tarea 4.3**: Actualizar templates para usar store
  ```html
  @for (task of store.todo(); track task.id) { ... }
  ```

- [ ] **Tarea 4.4**: Crear componente `AddTaskForm` con formulario reactivo
  - Usar `FormBuilder` y `Validators`
  - Al submit, llamar `store.addTask()`

- [ ] **Tarea 4.5**: Crear `AuthService` en `src/app/shared/services/auth.service.ts`
  ```typescript
  import { HttpClient } from '@angular/common/http';
  import { Injectable, inject } from '@angular/core';
  import { Observable } from 'rxjs';
  import { LoginRequest, LoginResponse, User } from '@shared/interfaces';
  import { environment } from '@environments/environment';
  
  @Injectable({ providedIn: 'root' })
  export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;
    
    login(credentials: LoginRequest): Observable<LoginResponse> {
      return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials);
    }
    
    loginWithGoogle(googleToken: string): Observable<LoginResponse> {
      return this.http.post<LoginResponse>(`${this.apiUrl}/auth/google`, { token: googleToken });
    }
    
    register(data: { email: string; password: string; name: string }): Observable<LoginResponse> {
      return this.http.post<LoginResponse>(`${this.apiUrl}/auth/register`, data);
    }
    
    logout(): Observable<void> {
      return this.http.post<void>(`${this.apiUrl}/auth/logout`, {});
    }
    
    refreshToken(): Observable<{ token: string }> {
      return this.http.post<{ token: string }>(`${this.apiUrl}/auth/refresh`, {});
    }
    
    getCurrentUser(): Observable<User> {
      return this.http.get<User>(`${this.apiUrl}/auth/me`);
    }
  }
  ```

- [ ] **Tarea 4.6**: Implementar métodos en `AuthStore`
  ```typescript
  withMethods((store, authService = inject(AuthService)) => ({
    login(credentials: LoginRequest): void {
      patchState(store, { isLoading: true });
      authService.login(credentials).subscribe({
        next: (response) => {
          this.setAuth(response);
          patchState(store, { isLoading: false });
        },
        error: () => patchState(store, { isLoading: false })
      });
    },
    
    loginWithGoogle(token: string): void {
      patchState(store, { isLoading: true });
      authService.loginWithGoogle(token).subscribe({
        next: (response) => {
          this.setAuth(response);
          patchState(store, { isLoading: false });
        },
        error: () => patchState(store, { isLoading: false })
      });
    },
    
    setAuth(response: LoginResponse): void {
      // Guardar token en localStorage
      localStorage.setItem('auth_token', response.token);
      if (response.refreshToken) {
        localStorage.setItem('refresh_token', response.refreshToken);
      }
      
      patchState(store, {
        user: response.user,
        token: response.token,
        isAuthenticated: true
      });
    },
    
    logout(): void {
      authService.logout().subscribe();
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      
      patchState(store, {
        user: null,
        token: null,
        isAuthenticated: false
      });
    },
    
    loadAuthFromStorage(): void {
      const token = localStorage.getItem('auth_token');
      if (token) {
        patchState(store, { token, isLoading: true });
        authService.getCurrentUser().subscribe({
          next: (user) => {
            patchState(store, {
              user,
              isAuthenticated: true,
              isLoading: false
            });
          },
          error: () => {
            this.logout();
            patchState(store, { isLoading: false });
          }
        });
      }
    }
  })),
  
  withHooks({
    onInit(store) {
      store.loadAuthFromStorage();
    }
  })
  ```

- [ ] **Tarea 4.7**: Crear HTTP Interceptor para agregar token
  ```bash
  ng generate interceptor shared/interceptors/auth --functional
  ```
  ```typescript
  import { HttpInterceptorFn } from '@angular/common/http';
  import { inject } from '@angular/core';
  import { AuthStore } from '@stores/auth.store';
  
  export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authStore = inject(AuthStore);
    const token = authStore.token();
    
    if (token && !req.url.includes('/auth/')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next(req);
  };
  ```

- [ ] **Tarea 4.8**: Registrar interceptor en `app.config.ts`
  ```typescript
  import { provideHttpClient, withInterceptors } from '@angular/common/http';
  import { authInterceptor } from '@interceptors/auth.interceptor';
  
  export const appConfig: ApplicationConfig = {
    providers: [
      provideHttpClient(withInterceptors([authInterceptor])),
      // ... otros providers
    ]
  };
  ```

### 📝 Checkpoint del Día
- [ ] Toda la lógica del Kanban usa TaskStore
- [ ] Se pueden agregar y eliminar tareas
- [ ] AuthStore completo con login/logout
- [ ] AuthService implementado
- [ ] Interceptor agrega token automáticamente
- [ ] Commit: `feat: implement full auth system with stores and interceptors`

---

## 📅 DÍA 5: Guards, Login/Register y Google OAuth

### 🎓 Teoría (2 horas)
- [ ] Angular Guards: [Route Guards](https://angular.dev/guide/routing/common-router-tasks#preventing-unauthorized-access)
- [ ] Functional Guards en Angular 20
- [ ] Google OAuth: [Google Sign-In](https://developers.google.com/identity/gsi/web/guides/overview)
- [ ] JWT Token refresh strategies

### 💻 Práctica en NgHomePlanner (5 horas)
- [ ] **Tarea 5.1**: Crear Auth Guard
  ```bash
  ng generate guard shared/guards/auth --functional
  ```
  ```typescript
  import { inject } from '@angular/core';
  import { Router } from '@angular/router';
  import { AuthStore } from '@stores/auth.store';
  
  export const authGuard = () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);
    
    if (authStore.isLoggedIn()) {
      return true;
    }
    
    router.navigate(['/login']);
    return false;
  };
  ```

- [ ] **Tarea 5.2**: Crear Guest Guard (para login/register)
  ```bash
  ng generate guard shared/guards/guest --functional
  ```
  ```typescript
  export const guestGuard = () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);
    
    if (!authStore.isLoggedIn()) {
      return true;
    }
    
    router.navigate(['/dashboard']);
    return false;
  };
  ```

- [ ] **Tarea 5.3**: Actualizar rutas en `app.routes.ts`
  ```typescript
  import { authGuard } from '@guards/auth.guard';
  import { guestGuard } from '@guards/guest.guard';
  
  export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: '',
      component: PrivateArea,
      canMatch: [authGuard],
      children: [
        {
          path: 'dashboard',
          loadComponent: () => import('@features/dashboard/dashboard-page/dashboard-page')
        }
      ]
    },
    {
      path: '',
      component: AuthArea,
      canMatch: [guestGuard],
      children: [
        {
          path: 'login',
          loadComponent: () => import('@features/auth/login-page/login-page')
        },
        {
          path: 'register',
          loadComponent: () => import('@features/auth/register-page/register-page')
        }
      ]
    }
  ];
  ```

- [ ] **Tarea 5.4**: Crear componente Login
  ```bash
  ng generate component features/auth/login-page --standalone --change-detection OnPush --skip-tests
  ```
  ```typescript
  import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
  import { AuthStore } from '@stores/auth.store';
  import { Router } from '@angular/router';
  
  export default class LoginPage {
    private fb = inject(FormBuilder);
    private authStore = inject(AuthStore);
    private router = inject(Router);
    
    loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
    onSubmit() {
      if (this.loginForm.valid) {
        this.authStore.login(this.loginForm.value as LoginRequest);
        this.router.navigate(['/dashboard']);
      }
    }
    
    onGoogleLogin() {
      // Implementar en siguiente tarea
    }
  }
  ```

- [ ] **Tarea 5.5**: Instalar Google Sign-In
  ```bash
  npm install @abacritt/angularx-social-login
  ```

- [ ] **Tarea 5.6**: Configurar Google OAuth en `app.config.ts`
  ```typescript
  import { SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
  
  export const appConfig: ApplicationConfig = {
    providers: [
      {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider('YOUR_GOOGLE_CLIENT_ID')
            }
          ]
        } as SocialAuthServiceConfig
      },
      // ... otros providers
    ]
  };
  ```

- [ ] **Tarea 5.7**: Implementar Google Login en LoginPage
  ```typescript
  import { SocialAuthService } from '@abacritt/angularx-social-login';
  
  private socialAuthService = inject(SocialAuthService);
  
  onGoogleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      this.authStore.loginWithGoogle(user.idToken);
      this.router.navigate(['/dashboard']);
    });
  }
  ```

- [ ] **Tarea 5.8**: Crear componente Register (similar a Login)
  ```bash
  ng generate component features/auth/register-page --standalone --change-detection OnPush --skip-tests
  ```
  - Agregar campo `name`
  - Validación de confirmación de contraseña
  - Link a página de login

- [ ] **Tarea 5.9**: Actualizar `custom-header.ts` para mostrar usuario y logout
  ```typescript
  readonly authStore = inject(AuthStore);
  
  onLogout() {
    this.authStore.logout();
    this.router.navigate(['/login']);
  }
  ```

### 📝 Checkpoint del Día
- [ ] Guards protegen rutas correctamente
- [ ] Login y Register funcionan
- [ ] Google OAuth implementado
- [ ] Token se guarda y persiste
- [ ] Header muestra usuario logueado
- [ ] Commit: `feat: implement auth guards and Google OAuth login`

---

## 📅 DÍA 6: Module Federation - Setup

### 🎓 Teoría (2-3 horas)
- [ ] Conceptos de microfrontends: [Micro Frontends](https://martinfowler.com/articles/micro-frontends.html)
- [ ] Module Federation: [Official Guide](https://module-federation.io/)
- [ ] Arquitectura:
  - **Host/Shell**: aplicación principal que carga remote modules
  - **Remote**: módulos independientes expuestos
- [ ] Casos de uso: múltiples equipos, deploy independiente, lazy loading

### 💻 Práctica en NgHomePlanner (3-4 horas)
- [ ] **Tarea 6.1**: Planificar arquitectura de microfrontends
  ```
  ng-home-planner (Shell/Host)
  ├── dashboard-remote (Remote 1) - Dashboard y Kanban
  ├── auth-remote (Remote 2) - Login/Register (opcional)
  └── reports-remote (Remote 3) - Reportes y Analytics (futuro)
  ```
  **Nota**: El auth puede quedarse en el host por seguridad

- [ ] **Tarea 6.2**: Instalar Module Federation
  ```bash
  npm install @angular-architects/module-federation
  ng generate @angular-architects/module-federation:init --project ng-home-planner --port 4200 --type host
  ```

- [ ] **Tarea 6.3**: Crear proyecto remote para Dashboard
  ```bash
  # En carpeta padre
  ng new dashboard-remote --routing --style=scss --standalone
  cd dashboard-remote
  npm install @angular-architects/module-federation @angular/cdk
  ng generate @angular-architects/module-federation:init --project dashboard-remote --port 4201 --type remote
  ```

- [ ] **Tarea 6.4**: Configurar `webpack.config.js` en el host
  ```javascript
  const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
  
  module.exports = withModuleFederationPlugin({
    remotes: {
      "dashboardRemote": "http://localhost:4201/remoteEntry.js",
    },
    shared: {
      ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    },
  });
  ```

- [ ] **Tarea 6.5**: Configurar `webpack.config.js` en dashboard-remote
  ```javascript
  module.exports = withModuleFederationPlugin({
    name: 'dashboardRemote',
    exposes: {
      './DashboardPage': './src/app/dashboard/dashboard-page.ts',
    },
    shared: {
      ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    },
  });
  ```

### 📝 Checkpoint del Día
- [ ] Module Federation configurado en ambos proyectos
- [ ] Ambos proyectos compilan sin errores
- [ ] Commit: `feat: setup module federation architecture`

---

## 📅 DÍA 7: Module Federation - Integración + Docker

### 🎓 Teoría (1 hora)
- [ ] Routing con microfrontends
- [ ] Compartir servicios y estados entre remotes
- [ ] Error handling y fallbacks

### 💻 Práctica en NgHomePlanner (3-4 horas)
- [ ] **Tarea 7.1**: Mover dashboard al remote
  - Copiar `features/dashboard` a `dashboard-remote/src/app/`
  - Copiar `shared/components` necesarios (draggable-*)
  - Copiar `shared/stores/task.store.ts`

- [ ] **Tarea 7.2**: Configurar lazy loading en `app.routes.ts` del host
  ```typescript
  import { loadRemoteModule } from '@angular-architects/module-federation';
  import { authGuard } from '@guards/auth.guard';
  
  export const routes: Routes = [
    {
      path: 'dashboard',
      canMatch: [authGuard],
      loadComponent: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: 'http://localhost:4201/remoteEntry.js',
          exposedModule: './DashboardPage'
        }).then(m => m.default)
    }
  ];
  ```

- [ ] **Tarea 7.3**: Compartir AuthStore entre host y remote
  - Configurar `AuthStore` como singleton en webpack shared
  - Inyectar AuthStore en dashboard-remote para verificar autenticación

- [ ] **Tarea 7.4**: Testear comunicación entre host y remote
  - Iniciar host: `npm start` (puerto 4200)
  - Iniciar remote: `cd dashboard-remote && npm start` (puerto 4201)
  - Login y luego navegar a dashboard
  - Verificar que drag & drop funciona

### 💻 Preparación Docker (2-3 horas)

- [ ] **Tarea 7.5**: Crear Dockerfile para el host


  ```dockerfile
  # ng-home-planner/Dockerfile
  FROM node:20-alpine AS build
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  COPY . .
  RUN npm run build
  
  FROM nginx:alpine
  COPY --from=build /app/dist/ng-home-planner/browser /usr/share/nginx/html
  COPY nginx.conf /etc/nginx/nginx.conf
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
  ```

- [ ] **Tarea 7.6**: Crear `nginx.conf`
  ```nginx
  server {
    listen 80;
    location / {
      root /usr/share/nginx/html;
      try_files $uri $uri/ /index.html;
    }
    location /api/ {
      proxy_pass http://api:8080/;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  }
  ```

- [ ] **Tarea 7.7**: Crear `docker-compose.yml` (preparar para integración con ASP.NET)
  ```yaml
  version: '3.8'
  
  services:
    frontend:
      build:
        context: .
        dockerfile: Dockerfile
      ports:
        - "80:80"
      depends_on:
        - api
      networks:
        - app-network
    
    # Preparar para ASP.NET Core API
    api:
      image: mcr.microsoft.com/dotnet/aspnet:9.0
      # build: ./api
      ports:
        - "8080:8080"
      environment:
        - ASPNETCORE_ENVIRONMENT=Production
        - ASPNETCORE_URLS=http://+:8080
      networks:
        - app-network
    
    # Opcional: PostgreSQL/SQL Server
    db:
      image: postgres:16-alpine
      environment:
        POSTGRES_PASSWORD: password
        POSTGRES_DB: homeplanner
      volumes:
        - db-data:/var/lib/postgresql/data
      networks:
        - app-network
  
  networks:
    app-network:
      driver: bridge
  
  volumes:
    db-data:
  ```

- [ ] **Tarea 7.8**: Actualizar `ApiService` con endpoints protegidos (ya creado en Día 4)
  ```typescript
  // El AuthInterceptor ya agrega el token automáticamente
  @Injectable({ providedIn: 'root' })
  export class TaskApiService {
    private apiUrl = environment.apiUrl;
    http = inject(HttpClient);
    
    getTasks() {
      return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
    }
    
    createTask(task: Task) {
      return this.http.post<Task>(`${this.apiUrl}/tasks`, task);
    }
    
    updateTask(id: string, task: Partial<Task>) {
      return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, task);
    }
    
    deleteTask(id: string) {
      return this.http.delete(`${this.apiUrl}/tasks/${id}`);
    }
  }
  ```

- [ ] **Tarea 7.9**: Actualizar `environments/environment.ts`
  ```typescript
  export const environment = {
    production: false,
    apiUrl: 'http://localhost:5000/api',
    googleClientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
  };
  ```
  ```typescript
  // environment.production.ts
  export const environment = {
    production: true,
    apiUrl: 'https://your-domain.com/api',
    googleClientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
  };
  ```

- [ ] **Tarea 7.10**: Actualizar `TaskStore` para usar HTTP
  - Reemplazar localStorage por llamadas a `TaskApiService`
  - Implementar `rxMethod` de NGRX Signals para efectos async
  - Mantener localStorage como fallback offline

- [ ] **Tarea 7.11**: Testear build de producción
  ```bash
  npm run build
  docker build -t ng-home-planner .
  docker run -p 8081:80 ng-home-planner
  ```

### 📝 Checkpoint del Día
- [ ] Dashboard funciona como microfrontend
- [ ] AuthStore compartido entre host y remote
- [ ] Dockerfile funcional para Angular
- [ ] docker-compose preparado para full-stack
- [ ] API service listo para integrar con ASP.NET Core
- [ ] Commit: `feat: integrate microfrontend and Docker setup`

---

## 🎯 Próximos Pasos (Post-Semana 1)

### Semana 2: Backend con ASP.NET Core 9.0
- [ ] Crear Web API con Entity Framework Core
- [ ] **Implementar JWT Authentication**
  - Configurar JWT Bearer token
  - Endpoints: `/api/auth/login`, `/api/auth/register`, `/api/auth/refresh`
  - Hash de contraseñas con BCrypt
- [ ] **Implementar Google OAuth en backend**
  - Verificar Google tokens
  - Crear/vincular usuarios de Google
- [ ] Implementar endpoints CRUD para Tasks (con autorización)
- [ ] Middleware de autenticación y autorización
- [ ] Base de datos (SQL Server / PostgreSQL)
  - Tabla Users (Id, Email, PasswordHash, Name, Provider)
  - Tabla Tasks (con UserId foreign key)
  - Tabla RefreshTokens
- [ ] Dockerfile para ASP.NET Core
- [ ] Integrar completamente con Angular

### Semana 3: Deployment en Ubuntu Server
- [ ] Configurar Ubuntu Server (VPS o local VM)
- [ ] Instalar Docker y Docker Compose
- [ ] Setup de dominio y SSL con Let's Encrypt
- [ ] CI/CD con GitHub Actions
- [ ] Monitoring con Prometheus/Grafana

---

## 📚 Recursos Adicionales

### Angular Signals
- [Angular Signals RFC](https://github.com/angular/angular/discussions/49090)
- [Angular v17 Signal Inputs](https://blog.angular.dev/introducing-angular-v17-4d7033312e4b)
- [Why Signals?](https://www.youtube.com/watch?v=oqYQG7QMdzw) - Angular Team Video

### NGRX SignalStore
- [NGRX Signals Documentation](https://ngrx.io/guide/signals)
- [NGRX SignalStore Tutorial](https://offering.solutions/blog/articles/2024/01/14/ngrx-signal-store-getting-started/)
- [GitHub Examples](https://github.com/ngrx/platform/tree/main/modules/signals)

### Autenticación y Seguridad
- [Angular Authentication Guide](https://angular.dev/guide/security)
- [JWT.io - Introduction to JWT](https://jwt.io/introduction)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Angular Social Login](https://github.com/abacritt/angularx-social-login)
- [ASP.NET Core JWT Authentication](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/)
- [OWASP Security Best Practices](https://owasp.org/www-project-top-ten/)

### Module Federation
- [Module Federation Official](https://module-federation.io/)
- [Angular Architects MF Plugin](https://github.com/angular-architects/module-federation-plugin)
- [Micro Frontend Architecture](https://www.angulararchitects.io/en/blog/the-microfrontend-revolution-part-2-module-federation-with-angular/)

### Docker & Deployment
- [Angular Docker Production](https://docs.docker.com/samples/angular/)
- [ASP.NET Core Docker](https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images)
- [Docker Compose for Full Stack](https://docs.docker.com/compose/gettingstarted/)

---

## ✅ Checklist Final

Al finalizar la semana deberías tener:
- [x] Kanban Board usando Signals y Computed
- [x] State management con NGRX SignalStore (TaskStore + AuthStore)
- [x] **Sistema de autenticación completo**
  - [x] Login/Register con formularios reactivos
  - [x] Google OAuth integrado
  - [x] JWT tokens almacenados en localStorage
  - [x] AuthInterceptor para agregar tokens
  - [x] Guards protegiendo rutas
- [x] Dashboard como microfrontend con Module Federation
- [x] Configuración Docker lista para deployment
- [x] Servicios API preparados para integrar con ASP.NET Core
- [x] Conocimiento sólido para continuar con backend y deployment

---

**¡Buena suerte con tu aprendizaje! 🚀**

_Última actualización: Enero 2026_
