export interface Vehiculo {
    Id?: number;
    IdTipoVehiculo?: number | null;
    NombreTipoVehiculo?: string;    
    IdModeloVersion?: number | null;
    IdModeloVehiculo?: number | null;
    NombreModeloVehiculo?: string;    
    IdVersionVehiculo?: number | null;
    NombreVersionVehiculo?: string;    
    IdColorVehiculo?: number | null;
    NombreColorVehiculo?: string;
    IdSucursalConcesionario?: number | null;
    NombreSucursalConcesionario?: string;
    IdConcesionario?: number | null;
    NombreConcesionario?: string;
    Patente?: string | null;
    Puertas?: number | null;
    FecCreacion?: Date | null;
}

export interface VehiculosConsulta {
    Id?: number | null;
    IdTipoVehiculo?: number | null;
    IdModeloVersion?: number | null;
    IdColorVehiculo?: number | null;
    IdSucursalConcesionario?: number | null;
    Patente?: string | null;
    FecCreacionDesde?: Date | null;
    FecCreacionHasta?: Date | null;
    Ordenar?: string | null;   
    RegistrosPagina?: number | null;
    NumeroPagina?: number | null;
}