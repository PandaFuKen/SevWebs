-- Creación de la base de datos con collation correcto para PostgreSQL
CREATE DATABASE sevgob
    ENCODING 'UTF8'
    LC_COLLATE 'es_MX.UTF-8'
    LC_CTYPE 'es_MX.UTF-8'
    TEMPLATE template0;

\c sevgob;  -- Conexión a la base de datos

-- Tablas básicas existentes
CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE estados_mexicanos (
    codigo_estado VARCHAR(2) PRIMARY KEY,
    nombre_estado VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE estados_cuenta (
    id_estado_cuenta SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    codigo_estado VARCHAR(2) NOT NULL,
    sexo VARCHAR(20) NOT NULL CHECK (sexo IN ('Masculino', 'Femenino', 'Otro')),
    telefono VARCHAR(15) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL DEFAULT 2,
    id_estado_cuenta INT NOT NULL DEFAULT 1,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (codigo_estado) REFERENCES estados_mexicanos(codigo_estado),
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
    FOREIGN KEY (id_estado_cuenta) REFERENCES estados_cuenta(id_estado_cuenta)
);



CREATE TABLE documentos (
    id_documento SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,
    direccion VARCHAR(255) NOT NULL, -- Ruta o URL del documento
    categoria VARCHAR(20) NOT NULL CHECK (categoria IN ('PERSONAL', 'CERTIFICADO', 'CURSO')),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);






