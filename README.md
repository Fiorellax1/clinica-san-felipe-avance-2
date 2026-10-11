# Sistema de Gestión de Citas Médicas - Clínica San Felipe

Proyecto académico del curso **Desarrollo Web Integrado**.

Este sistema permite gestionar usuarios, servicios médicos y citas mediante una arquitectura full stack compuesta por:

- Backend con Spring Boot
- Base de datos MySQL
- Frontend Angular
- Seguridad con JWT y roles
- Pruebas automatizadas
- Colección Postman para validación de endpoints

---

## 1. Tecnologías utilizadas

### Backend
- Java 17
- Spring Boot 3.3.5
- Spring Web
- Spring Data JPA
- Spring Security
- Bean Validation
- JWT
- Maven

### Base de datos
- MySQL
- H2 para pruebas automatizadas

### Frontend
- Angular
- TypeScript
- SASS

### Herramientas
- IntelliJ IDEA
- MySQL Workbench
- Postman
- Git
- GitHub

---

## 2. Arquitectura del proyecto

El backend utiliza una arquitectura por capas:

```text
Controller
   ↓
Service
   ↓
Repository
   ↓
JPA / Hibernate
   ↓
MySQL
```

Los principales módulos del backend son:

```text
auth
usuario
servicio
cita
config
security
exception
```

Cada módulo separa las responsabilidades de controlador, servicio, repositorio, entidades y DTOs.

---

## 3. Estructura del repositorio

```text
Proyecto-Desarrollo-Web-Integrado-main/
├── backend/
│   ├── src/
│   └── pom.xml
│
├── database/
│   └── script.sql
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── angular.json
│
├── postman/
│   └── colección de pruebas de API
│
├── .gitignore
└── README.md
```

---

## 4. Funcionalidades implementadas

### 4.1 Autenticación y usuarios

- Registro de pacientes
- Inicio de sesión
- Generación de token JWT
- Hash de contraseñas con BCrypt
- Consulta del perfil autenticado
- Gestión de usuarios por ADMINISTRADOR
- Roles:
    - ADMINISTRADOR
    - PACIENTE

### 4.2 Servicios médicos

- Listar servicios
- Buscar servicios por nombre
- Obtener servicio por ID
- Crear servicios
- Actualizar servicios
- Eliminar servicios
- Validación de nombre duplicado
- Validación de duración y precio
- Control de servicio activo/inactivo

### 4.3 Citas médicas

- Crear cita
- Listar citas
- Obtener cita por ID
- Reprogramar cita
- Cancelar cita
- Control de acceso por propietario
- Validación de fechas futuras
- Validación de servicios activos
- Prevención de citas duplicadas en el mismo horario
- Cancelación lógica mediante estado

---

## 5. Modelo de datos

Las entidades principales son:

```text
Usuario
Servicio
Cita
```

Relación principal:

```text
Usuario 1 ----- N Cita N ----- 1 Servicio
```

Una cita pertenece a:

- un usuario
- un servicio

Las relaciones están implementadas mediante JPA utilizando:

- `@OneToMany`
- `@ManyToOne`
- `@JoinColumn`
- `@Enumerated`

---

## 6. Seguridad

La aplicación utiliza Spring Security con JWT.

### Acceso a endpoints

| Endpoint | Acceso |
|---|---|
| `/api/auth/**` | Público |
| `/api/usuarios/me` | Usuario autenticado |
| `/api/usuarios/**` | ADMINISTRADOR |
| `GET /api/servicios/**` | Usuario autenticado |
| `POST /api/servicios/**` | ADMINISTRADOR |
| `PUT /api/servicios/**` | ADMINISTRADOR |
| `DELETE /api/servicios/**` | ADMINISTRADOR |
| `/api/citas/**` | Usuario autenticado |

En el módulo de citas, un PACIENTE solo puede consultar y modificar sus propias citas.

---

## 7. Principales endpoints

### 7.1 Autenticación

```text
POST /api/auth/registro
POST /api/auth/login
```

### 7.2 Usuarios

```text
GET    /api/usuarios/me
GET    /api/usuarios
GET    /api/usuarios/{id}
POST   /api/usuarios
PUT    /api/usuarios/{id}
DELETE /api/usuarios/{id}
```

### 7.3 Servicios

```text
GET    /api/servicios
GET    /api/servicios/{id}
POST   /api/servicios
PUT    /api/servicios/{id}
DELETE /api/servicios/{id}
```

Búsqueda de servicios por nombre:

```text
GET /api/servicios?nombre=cardio
```

### 7.4 Citas

```text
GET    /api/citas
GET    /api/citas/{id}
POST   /api/citas
PUT    /api/citas/{id}
DELETE /api/citas/{id}
```

---

