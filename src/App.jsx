import { useState } from "react";
import DateForm from "./components/DateForm";
import Header from "./components/Header";
import DateList from "./components/DateList";

const App = () => {

  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});

  const deletePatient = patientSelected => {
    let tmpPatients = [];
    patients.forEach((item) => {
      if (item.id !== patientSelected.id) tmpPatients.push(item);
    });

    setPatients(tmpPatients);
  };

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
