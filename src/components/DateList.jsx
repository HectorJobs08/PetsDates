import DateTicket from "./DateTicket";
import RenderIf from "./RenderIf";

const DateList = ({ patients, setPatient, deletePatient }) => {

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-full mt-20 md:mt-0">

      <RenderIf isTrue={patients.length !== 0}>
        <div className="sticky top-0 bg-gray-100 rounded-md pb-1">
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {''}
            <span className=" text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>
        </div>
      </RenderIf>
      <RenderIf isTrue={patients.length === 0}>
        <div className="sticky top-0 bg-gray-100 rounded-md pb-1">
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando pacientes {''}
            <span className=" text-indigo-600 font-bold">y apareceran en este lugar</span>
          </p>
        </div>
      </RenderIf>
      

      <div className="overflow-y-auto md:h-full">
        <RenderIf isTrue={patients.length !== 0}>
          {patients.map((patient) => (
            <DateTicket
              key={patient.id}
              patient={patient}
              setPatient={setPatient}
              deletePatient={deletePatient}
            />
          ))}
        </RenderIf>
      </div>
    </div>
  )
}

export default DateList;