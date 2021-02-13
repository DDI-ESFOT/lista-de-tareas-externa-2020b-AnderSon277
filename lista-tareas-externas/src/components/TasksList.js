import React, { useState, useEffect }from 'react'

const TasksList =() => {

    const [tasksList, setTasksList] = useState([]);
    const [user,setUser] = useState(1);

    function formatUrlTasks(user) {
        return 'https://jsonplaceholder.typicode.com/users/'+user+'/todos';
    }

    useEffect(() => {
        const getData = async () => {
          const response = await fetch(formatUrlTasks(user));
          const data = await response.json();
          setTasksList(data);
          console.log('data',data);
          console.log('data',data[0]);
        };
        getData();
    
    }, []);

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
    )
}

export default TasksList;