import React, { useState, useEffect } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

import { updateTask, createTask } from './crud'

export default function ModalTask (props) {
  const [task, setTask] = useState()
  const [show, setShow] = useState(true)
  const [date, setDate] = useState()

  useEffect(() => {
    const a = props.task?.endDate.split('T')[0]
    setDate(a)
    setShow(true)
    if (props.prop === 'edit') {
      setTask(props.task)
    }
  }, [props.prop, props.task])
  const closeModal = () => {
    setShow(false)
  }
  const handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    setTask({ ...task, [name]: value })
  }

  const handleSubmit = async event => {
    closeModal()

    console.log(task)
    const res =
      props.prop === 'edit' ? await updateTask(task) : await createTask(task)
    props.res(res)
  }
  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>{props.prop} task </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name='name'
                type='string'
                defaultValue={props.task?.name}
                onChange={handleInputChange}
              />

              <br />

              <Form.Label>End Date</Form.Label>

              <Form.Control
                name='endDate'
                type='date'
                defaultValue={date}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
