import React, { useState, useEffect }from 'react'

const InfoUser = () => {

    const [infoUser, setInfoUser] = useState(null);
    const [tasksList, setTasksList] = useState([]);
    const [user,setUser] = useState(1);

    function formatUrlUser(user) {
        return 'https://jsonplaceholder.typicode.com/users/'+user;
    }

    function formatUrlTasks(user) {
        return 'https://jsonplaceholder.typicode.com/users/'+user+'/todos';
    }

    useEffect(() => {
        const  getData = async () => {
        const responseUser = await fetch(formatUrlUser(user));
        const dataUser = await responseUser.json();
        const responseTasks = await fetch(formatUrlTasks(user));
        const dataTasks = await responseTasks.json();
        setInfoUser(dataUser);
        setTasksList(dataTasks);
        };
        getData();
    },[user]);

    const handlePrevUser = () => {
        setUser((prevUser) => {
            return prevUser-1;
        });
        console.log(user);
    };

    const handleNextUser = () => {
        setUser((prevUser) => {
            return prevUser+1;
          }); 
        console.log(user);
    };

    const complet = {
        backgroundColor:'green',
        color:'black'
    }

    const notComplet = {
        backgroundColor:'yellow',
        color:'black'
    }

    const handleChangeState = (index) => {
        const task=tasksList[index];
        task.completed=true;
        setTasksList((prevState) => {
            return [...prevState]; 
        })
    };
    
    const handleDeleteTask = (index) => {
        setTasksList((prevState) => {
          return prevState.filter((task, i) => i !== index);
        });
    };

    return (
        <>
            {user > 1 ? (
                <button onClick={handlePrevUser}>Anterior Usuario</button>
            ):("")}
            {user < 10 ? (
                <button onClick={handleNextUser}>Siguiente Usuario</button>
            ):("")}
            <div>
                <h1>Informacion del usuario</h1>
                {infoUser ? (
                    <ul>
                    <li><span >Nombre: </span>{infoUser.name}</li>
                    <li><span >Usuario: </span>{infoUser.username}</li>
                    <li><span >Email: </span>{infoUser.email}</li>
                    <li><span >Web: </span>{infoUser.website}</li>
                    <li><span >Telefono: </span>{infoUser.phone}</li>
                    </ul>
                    ):("Cargando los datos...")
                }
            </div>
            <div>
                <h1>Lista de tareas ({tasksList.length} en total)</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                    tasksList.map( ( task, index ) => (
                    <tr key={ index }>
                    <td>{ task.title }</td>
                    { task.completed ? (
                        <td style={complet}>Completada</td>
                    ):(<td><button onClick={()=>{handleChangeState(index)}} style={notComplet}>Marcar como completada</button></td>)}
                    <td><button onClick={()=>{handleDeleteTask(index)}}>ELIMINAR</button></td>
                    </tr>
                    )
                    )
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default InfoUser;