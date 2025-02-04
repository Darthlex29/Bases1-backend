INSERT INTO Estado VALUES ('Act', 'Activo');
INSERT INTO Estado VALUES ('In', 'Inactivo');

INSERT INTO TipoArchivo VALUES ('PDF', 'Documento Portable');
INSERT INTO TipoArchivo VALUES ('DOC', 'Documento');
INSERT INTO TipoArchivo VALUES ('XLS', 'Hoja de Cálculo');
INSERT INTO TipoArchivo VALUES ('GIF', 'Imagen');
INSERT INTO TipoArchivo VALUES ('BMP', 'Imagen');
INSERT INTO TipoArchivo VALUES ('MP4', 'Video');
INSERT INTO TipoArchivo VALUES ('AVI', 'Video');
INSERT INTO TipoArchivo VALUES ('MP3', 'Música');
INSERT INTO TipoArchivo VALUES ('EXE', 'Ejecutable');

INSERT INTO Categoria VALUES ('PRI', 'Principal');
INSERT INTO Categoria VALUES ('PRO', 'Promoción');
INSERT INTO Categoria VALUES ('SOC', 'Social');
INSERT INTO Categoria VALUES ('NOT', 'Notificación');
INSERT INTO Categoria VALUES ('FOR', 'Foro');
INSERT INTO Categoria VALUES ('INP', 'Importante');
INSERT INTO Categoria VALUES ('SPA', 'Spam');
INSERT INTO Categoria VALUES ('PAP', 'Papelera');

INSERT INTO TipoCarpeta VALUES ('Rec', 'Recibido');
INSERT INTO TipoCarpeta VALUES ('Env', 'Enviado');
INSERT INTO TipoCarpeta VALUES ('Bor', 'Borrador');

INSERT INTO TipoCopia VALUES ('CO', 'Copia');
INSERT INTO TipoCopia VALUES ('COO', 'Copia Oculta');

INSERT INTO Pais VALUES ('063', 'Argentina', '.ar');
INSERT INTO Pais VALUES ('097', 'Bolivia', '.bo');
INSERT INTO Pais VALUES ('105', 'Brasil', '.br');
INSERT INTO Pais VALUES ('149', 'Canadá', '.ca');
INSERT INTO Pais VALUES ('169', 'Colombia', '.co');
INSERT INTO Pais VALUES ('245', 'España', '.es');
INSERT INTO Pais VALUES ('249', 'Estados Unidos', '.us');
INSERT INTO Pais VALUES ('275', 'Francia', '.fr');

INSERT INTO USUARIO (USUARIO, IDPAIS, IDESTADO, NOMBRE, APELLIDO, FECHANACIMIENTO, FECHACREACION, CORREOALTERNO, CELULAR) VALUES
('U001', 'CO', 'A1', 'Juan', 'Pérez', TO_DATE('2000-05-15', 'YYYY-MM-DD'), SYSDATE, 'juan.perez@bd.edu.co', '3001234567'),
('U002', 'CO', 'A1', 'María', 'Gómez', TO_DATE('1999-08-22', 'YYYY-MM-DD'), SYSDATE, 'maria.gomez@bd.edu.co', '3002345678'),
('U003', 'CO', 'A1', 'Carlos', 'López', TO_DATE('2001-01-10', 'YYYY-MM-DD'), SYSDATE, 'carlos.lopez@bd.edu.co', '3003456789'),
('U004', 'CO', 'A1', 'Ana', 'Martínez', TO_DATE('2002-07-30', 'YYYY-MM-DD'), SYSDATE, 'ana.martinez@bd.edu.co', '3004567890'),
('U005', 'CO', 'A1', 'Luis', 'Ramírez', TO_DATE('1998-12-05', 'YYYY-MM-DD'), SYSDATE, 'luis.ramirez@bd.edu.co', '3005678901'),
('U006', 'CO', 'A1', 'Sofía', 'Hernández', TO_DATE('2000-11-18', 'YYYY-MM-DD'), SYSDATE, 'sofia.hernandez@bd.edu.co', '3006789012'),
('U007', 'CO', 'A1', 'Andrés', 'Torres', TO_DATE('1997-06-25', 'YYYY-MM-DD'), SYSDATE, 'andres.torres@bd.edu.co', '3007890123'),
('U008', 'CO', 'A1', 'Valentina', 'Díaz', TO_DATE('1999-04-14', 'YYYY-MM-DD'), SYSDATE, 'valentina.diaz@bd.edu.co', '3008901234'),
('U009', 'CO', 'A1', 'Felipe', 'Castro', TO_DATE('2001-09-09', 'YYYY-MM-DD'), SYSDATE, 'felipe.castro@bd.edu.co', '3009012345'),
('U010', 'CO', 'A1', 'Camila', 'Rojas', TO_DATE('2003-03-21', 'YYYY-MM-DD'), SYSDATE, 'camila.rojas@bd.edu.co', '3009123456');

INSERT INTO CONTACTO (CONSECCONTACTO, USUARIO, USU_USUARIO, NOMBRECONTACTO, CORREOCONTACTO) VALUES
(1, 'U001', 'U002', 'Juan Pérez', 'U002@bd.edu.co'),
(2, 'U001', 'U003', 'María López', 'U003@bd.edu.co'),
(3, 'U001', 'U004', 'Carlos Ramírez', 'U004@bd.edu.co'),
(4, 'U001', 'U005', 'Ana Torres', 'U005@bd.edu.co'),
(5, 'U001', NULL, 'David Gómez', 'david.gomez@gmail.com'),
(6, 'U001', NULL, 'Luisa Fernández', 'luisa.fernandez@hotmail.com'),

