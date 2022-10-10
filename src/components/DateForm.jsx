import { useState, useMemo, useEffect } from 'react';
import ErrorComponent from './ErrorComponent';

const DateForm = ({ patients, patient, setPatients, setPatient }) => {

  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [error, setError] = useState(false);

  const isModifyingForm = useMemo(() => {
    return Object.keys(patient).length > 0;
  }, [patient]);

  const id = useMemo(() => {
    if (Object.keys(patient).length > 0) return patient.id;

    const random = Math.random().toString(36).substring(2);
    const now = Date.now().toString(36);

    return random + now + name;
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validacion del formulario
    if([
      name,
      owner,
      email,
      date,
      symptoms
    ].includes('')){
      setError(true);
      return;
    }

    setError(false);
    const objPatient = {
      id, 
      name, 
      owner, 
      email, 
      date, 
      symptoms
    }

    if (isModifyingForm) {

      const patientsUpdated = patients.map(patientState => patientState.id === 
        patient.id ? objPatient : patientState);
      
      setPatients(patientsUpdated);
      setPatient({});

    } else {
      setPatients([...patients, objPatient]);
    }
    

    setName('');
    setOwner('');
    setEmail('');
    setDate('');
    setSymptoms('');
    
  };

  const textButton =  isModifyingForm ? "Editar ticket" : "Agregar paciente"

  useEffect(() => {
    if (Object.keys(patients).length > 0) {
      setName(patient.name);
      setOwner(patient.owner);
      setEmail(patient.email);
      setDate(patient.date);
      setSymptoms(patient.symptoms);
    }
  }, [patient]);

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className=" text-indigo-500 font-bold">Administralos</span>
      </p>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5">
        { error && (
          <ErrorComponent>
            Todos los campos deben estar llenos
          </ErrorComponent>
        ) }
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-gray-700 uppercase font-bold">
              Nombre de Mascota
          </label>
          <input 
            id="name"
            name="name"
            type="text"
            placeholder="Nombre de Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="owner"
            className="block text-gray-700 uppercase font-bold">
              Nombre de Propietario
          </label>
          <input 
            id="owner"
            name="owner"
            type="text"
            value={owner}
            placeholder="Nombre de Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={e => setOwner(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold">
              Email
          </label>
          <input 
            id="email"
            type="email"
            value={email}
            placeholder="E-mail Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="created_at"
            className="block text-gray-700 uppercase font-bold">
              Fecha de cita
          </label>
          <input 
            id="created_at"
            name="created_at"
            type="date"
            value={date}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="symptoms"
            className="block text-gray-700 uppercase font-bold">
              Sintomas
          </label>
          <textarea 
            id="symptoms"
            name="symptoms"
            value={symptoms}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded"
            placeholder="Ingresa los sintomas"
            onChange={e => {setSymptoms(e.target.value)}}
          />
        </div>

        <input 
          type="submit"
          className="bg-indigo-500 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={textButton}
        />
      </form>
    </div>
  );
}

export default DateForm;