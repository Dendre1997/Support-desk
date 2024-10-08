import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, reset as notesReset, createNote } from '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import {FaPlus} from 'react-icons/fa'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'

const customStyle = {
    constent: {
        width: '60vw',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%,-50%)',
        position: 'relative'
    },
}

Modal.setAppElement('#root')

function Ticket() {
    const [modalisOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.ticket)
    const { notes, notesIsLoading, } = useSelector((state) => state.notes)
    // const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {ticketId} = useParams()
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
        // eslint-disable-next-line
    }, [isError, message, ticketId])
    const onTicketClose = (e) => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket closed')
        navigate('/tickets')
    }

    // Create Note Submit
    const onNoteSubmit = (e) => {
        e.preventDefault()
        dispatch(createNote({noteText, ticketId}))
        closeModal()
    } 
    
    // Open/close Modal
    const openModal = () =>  setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    
    if (isLoading || notesIsLoading) {
        return <Spinner />
    }
    if (isError) {
        return <h3>Something Went Wrong</h3>
    }
  return (
      <div className='ticket-page'>
          <header className="ticket-header">
              <BackButton url='/tickets' />
              <h2>Ticket Id: {ticket && ticket._id ? (window.innerWidth < 375 ? ticket._id.slice(ticket._id.length - 3) : ticket._id) : 'N/A'} 
                  <span className={`status status-${ticket.status}`}>{ticket.status}</span>
              </h2>
              <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
              <h3>Product: {ticket.product}</h3>
              <hr />
              <div className="ticket-desc">
                  <h3>Description of Issue</h3>
                  <p>{ticket.description}</p>
              </div>
          <h2>Notes</h2>
          </header>

          {ticket.status !== 'closed' && <button onClick={openModal} className='btn'><FaPlus/>Add Note</button>}

          {notes.map((note) => (
              <NoteItem key={note._id} note={note}/>
  ))}

          {ticket.status !== 'closed' && (
              <button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>
          )}
          <Modal isOpen={modalisOpen} onRequestClose={closeModal} style={customStyle} contentLabel='Add Note'>
              <h2>Add Note</h2>
              <button className="btn-close" onClick={closeModal}>X</button>
              <form onSubmit={onNoteSubmit}>
                  <div className="form-group">
                      <textarea name="noteText" id="noteText" className='form-control' placeholder='Note text' value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
                  </div>
                  <div className="form-group">
                      <button className="btn" type='submit'>Submit</button>
                  </div>
              </form>

          </Modal>
      </div>
  )
}

export default Ticket