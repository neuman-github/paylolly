import React, { useState, useRef, useEffect } from 'react'
import { Table, Form, Container } from 'react-bootstrap'
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineUsergroupAdd,
  AiOutlineSortDescending
} from 'react-icons/ai'
import { CgAddR } from 'react-icons/cg'
import { getTasks, deleteTask } from './crud'
import ModalTask from './modaltask'

export default function App (props) {
  const [tasks, setTasks] = useState([])
  const [showPostListId, setShowPostListId] = useState([])
  const [tasksFilter, setTasksFilter] = useState([])
  const [editShow, setEditshow] = useState(-1)
  const [addShow, setAddShow] = useState(false)

  const dateRef = useRef(null)
  const statusRef = useRef(null)

  useEffect(async () => {
    tasksFromServer()
  }, [])
  
  const tasksFromServer = async () => {
    let tasksFromDB = await getTasks()
    setTasks(tasksFromDB)
    setTasksFilter(tasksFromDB)
  }
  const filter = e => {
    setTasks(tasksFilter)
    setTasks(tasks =>
      tasks.filter(
        task => task[e.target.name].toString().indexOf(e.target.value) !== -1
      )
    )
    if (e.target.name !== dateRef.current.name) dateRef.current.value = ''
    else if (e.target.name !== statusRef.current.name)
      statusRef.current.value = ''
  }

  const sort = e => {
    alert(e)
    let temp_state = [...tasks]
    temp_state.sort((a, b) => (a[e] > b[e] ? 1 : b[e] > a[e] ? -1 : 0))
    console.log('temp_state', temp_state)
    setTasks(temp_state)
  }
  const handleEdit = index => {
    setEditshow(index)
  }
  const handleDelete = async task => {
    const now_date = new Date()
    const now_date2 = new Date()
    const end_date = new Date(task.endDate)
    now_date2.setDate(now_date.getDate() + 6)
    if (now_date2 < end_date) {
      let del = await deleteTask(task._id)
      setTasks(tasks.filter(x => x._id !== task._id))
    } else alert('לא ניתן לבטל משימה פחות מ6 ימים לפני סיום מועדה ')
  }
  const resFromChildEdit = res => {
    console.log('fromChhild', res)
    let temp_state = [...tasks]
    temp_state[editShow] = res
    setTasks(temp_state)
  }
  const resFromChildAdd = res => {
    setTasks([...tasks, res])
  }
  return (
    <>
      <Container>
        <div className='text  top-3 mt-5'>
          <h2>My Tasks page</h2>
        </div>
        <div className='text  top-0 mt-5'>
          <Form.Label>Filter by date </Form.Label>
          <Form.Control
            ref={dateRef}
            type='text'
            name='endDate'
            onChange={filter}
          />
          <br />
          <Form.Label>Filter by status </Form.Label>
          <Form.Control
            ref={statusRef}
            type='text'
            name='status'
            onChange={filter}
          />
        </div>
        <Table striped bordered hover className='mt-5'>
          <thead>
            <tr>
              <th>
                Name
                <AiOutlineSortDescending onClick={() => sort('name')} />
              </th>
              <th>
                End-Date
                <AiOutlineSortDescending onClick={() => sort('endDate')} />
              </th>
              <th>Status</th>
              <th>Delete task</th>
            </tr>
          </thead>
          <tbody>
            {tasks &&
              tasks.map((task, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{task.name}</td>
                      <td>{task.endDate.split('T')[0]}</td>
                      <td>{task.status.toString()}</td>

                      <td>
                        <div>
                          <AiFillDelete
                            onClick={e => {
                              handleDelete(task)
                            }}
                          />
                          <AiFillEdit
                            onClick={e => {
                              handleEdit(index)
                            }}
                          />

                          {editShow === index && (
                            <ModalTask
                              prop='edit'
                              task={task}
                              res={resFromChildEdit}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  </>
                )
              })}
          </tbody>
        </Table>
        new task<CgAddR
          onClick={() => {
            setAddShow(true)
          }}
        />
        {addShow && <ModalTask prop='add' res={resFromChildAdd} /> }</Container>
    </>
  )
}
