package io.realworld.repository.specification

import io.realworld.model.Note
import io.realworld.model.User
import org.springframework.data.jpa.domain.Specification
import javax.persistence.criteria.Predicate

object NotesSpecifications {
    fun userNotes(author: User?): Specification<Note> {
        return Specification { root, _, cb ->
            val predicates = mutableListOf<Predicate>()
            author?.let {
                val user = root.get<String>("user")
                predicates.add(cb.equal(user, author))
            }

            cb.and(*predicates.toTypedArray())
        }
    }
}