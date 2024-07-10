--use Northwind;

	 -- ===== PARTE 1: VERIFICAR Y CREAR LA BASE DE DATOS SI NO EXISTE =====
		DECLARE @dbname NVARCHAR(128)
		SET @dbname = 'GeoKml'

		-- Verificar si la base de datos no existe y crearla si es necesario
		IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = @dbname)
		BEGIN
			DECLARE @sql NVARCHAR(MAX)
			SET @sql = 'CREATE DATABASE ' + QUOTENAME(@dbname)
			EXEC sp_executesql @sql
			PRINT 'Base de datos creada'
		END
		ELSE
		BEGIN
			PRINT 'La base de datos ya existe'
		END
		GO

		-- ===== PARTE 2: CAMBIAR EL CONTEXTO A LA BASE DE DATOS Y CREAR LA TABLA SI NO EXISTE =====
		USE GeoKml
		GO
		-- ================================================================
	 
	  
	  -- ===== PARTE 3: CREACION DE TABLA GEODATA =====
	  IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'geodata') 
	  BEGIN 
		  CREATE TABLE geodata (
		  id [int] IDENTITY (1,1) PRIMARY KEY,
		  nameFile [varchar](200) NOT NULL, 
		  typeFile [varchar](50) NOT NULL,
		  coordinates TEXT NOT NULL,
		); 
		--SET IDENTITY_INSERT geodata ON;
		PRINT 'Tabla creada exitosamente.'; 
	  END ELSE BEGIN 
		PRINT 'La tabla ya existe.'; 
	  END
	   -- ================================================================
    

		IF NOT EXISTS (
		SELECT 1 
		FROM sys.key_constraints 
		WHERE type = 'UQ' 
		  AND parent_object_id = OBJECT_ID('geodata') 
		  AND name = 'UC_Geodata'
	)
	BEGIN
		ALTER TABLE geodata
		ADD CONSTRAINT UC_Geodata UNIQUE (nameFile);
	END


	-- ALTER TABLE geodata
	--ADD CONSTRAINT UC_Geodata UNIQUE (nameFile);

		 --Estatua de la libertad
		  INSERT INTO geodata (nameFile, typeFile, coordinates) VALUES ('Estatua de la Libertad','Point', '[-74.0445004,40.6892494,0]');
		  -- Torre de Pisa
		  INSERT INTO geodata (nameFile, typeFile, coordinates) VALUES ('Torre de Pisa','Point', '[10.396597,43.722952,0]') ;
		  INSERT INTO geodata (nameFile, typeFile, coordinates) VALUES ('Estatua mirador','LineString', '[-74.0445004,40.6892494,0]');
		  --INSERT INTO geodata (nameFile, typeFile, coordinates) VALUES ('Torre de italia','Point', '[10.396597,43.722952,0]') ;
		  --INSERT INTO geodata (nameFile, typeFile, coordinates) VALUES ('San pedro','Poygon', '[10.396597,43.722952,0]') ;
		  --INSERT INTO geodata (nameFile, typeFile, coordinates) VALUES ('San Juan','LineString', '[10.396597,43.722952,0]') ;

	  -- Insertar 'Estatua de la Libertad' si no existe
		--IF NOT EXISTS (SELECT 1 FROM geodata WHERE nameFile = 'Estatua de la Libertad')
		--BEGIN
		--	INSERT INTO geodata (nameFile, typeFile, coordinates) 
		--	VALUES ('Estatua de la Libertad', 'Point', '[-74.0445004,40.6892494,0]')
		--END ELSE BEGIN 
		--	--PRINT 'La Estatua de la Libertad ya se encuentra registrada'; 
		--	  -- Mostrar el mensaje de error en rojo
		--	RAISERROR('Ocurrió un error: %s', 10, 1, 'La Estatua de la Libertad ya se encuentra registrada') WITH NOWAIT;
		--END

		---- Insertar 'Torre de Pisa' si no existe
		--IF NOT EXISTS (
		--	SELECT 1 FROM geodata WHERE nameFile = 'Torre de Pisa'
		--)
		--BEGIN
		--	INSERT INTO geodata (nameFile, typeFile, coordinates) 
		--	VALUES ('Torre de Pisa', 'Point', '[10.396597,43.722952,0]')
		--END


		--MERGE INTO geodata AS target
		--USING (VALUES 
		--	('Estatua de la Libertad', 'Point', '[-74.0445004,40.6892494,0]'),
		--	('Torre de Pisa', 'Point', '[10.396597,43.722952,0]')
		--) AS source (nameFile, typeFile, coordinates)
		--ON target.nameFile = source.nameFile
		--WHEN NOT MATCHED BY TARGET THEN
		--	INSERT (nameFile, typeFile, coordinates) 
		--	VALUES (source.nameFile, source.typeFile, source.coordinates);


        
    