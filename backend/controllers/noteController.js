const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Note = require('../models/noteModel')
const Ticket = require('../models/ticketModel')


// @desc Get notes for ticket
//  @route GET /api/tickets/:ticketsId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
    // get user using id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404) 
        throw new Error('User not found')
    }
    
    const ticket = await Ticket.findById(req.params.ticketId)
    if (ticket.user.toString() !== req.user.id) {
        res.status(401) 
        throw new Error('User not Authorized')
    }

    const notes = await Note.find({ticket: req.params.ticketId})

    res.status(200).json(notes)
})


// @desc Crate note for ticket
//  @route POST /api/tickets/:ticketsId/notes
// @access Private
const addNotes = asyncHandler(async (req, res) => {
    // get user using id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404) 
        throw new Error('User not found')
    }

    
    
    const ticket = await Ticket.findById(req.params.ticketId)
    if (ticket.user.toString() !== req.user.id) {
        res.status(401) 
        throw new Error('User not Authorized')
    }

    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId,
        user: req.user.id
    })

    res.status(200).json(note)
})
// @desc delete note from ticket
//  @route DELETE /api/tickets/:ticketsId/notes/:noteId
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    // get user using id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404) 
        throw new Error('User not found')
    }

    
    const ticket = await Ticket.findById(req.params.ticketId)
    if (ticket.user.toString() !== req.user.id) {
        res.status(401) 
        throw new Error('User not Authorized')
    }
    
    const note = await Note.findById(req.params.id)
    if (!note) {
        throw new Error('Note not found')

    }
    
    await note.deleteOne()

    res.status(200).json({success: true})
})

// @desc Update note in ticket
//  @route DELETE /api/tickets/:ticketsId/notes/:noteId
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    // get user using id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404) 
        throw new Error('User not found')
    }

     // Get the ticket using ticketId from the request parameters
    const ticket = await Ticket.findById(req.params.ticketId)
    if (ticket.user.toString() !== req.user.id) {
        res.status(401) 
        throw new Error('User not Authorized')
    }
    // Check if the user is authorized to update the note
    const note = await Note.findById(req.params.id)
    if (!note) {
        throw new Error('Note not found')
    }
     // Update the note with the provided fields
    const updatedNote = await  Note.findByIdAndUpdate(req.params.id, {
        text: req.body.text,
        isStaff: req.body.isStaff,
        ticket: req.params.ticketId,
        user: req.params.id
    }, {new: true})

    res.status(200).json(updatedNote)
})

module.exports = {
    getNotes,
    addNotes,
    deleteNote,
    updateNote,
};

 
    