(7, 'U002', 'U001', 'Pedro Sánchez', 'U001@bd.edu.co'),
(8, 'U002', 'U003', 'María López', 'U003@bd.edu.co'),
(9, 'U002', 'U004', 'Carlos Ramírez', 'U004@bd.edu.co'),
(10, 'U002', 'U005', 'Ana Torres', 'U005@bd.edu.co'),
(11, 'U002', NULL, 'Sandra Martínez', 'sandra.martinez@yahoo.com'),
(12, 'U002', NULL, 'Andrés Herrera', 'andres.herrera@gmail.com'),

(13, 'U003', 'U001', 'Pedro Sánchez', 'U001@bd.edu.co'),
(14, 'U003', 'U002', 'Juan Pérez', 'U002@bd.edu.co'),
(15, 'U003', 'U004', 'Carlos Ramírez', 'U004@bd.edu.co'),
(16, 'U003', 'U005', 'Ana Torres', 'U005@bd.edu.co'),
(17, 'U003', NULL, 'Carolina Suárez', 'carolina.suarez@gmail.com'),
(18, 'U003', NULL, 'Felipe Rojas', 'felipe.rojas@hotmail.com'),

(19, 'U004', 'U001', 'Pedro Sánchez', 'U001@bd.edu.co'),
(20, 'U004', 'U002', 'Juan Pérez', 'U002@bd.edu.co'),
(21, 'U004', 'U003', 'María López', 'U003@bd.edu.co'),
(22, 'U004', 'U005', 'Ana Torres', 'U005@bd.edu.co'),
(23, 'U004', NULL, 'Esteban Castro', 'esteban.castro@gmail.com'),
(24, 'U004', NULL, 'Diana Velásquez', 'diana.velasquez@yahoo.com'),

(25, 'U005', 'U001', 'Pedro Sánchez', 'U001@bd.edu.co'),
(26, 'U005', 'U002', 'Juan Pérez', 'U002@bd.edu.co'),
(27, 'U005', 'U003', 'María López', 'U003@bd.edu.co'),
(28, 'U005', 'U004', 'Carlos Ramírez', 'U004@bd.edu.co'),
(29, 'U005', NULL, 'Ricardo Moreno', 'ricardo.moreno@gmail.com'),
(30, 'U005', NULL, 'Laura Nieto', 'laura.nieto@hotmail.com'),

(31, 'U006', 'U001', 'Pedro Sánchez', 'U001@bd.edu.co'),
(32, 'U006', 'U002', 'Juan Pérez', 'U002@bd.edu.co'),
(33, 'U006', 'U003', 'María López', 'U003@bd.edu.co'),
(34, 'U006', 'U004', 'Carlos Ramírez', 'U004@bd.edu.co'),
(35, 'U006', NULL, 'José Andrade', 'jose.andrade@gmail.com'),
(36, 'U006', NULL, 'Valentina Ordóñez', 'valentina.ordonez@hotmail.com'),

(37, 'U007', 'U001', 'Pedro Sánchez', 'U001@bd.edu.co'),
(38, 'U007', 'U002', 'Juan Pérez', 'U002@bd.edu.co'),
(39, 'U007', 'U003', 'María López', 'U003@bd.edu.co'),
(40, 'U007', 'U004', 'Carlos Ramírez', 'U004@bd.edu.co'),
(41, 'U007', NULL, 'Sofía Muñoz', 'sofia.munoz@gmail.com'),
(42, 'U007', NULL, 'Miguel Ángel Peña', 'miguel.pena@yahoo.com'),

(43, 'U008', 'U001', 'Pedro Sánchez', 'U001@bd.edu.co'),
(44, 'U008', 'U002', 'Juan Pérez', 'U002@bd.edu.co'),
(45, 'U008', 'U003', 'María López', 'U003@bd.edu.co'),
(46, 'U008', 'U004', 'Carlos Ramírez', 'U004@bd.edu.co'),
(47, 'U008', NULL, 'Sebastián León', 'sebastian.leon@gmail.com'),
(48, 'U008', NULL, 'Natalia Espinosa', 'natalia.espinosa@hotmail.com'),

(49, 'U009', 'U001', 'Pedro Sánchez', 'U001@bd.edu.co'),
(50, 'U009', 'U002', 'Juan Pérez', 'U002@bd.edu.co'),
(51, 'U009', 'U003', 'María López', 'U003@bd.edu.co'),
(52, 'U009', 'U004', 'Carlos Ramírez', 'U004@bd.edu.co'),
(53, 'U009', NULL, 'Alejandro Vargas', 'alejandro.vargas@gmail.com'),
(54, 'U009', NULL, 'Camila Ospina', 'camila.ospina@yahoo.com'),

(55, 'U010', 'U001', 'Pedro Sánchez', 'U001@bd.edu.co'),
(56, 'U010', 'U002', 'Juan Pérez', 'U002@bd.edu.co'),
(57, 'U010', 'U003', 'María López', 'U003@bd.edu.co'),
(58, 'U010', 'U004', 'Carlos Ramírez', 'U004@bd.edu.co'),
(59, 'U010', NULL, 'Fernanda Gutiérrez', 'fernanda.gutierrez@gmail.com'),
(60, 'U010', NULL, 'Diego Salazar', 'diego.salazar@hotmail.com');