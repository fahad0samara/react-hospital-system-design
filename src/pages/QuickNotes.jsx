import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNote, toggleNote } from '../features/patientSlice'

export default function QuickNotes() {
  const [newNote, setNewNote] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { notes } = useSelector((state) => state.patients)
  const dispatch = useDispatch()

  const addNewNote = (e) => {
    e.preventDefault()
    if (newNote.trim()) {
      dispatch(addNote({
        id: notes.length + 1,
        text: newNote,
        completed: false,
        timestamp: new Date().toISOString()
      }))
      setNewNote('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Quick Notes</h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search notes..."
              className="px-4 py-2 rounded-lg bg-white/50 border-none focus:ring-2 focus:ring-blue-500 text-sm backdrop-blur-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => setNewNote('')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + New Note
            </button>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Add Note Card */}
          <div className="group relative overflow-hidden rounded-xl bg-white/50 backdrop-blur-sm p-4 transition-all hover:shadow-lg border-2 border-dashed border-gray-300 hover:border-blue-500">
            <form onSubmit={addNewNote} className="h-full">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Take a note..."
                className="w-full h-full min-h-[150px] bg-transparent border-none focus:ring-0 resize-none text-gray-700 placeholder-gray-500"
              />
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="submit"
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  ✓
                </button>
              </div>
            </form>
          </div>

          {/* Notes */}
          {notes
            .filter(note => note.text.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((note, index) => {
              const noteColors = [
                'from-yellow-100 to-yellow-50 border-yellow-200',
                'from-green-100 to-green-50 border-green-200',
                'from-blue-100 to-blue-50 border-blue-200',
                'from-purple-100 to-purple-50 border-purple-200',
                'from-pink-100 to-pink-50 border-pink-200'
              ];
              const colorClass = noteColors[index % noteColors.length];

              return (
                <div
                  key={note.id}
                  className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${colorClass} p-4 transition-all hover:shadow-lg border border-opacity-50`}
                >
                  <div className="flex flex-col h-full min-h-[150px]">
                    <div className="flex items-start justify-between mb-2">
                      <input
                        type="checkbox"
                        checked={note.completed}
                        onChange={() => dispatch(toggleNote(note.id))}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-xs text-gray-500">
                        {new Date(note.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className={`text-sm flex-grow ${note.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      {note.text}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  )
}
