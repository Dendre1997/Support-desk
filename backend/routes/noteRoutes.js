const express = require('express')
const router = express.Router({mergeParams: true})
const { getNotes, addNotes, deleteNote, updateNote } = require('../controllers/noteController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getNotes).post(protect, addNotes)
router.route('/:id').delete(protect, deleteNote).put(protect, updateNote)


module.exports = router

// {/api/tickets/:ticketId/notes}