package io.realworld.repository

import io.realworld.model.Group
import io.realworld.model.Note
import io.realworld.model.User
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
interface GroupRepository : PagingAndSortingRepository<Group, Long>, JpaSpecificationExecutor<Note> {
    @Transactional
    fun removeById(id: Long)
    fun findByName(name: String): List<Group>
}