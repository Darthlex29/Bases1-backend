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
