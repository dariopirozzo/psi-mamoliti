import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../../components/Calendar/Calendar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import availableDays from '../../data/availableDays';
import unavailableDays from '../../data/unavailableDays';
interface Sesion {
  id: number;
  tipo: string;
  profesional: string
}
const Sesiones: React.FC = () => {
  const navigate = useNavigate();
  const [tipoSesion, setTipoSesion] = useState<string>("Terapia Individual");
  const [sesiones, setSesiones] = useState<Sesion[]>([]);
  const [showToast , setShowToast ] = useState(false)

  const turnInfo = useSelector((state: RootState) => state.turnoInfoSlice.data)
  
  useEffect(() => {
    fetchSesionesData()
  }, []);

   //mock de capa api

  const fetchSesionesData = async () => {
    try {
      const response = await fetch('../../data/sesionesData.json',{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }); // Simula la llamada a la API para obtener los datos de sesiones
      if (!response.ok) {
        throw new Error('Error al obtener los datos de sesiones');
      }
      const data = await response.json();
      setSesiones(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleAgendarSesion = () => {
    if(turnInfo.turn !== '' ){
      const turn = {
        profesionalSeleccionado: profesionalSeleccionado,
        terapia: tipoSesion,
        tuno: turnInfo.turn
      }
      setShowToast(true)
      console.log(turn) // en este caso es un console log, pero puede ser una funcion que envie los datos algun endpoint
    }
  };

  // Función para manejar el cambio en el tipo de sesión seleccionado
  const handleTipoSesionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoSesion(event.target.value);
  };

  // Filtrar el profesional correspondiente al tipo de sesión seleccionado
  const profesionalSeleccionado = sesiones.find(sesion => sesion.tipo === tipoSesion)?.profesional;

  return (
    <div className="container-fluid p-0 d-flex flex-column " style={{ minHeight: '100vh', backgroundColor: '#f5f0fa' }}>
      <div className="py-2 px-4 d-flex align-items-center" style={{ backgroundColor: '#563d7c' }}>
        <button className="btn btn-link text-white" onClick={handleGoBack}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
        </svg>
        </button>
        <h2 className="mb-0 text-white">Mis Sesiones</h2>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="p-5 rounded-lg shadow-lg" style={{ backgroundColor: 'white' }}>
              <h3>Agendar Nueva Sesión</h3>
              <div className="form-group">
                <label htmlFor="tipoSesion">Tipo de Sesión:</label>
                <select className="form-control rounded-pill" id="tipoSesion" value={tipoSesion} onChange={handleTipoSesionChange}>
                  {sesiones.map((sesion) => (
                    <option key={sesion.id} value={sesion.tipo}>
                      {sesion.tipo}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="profesional">Profesional:</label>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  id="profesional"
                  value={profesionalSeleccionado || ''}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="fechaTurno">Fecha del Turno:</label>
                <input
                  type="button"
                  className="form-control rounded-pill"
                  style={{ textAlign: 'start' }}
                  data-toggle="modal" 
                  data-target="#exampleModal"
                  id="fechaTurno"
                  value={turnInfo.turn === '' ? '' : turnInfo.turn } // Aquí debes proporcionar la fecha del turno
                  readOnly
                />
              </div>
              <div className="text-center mt-3">
                     <div className="modal" role="dialog" id="exampleModal">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <Calendar 
                              professional={profesionalSeleccionado!} 
                              teraphy={tipoSesion}
                              availableDays={availableDays}
                              unavailableDays={unavailableDays}/>
                            </div>
                          </div>
                        </div>
                      </div>
                      {
                          showToast && 
                          <div className="alert alert-success" role="alert">
                                Turno Agendado
                          </div>
                      }
                      <button className="btn rounded-pill text-white px-4" style={{ backgroundColor: '#563d7c' }} onClick={handleAgendarSesion} disabled={turnInfo.turn === ''}>Agendar Sesión</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sesiones;