
      -- Nombre de la base de datos que deseas crear 
	  DECLARE @DatabaseName NVARCHAR(128) = 'GeoKml'; 
	  -- Verificar si la base de datos existe 
	  IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = @DatabaseName) BEGIN 
	  -- Crear la base de datos si no existe 
	  EXEC('CREATE DATABASE [' + @DatabaseName + ']');
	  PRINT 'Base de datos creada exitosamente.'; 
	  END ELSE BEGIN 
	  USE GeoKml;
	  PRINT 'La base de datos ya existe.'; 
	  END
      
	  -- Crear una nueva tabla 
	  IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'geodata') 
	  BEGIN 
	  CREATE TABLE geodata (
      id [INT] IDENTYTY 1,1 PRIMARY KEY,
      name [VARCHAR]200 NOT NULL, 
      type [VARCHAR]50 NOT NULL,
      coordinates TEXT NOT NULL,
    ); 
	SET IDENTYTY_INSERT geodata ON;
	  PRINT 'Tabla creada exitosamente.'; 
	  END ELSE BEGIN 
	  PRINT 'La tabla ya existe.'; 
	  END GO

    -- Crear la tabla geodata (si no existe)
      

      INSERT INTO geodata (name, type, coordinates) VALUES ('Estatua de la Libertad','Point', '[-74.0445004,40.6892494,0]');

        WHERE NOT EXISTS (
        SELECT 1 FROM geodata WHERE data = 'nuevo_registro'
        );
        INSERT INTO geodata (name, type, coordinates) VALUES ('Torre de Pisa','Point', '[10.396597,43.722952,0]');

        WHERE NOT EXISTS (
        SELECT 1 FROM geodata WHERE data = 'nuevo_registro'
        );
        
    