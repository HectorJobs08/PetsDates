import { useState, useEffect } from "react";
import DateForm from "./components/DateForm";
import Header from "./components/Header";
import DateList from "./components/DateList";

const App = () => {

  const [patients, setPatients] = useState(JSON.parse(localStorage.getItem('patients')) ?? []);
  const [patient, setPatient] = useState({});

  const deletePatient = patientSelected => {
    const patientsUpdated = patients.filter(item => item.id !== patientSelected.id);
    setPatients(patientsUpdated);
  };

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients])

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <DateForm 
          patients={patients}
          patient={patient}
          setPatients={setPatients}
          setPatient={setPatient}
        />
        <DateList 
          patients={patients}
          setPatient={setPatient}
          deletePatient={deletePatient}
        />
      </div>
      
    </div>
  )
}

export default App
