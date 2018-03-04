package io.realworld

import io.realworld.model.Group
import io.realworld.model.Note
import io.realworld.model.User
import io.realworld.repository.GroupRepository
import io.realworld.repository.UserRepository
import io.realworld.repository.specification.NotesSpecifications
import io.realworld.service.UserService
import org.junit.Assert
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import java.util.*
import kotlin.streams.asSequence

@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class GroupTests {

    @Autowired
    private var userRepository: UserRepository? = null
    @Autowired
    private var repository: GroupRepository? = null
    private var userService: UserService? = null
    private var group: Group? = null

    private val user = getRandomUser()

    private final fun getRandomUser(): User {
        var name = ""
        val source = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        name += Random().ints(9, 0, source.length)
                .asSequence()
                .map(source::get)
                .joinToString("")
        return User(name + "@mail.ru",
                "\$2a\$10\$7zEkCC8e9797I1W5o2LWK.0Mv0pzcr7UtJ25X.nDv3RX/7.btpDny",
                "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MTk2NDg0NzMsInN1YiI6ImFzZGZAbWFpbC5ydSIsImlzcyI6IktvdGxpbiZTcHJpbmciLCJleHAiOjE1MjA1MTI0NzN9.ihDzGLU-1kUY1CEa80a-xZiFPYYZbTk-tW43fR6J_-w",
                name)
    }

    @Before
    fun before() {
        group = Group("KusKusKlan", listOf(user))
        repository!!.save(group)
        user.groups = listOf(group!!)
        Assert.assertNotNull(repository)
        Assert.assertNotNull(user)
        Assert.assertNotNull(group)
        Assert.assertNotNull(userRepository)
        userRepository!!.save(user)
    }

    @Test
    fun testFindAll() {
//        val user = userRepository!!.findByUsername(user.username)
//        user!!.groups = listOf(group!!)
//        userRepository!!.save(user)

        val userGroups = userRepository!!.findByUsername(user.username)!!.groups
        Assert.assertTrue("Could not get user notes", userGroups.find { (name) -> name == "KusKusKlan" } != null)
    }

    @Test
    fun testFindById() {
        Assert.assertTrue(repository!!.findById(1).isPresent)
    }

    @Test
    fun testRemoveById() {
        val noteToRemove = repository!!.findByName(group!!.name)[0]
        repository!!.removeById(noteToRemove.id)
        Assert.assertFalse(repository!!.findById(noteToRemove.id).isPresent)
    }
}