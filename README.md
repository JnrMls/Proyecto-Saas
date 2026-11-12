# StockWise — Gestión Inteligente de Inventarios

**StockWise** es una aplicación web desarrollada en React diseñada para facilitar el control y la administración de inventarios en pequeños negocios. Permite gestionar el catálogo de productos, registrar entradas y salidas de mercancía con validación de existencias y monitorear alertas de reposición en tiempo real.

---

## Información Académica

* **Asignatura:** Buenas Prácticas de Desarrollo de Software (BPDS) — Práctica de Desarrollo de Software
* **Docente:** Kelly Villa
* **Equipo de Desarrollo:**
  * Bladimir Mieles
  * Dana Villarreal
  * Luisa Mejía
  * Yordin Morris

---

## Módulos y Funcionalidades

1. **Inicio y Navegación (`App.js`):** Interfaz principal de presentación de la plataforma y navegación dinámica entre vistas sin recarga de página.
2. **Gestión de Productos (`Products`):** Formulario de registro y listado general con cálculo automático del estado de existencias (`Disponible`, `Stock bajo` y `Agotado`).
3. **Movimientos de Inventario (`MovimientosInventario`):** Registro de **Entradas** y **Salidas** de inventario con validación de stock disponible, actualización automática de cantidades e historial de movimientos con fecha y motivo.
4. **Dashboard y Alertas (`Dashboard`):** Panel de resumen con indicadores generales del negocio y alertas tempranas para productos agotados o con pocas unidades.

---

## Arquitectura y Buenas Prácticas Aplicadas

* **Estado Centralizado (*Lifting State Up*):** El estado compartido de `products` y `movimientos` se gestiona en `src/App.js` y se distribuye mediante *props*, garantizando sincronización inmediata entre módulos.
* **Estructura Modular:** Organización del código fuente separada por responsabilidades en `src/Pages/`, `src/Components/`, `src/Styles/` y `src/Utils/`.
* **Flujo de Trabajo Colaborativo en Git:** Desarrollo aislado por ramas de funcionalidad (`ftInventory`, `feature/*`), sincronización constante con la rama `prod` e integración mediante *Pull Requests* con revisión de código (*Code Review*) y mensajes bajo el estándar *Conventional Commits*.

---

## Tecnologías Utilizadas

* **Frontend:** React, JavaScript (ES6+), HTML5, CSS3
* **Control de Versiones:** Git & GitHub

---

## Instalación y Ejecución Local

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/JnrMls/Proyecto-Saas.git](https://github.com/JnrMls/Proyecto-Saas.git)
