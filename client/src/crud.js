export const getTasks = () => {
  return fetch('http://localhost:4000/getTasks')
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson)
      return resJson
    })
}
export const createTask = task => {

  return fetch('http://localhost:4000/createTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task)
  })
    .then(res => res.json())
    .then(resJson => {
      return resJson
    })
}
export const updateTask = task => {
  return fetch(`http://localhost:4000/updateTask/${task._id}`, {    
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task)
  })
    .then(res => res.json())
    .then(resJson => {
      return resJson
    })
}

export const deleteTask = task_id => {
  return fetch(`http://localhost:4000/deleteTask/${task_id}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(resJson => {
      return resJson
    })
}
