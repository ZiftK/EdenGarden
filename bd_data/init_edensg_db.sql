
---------------------- ENUMS
--CREATE TYPE ROL_ENUM AS ENUM ('user', 'admin', 'lider');
--CREATE TYPE DIA_ENUM AS ENUM('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes');

---------------------- Tablas

CREATE TABLE IF NOT EXISTS Cliente (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(100),
    telefono VARCHAR(10) NOT NULL,
    email VARCHAR(100)
);



CREATE TABLE IF NOT EXISTS Empleado (
    id_empleado          SERIAL PRIMARY KEY,
    nombre               VARCHAR(100) NOT NULL,
    direccion            VARCHAR(100),
    telefono             VARCHAR(10),
    email                VARCHAR(50),
    fecha_contratacion   DATE,
    fecha_salida         DATE,
    fecha_recontratacion DATE,
    clave                VARCHAR(50),
    rol                  ROL_ENUM,
    puesto               VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Equipo (
    id_equipo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fk_lider INT
);

CREATE TABLE IF NOT EXISTS EquipoEmpleado(
    fk_empleado INT,
    fk_equipo INT,

    PRIMARY KEY (fk_equipo, fk_empleado),
    FOREIGN KEY (fk_empleado) REFERENCES Empleado(id_empleado),
    FOREIGN KEY (fk_equipo) REFERENCES Equipo(id_equipo)
);



CREATE TABLE IF NOT EXISTS PlantillaHorario (

    id_plantilla SERIAL PRIMARY KEY,
    es_laborable boolean,
    hora_inicial TIME,
    hora_final TIME,
    locacion VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS PlantillaDia(

    id_plantilla SERIAL PRIMARY KEY,
    dia DIA_ENUM,
    fk_plantilla_horario INT NOT NULL,

    FOREIGN KEY (fk_plantilla_horario) REFERENCES PlantillaHorario(id_plantilla) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PlantillaFecha(

    id_plantilla SERIAL PRIMARY KEY,
    fecha DATE,
    fk_plantilla_horario INT NOT NULL,

    FOREIGN KEY (fk_plantilla_horario) REFERENCES PlantillaHorario(id_plantilla) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Sprint(
    id_sprint SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha_inicial DATE,
    fecha_final DATE
);

CREATE TABLE IF NOT EXISTS CalendarioProyecto(
    id_calendario SERIAL PRIMARY KEY,
    fecha_inicio DATE,
    fecha_fin DATE,
    fk_sprint INT,

    FOREIGN KEY (fk_sprint) REFERENCES Sprint(id_sprint) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Proyecto (
    id_proyecto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100),
    estado VARCHAR(50),
    costo NUMERIC(10,2),
    fk_cliente INT NOT NULL,
    fk_calendario INT,

    FOREIGN KEY (fk_cliente) REFERENCES Cliente(id_cliente) ON DELETE SET NULL,
    FOREIGN KEY (fk_calendario) REFERENCES CalendarioProyecto(id_calendario) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Asistencia (
    id_asistencia SERIAL PRIMARY KEY,
    id_empleado INT NOT NULL,
    fecha DATE NOT NULL,
    hora_entrada TIME NOT NULL,
    hora_salida TIME,
    horas_trabajadas INTERVAL,
    horas_extra INTERVAL,

    FOREIGN KEY (id_empleado) REFERENCES Empleado(id_empleado) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PagoNomina (
    id_pago SERIAL PRIMARY KEY,
    id_empleado INT NOT NULL,
    fecha_pago DATE NOT NULL,
    salario_base NUMERIC(10,2),
    bonificaciones NUMERIC(10,2),
    deducciones NUMERIC(10,2),
    total_pagado NUMERIC(12,2),

    FOREIGN KEY (id_empleado) REFERENCES Empleado(id_empleado) ON DELETE CASCADE
);

