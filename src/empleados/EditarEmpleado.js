import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarEmpleado() {

    let navegacion = useNavigate();
    const { id } = useParams();

    const [empleado, setEmpleado] = useState({
        nombre: '',
        departamento: '',
        sueldo: ''
    });

    useEffect(() => {
        cargarEmpleado();
    }, []);

    const cargarEmpleado = async () => {
        const resultado = await axios.get(`http://localhost:8080/rh-app/empleados/${id}`);
        setEmpleado(resultado.data);
    }

    const { nombre, departamento, sueldo } = empleado;

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos)
        setEmpleado({ ...empleado, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = `http://localhost:8080/rh-app/empleados/${id}`;
        await axios.put(urlBase, empleado);
        // Redireccionar a la lista de empleados
        navegacion('/');
    }

    return (
        <div className='container'>
            <div className="container text-center" style={{ margin: "30px" }}>
                <h3>Editar Empleado</h3>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" name='nombre' required={true} 
                        value={nombre} onChange={(e) => onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="departamento" className="form-label">Departamento</label>
                    <input type="text" className="form-control" id="departamento" name='departamento' required={true} 
                        value={departamento} onChange={(e) => onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="sueldo" className="form-label">Sueldo</label>
                    <input type="text" className="form-control" id="sueldo" name='sueldo' required={true} 
                        value={sueldo} onChange={(e) => onInputChange(e)}/>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-warning btn-sm me-3">Guardar</button>
                    <a href="/" className="btn btn-danger btn-sm">Regresar</a>
                </div>
            </form>
        </div>
    )
}
