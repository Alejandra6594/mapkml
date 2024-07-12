export const getLongitudeAndLatitudeAprox = (element) => {
    let myType = element.features[0].geometry.type;
    // ==========Acceso a datos de punto=======//
    if (myType == "Point") {
      return [
        element.features[0].geometry.coordinates[0],
        element.features[0].geometry.coordinates[1],
      ];
    }
    //==========================================================//
    // ==========Acceso a datos LineString=======//
    if (myType == "LineString") {
      return [
        element.features[0].geometry.coordinates[0][0],
        element.features[0].geometry.coordinates[0][1],
      ];
    }
    //==========================================================//
    // ==========Acceso a datos de poligonos=======//
    if (myType == "Polygon") {
      return [
        element.features[0].geometry.coordinates[0][1][0],
        element.features[0].geometry.coordinates[0][1][1],
      ];
    }
    //==========================================================//
  };

 export let createDataBase = `
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
  `

 export let changeContexDataBase= `
    -- ===== PARTE 2: CAMBIAR EL CONTEXTO A LA BASE DE DATOS Y CREAR LA TABLA SI NO EXISTE =====
		USE GeoKml
		GO
		-- ================================================================
	   
  `

 export let createTable= ` 
	  -- ===== PARTE 3: CREACION DE TABLA GEODATA =====
	  IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'geodata') 
	  BEGIN 
		  CREATE TABLE geodata (
		  id [int] IDENTITY (1,1) PRIMARY KEY,
		  nameFile [varchar](200) NOT NULL, 
		  typeFile [varchar](50) NOT NULL,
          longitudeAprox [varchar](50) NOT NULL,
          latitudeAprox[varchar](50) NOT NULL,
		  coordinates TEXT NOT NULL,
          
		); 
		--SET IDENTITY_INSERT geodata ON;
		PRINT 'Tabla creada exitosamente.'; 
	  END ELSE BEGIN 
		PRINT 'La tabla ya existe.'; 
	  END
	   -- ================================================================
  `

 export let dataUnics= `
        --PARTE 4: ESTE CODIGO ES PARA NO DUPLICAR DATOS QUE YA SE ENCUENTRAN EN LA TABLA 
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

  `


