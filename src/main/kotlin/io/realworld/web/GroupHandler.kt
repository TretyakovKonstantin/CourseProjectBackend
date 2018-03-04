//package io.realworld.web
//
//import io.realworld.exception.InvalidRequest
//import io.realworld.jwt.ApiKeySecured
//import io.realworld.model.Note
//import io.realworld.model.User
//import io.realworld.repository.NoteRepository
//import io.realworld.repository.specification.NotesSpecifications
//import io.realworld.service.UserService
//import org.springframework.http.HttpStatus
//import org.springframework.validation.Errors
//import org.springframework.web.bind.annotation.*
//import javax.validation.Valid
//
//@RestController
//class GroupHandler(val repository: NoteRepository,
//                   val userService: UserService) {
//
//    @ApiKeySecured(mandatory = false)
//    @GetMapping("/api/notes")
//    fun articles(): Any {
//        val notes = repository.findAll(NotesSpecifications.userNotes(
//                userService.currentUser()
//        )).toList()
//        return NotesView(notes, userService.currentUser())
//    }
//
//    @ApiKeySecured
//    @PostMapping("/api/notes")
//    fun newNote(@Valid @RequestBody note: Note, errors: Errors): Any {
//        InvalidRequest.check(errors)
//        val currentUser = userService.currentUser()
//        var newNote = Note(note.title, note.body, currentUser)
//        repository.save(newNote)
//        newNote = repository.findByTitle(newNote.title)[0]
//        return newNote
//    }
//
//    @ApiKeySecured
//    @ResponseStatus(HttpStatus.OK)
//    @DeleteMapping("/api/articles/{id}")
//    fun deleteNote(@PathVariable id: Long): Any {
//        val note = repository.findById(id)
//        repository.removeById(id)
//        return note
//    }
//
//    fun NotesView(notes: List<Note>, currentUser: User)
//            = mapOf("notes" to notes)
//}