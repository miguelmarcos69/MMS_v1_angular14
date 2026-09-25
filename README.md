# MMS Bar Gril — App de gestión de comandas

Aplicación móvil (Ionic + Angular + Capacitor) para gestionar un bar/restaurante desde el móvil o la tablet: tomar comandas por mesa, pedidos para llevar y a domicilio, generar tickets, cobrar, mantener la carta y consultar estadísticas de ventas.

Los camareros de un mismo local trabajan en tiempo real: cuando uno guarda una comanda o cobra una mesa, el resto recibe una **notificación** y ve los datos actualizados.

> Proyecto final de DAW (2022). Este repositorio contiene el **frontend**. La API PHP (`/proyectoDAW/*.php`) y la base de datos están en un proyecto aparte.

---

## Funcionalidades

La app se organiza en 4 pestañas:

| Pestaña | Qué permite hacer |
| --- | --- |
| **Comandas** | Ver las mesas y su estado, añadir platos y bebidas a una mesa, anotar observaciones, crear pedidos **para llevar** y **a domicilio** (con búsqueda o alta de clientes), generar el **ticket** y marcarlo como **pagado**. |
| **Modificar carta** | Añadir platos y bebidas nuevos y modificar los existentes (precio, ingredientes, etc.). |
| **Datos usuario** | Ver los datos del usuario que ha iniciado sesión. |
| **Gestión** | Historial de mesas, estadísticas, gestión de clientes e ingredientes y, **solo para administradores**, alta y edición de usuarios y asignación de mesas a camareros. |

### Estadísticas

Con `chart.js` / `ng2-charts` se muestran:

- **Gráfico circular**: los 3 platos más vendidos.
- **Gráfico de barras**: ventas por día y por trabajador.
- **Gráfico de líneas**: facturación por día.

### Roles

- **admin**: acceso completo, incluida la gestión de usuarios y la asignación de mesas.
- **Resto de usuarios (camareros)**: comandas, carta, clientes, ingredientes, historial y estadísticas.

---

## Cómo funciona

```text
┌──────────────┐   HTTP (JSON)    ┌─────────────────────────┐
│  App Ionic   │ ───────────────► │  API PHP  /proyectoDAW  │ ──► Base de datos
│ (móvil/web)  │                  └─────────────────────────┘
│              │   Socket.IO      ┌─────────────────────────┐
│              │ ◄──────────────► │  server.js (Node, :5000)│ ◄──► otros dispositivos
└──────────────┘                  └─────────────────────────┘
```

1. **Login**: `LoginService` envía usuario y contraseña a `login.php`, que devuelve un **JWT**. El token se guarda en `localStorage`. Al arrancar, `checkToken()` comprueba si ha caducado con `@auth0/angular-jwt`: si sigue siendo válido, carga los datos del usuario y entra directamente en `/tabs/tab1`.
2. **Datos**: todas las operaciones (mesas, platos, bebidas, ingredientes, clientes, usuarios, historial…) son peticiones HTTP a los scripts PHP definidos en [`app-service.service.ts`](src/app/services/app-service.service.ts) y [`comandas.service.ts`](src/app/services/comandas.service.ts).
3. **Tiempo real**: [`socket.service.ts`](src/app/services/socket.service.ts) se conecta a `server.js`. Cada vez que se guarda una comanda, se actualiza un pedido o se cobra una mesa, la app emite el evento `default` con la acción (`comanda`, `llevar`, `domicilio`, `pagado`, `pagadoMesa`…). El servidor lo reenvía al resto de dispositivos de la sala `app`, que:
   - muestran una **notificación local** (`@capacitor/local-notifications`), y
   - recargan los datos de las mesas.
4. **Fechas**: se formatean con `date-fns` (`format`, `parseISO`) en el ticket, el historial y los formularios de usuarios.

---

## Tecnologías

- **Ionic 6** + **Angular 14** + **TypeScript 4.7**
- **Capacitor 4** (Android, notificaciones locales, háptica, teclado, status bar)
- **Socket.IO** (`ngx-socket-io` en el cliente; `express` + `socket.io` en `server.js`)
- **chart.js / ng2-charts** y **@swimlane/ngx-charts** para gráficos
- **@auth0/angular-jwt** para la sesión
- **date-fns** para fechas

---

## Estructura del proyecto

```text
src/app/
├── login/ · registro/         Pantallas de acceso
├── services/
│   ├── app-service.service.ts Endpoints de la API, usuario actual, toasts, utilidades
│   ├── comandas.service.ts    Endpoints de comandas y clientes
│   ├── login.service.ts       Login, JWT y logout
│   └── socket.service.ts      Conexión Socket.IO
├── shared/models/             Interfaces (User, UserResponse, Roles) y formulario base
├── tabs/                      Barra de pestañas y rutas
├── tab1/comandas/             Mesas, añadir productos, llevar, domicilio, ticket
├── tab2/mod-carta/            Añadir/modificar platos y bebidas
├── tab3/datos-usuar/          Datos del usuario
└── tab4/gestion/              Historial, estadísticas, usuarios, clientes,
                               ingredientes, asignar mesas, configuración
server.js                      Servidor Socket.IO (puerto 5000) + Express (puerto 3000)
android/                       Proyecto nativo Android generado por Capacitor
```

---

## Puesta en marcha

### Requisitos

- Node.js 16 (recomendado para Angular 14) y npm
- Ionic CLI: `npm i -g @ionic/cli`
- Android Studio (solo para compilar la app Android)
- La API PHP `proyectoDAW` desplegada y accesible

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar las URLs

| Qué | Dónde | Valor actual |
| --- | --- | --- |
| API PHP | `this.url` en [`app-service.service.ts`](src/app/services/app-service.service.ts) | `https://mmsbargril.website` |
| Servidor de sockets | `url` en el `super()` de [`socket.service.ts`](src/app/services/socket.service.ts) | `http://172.20.10.4:5000` |

> La IP del socket es la del equipo donde corre `server.js` dentro de la red local. Cámbiala por la tuya. Los dispositivos tienen que estar en la misma red.

### 3. Arrancar el servidor de sockets

```bash
npm install chalk@4   # server.js lo usa, pero no está en package.json
node server.js
```

### 4. Arrancar la app en el navegador

```bash
npm start        # o: ionic serve
```

Abre `http://localhost:4200` (o `:8100` con `ionic serve`).

### 5. Compilar para Android

```bash
ionic build
npx cap sync android
npx cap open android   # compilar/ejecutar desde Android Studio
```

---

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm start` | Servidor de desarrollo (`ng serve`) |
| `npm run build` | Compilación a `www/` |
| `npm test` | Tests unitarios (Karma + Jasmine) |
| `npm run lint` | ESLint |

---

## Notas

- Las URLs de la API y del socket están escritas directamente en el código. `environment.ts` tiene `serverSocket`, pero ahora mismo no se usa.
- Si al compilar aparece `Can't resolve 'date-fns'`, ejecuta `npm install` y reinicia `ng serve`.
