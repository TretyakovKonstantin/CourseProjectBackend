package io.realworld.repository

import io.realworld.model.Note
import io.realworld.model.User
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository

@Repository
interface NoteRepository : PagingAndSortingRepository<Note, Long>, JpaSpecificationExecutor<Note> {
    fun findAllByUser(userId: User): List<Note>
    fun removeById(id: Long)
}