## 8. Códigos HTTP utilizados

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
```

---

## 9. Consultas JPQL

El proyecto utiliza consultas JPQL personalizadas.

Entre ellas:

- búsqueda de servicios por nombre sin distinguir mayúsculas y minúsculas;
- listado de citas por paciente;
- validación de conflictos de horario para citas.

Ejemplo de búsqueda de servicio por nombre:

```java
@Query("""
       SELECT s
       FROM Servicio s
       WHERE LOWER(s.nombre)
       LIKE LOWER(CONCAT('%', :nombre, '%'))
       ORDER BY s.nombre
       """)
List<Servicio> buscarPorNombre(@Param("nombre") String nombre);
```

---

## 10. Persistencia con JPA / Hibernate

El backend utiliza Spring Data JPA e Hibernate para la persistencia de datos.

Las tablas principales son:

```text
usuarios
servicios
citas
```

La base de datos utilizada es:

```text
clinica_san_felipe
```

El script SQL se encuentra en:

```text
database/script.sql
```

Hibernate está configurado para mantener el esquema durante el desarrollo mediante:

```text
spring.jpa.hibernate.ddl-auto=update
```

---

## 11. Configuración de Java

El proyecto utiliza Java 17.

En IntelliJ:

```text
Project SDK: Java 17
Language level: 17
```

En `pom.xml`:

```xml
<properties>
    <java.version>17</java.version>
    <jjwt.version>0.12.6</jjwt.version>
</properties>
```

---

## 12. Dependencias principales del backend

El proyecto incluye:

- `spring-boot-starter-web`
- `spring-boot-starter-data-jpa`
- `spring-boot-starter-security`
- `spring-boot-starter-validation`
- `mysql-connector-j`
- `jjwt-api`
- `jjwt-impl`
- `jjwt-jackson`
- `spring-boot-starter-test`
- `spring-security-test`
- `h2`

---

## 13. Ejecución del backend

Desde la carpeta `backend`:

```bash
mvn spring-boot:run
```

También se puede ejecutar directamente desde IntelliJ mediante la clase principal de Spring Boot.

Por defecto, el backend utiliza:

```text
http://localhost:8080
```

---

## 14. Ejecución del frontend

Desde la carpeta `frontend`:

```bash
npm install
npm start
```

También puede ejecutarse con:

```bash
ng serve
```

Por defecto, el frontend utiliza:

```text
http://localhost:4200
```

---

## 15. Pruebas automatizadas

El backend contiene pruebas automatizadas para:

- autenticación
- usuarios
- servicios
- citas
- seguridad
- validaciones
- reglas de negocio

Las pruebas utilizan:

- Spring Boot Test
- MockMvc
- Spring Security Test
- H2

Para ejecutar las pruebas:

```bash
mvn test
```

---

## 16. Postman

El proyecto incluye pruebas de API mediante Postman.

La colección se encuentra en:

```text
postman/
```

Las pruebas permiten validar:

- login
- registro
- usuarios
- servicios
- citas
- permisos por rol
- respuestas 401, 403, 404 y 409

---

## 17. Reglas de negocio principales

- No pueden existir usuarios con el mismo correo.
- Las contraseñas deben cumplir las validaciones establecidas.
- Las contraseñas se almacenan mediante hash BCrypt.
- Solo el ADMINISTRADOR puede gestionar usuarios y servicios.
- Los pacientes solo pueden acceder a sus propias citas.
- Una cita debe tener fecha y hora futura.
- El servicio utilizado en una cita debe estar activo.
- No se puede reservar el mismo servicio en el mismo horario.
- Una cita cancelada no puede reprogramarse.
- La cancelación de citas es lógica mediante su estado.
- No se pueden eliminar usuarios o servicios con citas asociadas.
- Un administrador no puede eliminar su propia cuenta.

---

## 18. Estados de cita

Los estados utilizados en el sistema son:

```text
PROGRAMADA
CANCELADA
```

---

## 19. Manejo de errores

La aplicación utiliza un manejador global de excepciones mediante:

```text
@RestControllerAdvice
```

Esto permite devolver respuestas HTTP adecuadas ante:

- validaciones incorrectas;
- recursos inexistentes;
- usuarios sin permisos;
- conflictos de negocio;
- errores de integridad;
- credenciales o tokens inválidos.

---

## 20. Control de versiones

El proyecto utiliza Git y GitHub para el control de versiones.

La estructura del repositorio incluye:

```text
backend/
database/
frontend/
postman/
README.md
.gitignore
```

Se excluyen archivos generados o locales como:

```text
.idea/
backend/target/
frontend/node_modules/
frontend/.angular/
dist/
*.log
```

---

## 21. Integrantes

- Maco Signori, José Manuel
- Olivera Rodriguez, Diana Fiorella
- Piñas Flores, Sergio Leonardo
- Balcazar Robles, Camila Alessandra

---

## 22. Curso

**Desarrollo Web Integrado**

Sección: **34368**

Docente: **Wenceslao Hooberth Chavez Bedoya**

Lima, Perú - 2026