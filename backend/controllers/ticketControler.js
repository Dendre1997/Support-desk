const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')


// @desc Get user tikets 
//  @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
    // get user using id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404) 
        throw new Error('User not found')
    }
    
    const tickets = await Ticket.find({user: req.user.id})
    res.status(200).json(tickets)
})

// @desc Get user tiket 
//  @route GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
    // get user using id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404) 
        throw new Error('User not found')
    }
    
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        req.status(401) 
        throw new Error('Not Authorized')
    }
    
    res.status(200).json(ticket)
})

// @desc Delete user tiket 
//  @route DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
    // get user using id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404) 
        throw new Error('User not found')
    }
    
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        req.status(401) 
        throw new Error('Not Authorized')
    }

    await ticket.deleteOne()
    
    res.status(200).json({success: true})
})

// @desc Update tiket 
//  @route PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
    // get user using id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404) 
        throw new Error('User not found')
    }
    
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        req.status(401) 
        throw new Error('Not Authorized')
    }

    const updatedTiket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
    
    res.status(200).json(updatedTiket)
})


// @desc create new  tikets 
//  @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body
    
    if (!product || !description) {
        res.status(400)
        throw new Error('Please add a product and description')
    } 
    // get user using id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404) 
        throw new Error('User not found')
    }
    
    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'  // set default status to open when ticket is created
    })


    res.status(201).json(ticket)
})




module.exports = {
    getTickets,
    createTicket,
    getTicket,
    deleteTicket,
    updateTicket,
};