package io.realworld

import io.realworld.model.Note
import io.realworld.model.User
import io.realworld.repository.NoteRepository
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
class NoteTests {

    @Autowired
    private var repository: NoteRepository? = null
    private var userRepository: UserRepository? = null
    private var userService: UserService? = null

    private val user = getRandomUser()

    @Before
    fun before() {
        userRepository?.delete(user)
        repository!!.save(Note("Hello World", "We want to thank you", user))
    }


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

    @Test
    fun testFindAll() {
        val userNotes = repository!!.findAll(NotesSpecifications.userNotes(user)).toList()

        Assert.assertTrue("Could not get user notes", userNotes.find { (title) -> title.equals("Hello World") } != null)
    }

    @Test
    fun testFindById() {
        Assert.assertTrue(repository!!.findById(1) != null)
    }

    @Test
    fun testFindByUserId() {
        val userNotes = repository!!.findAllByUser(user)
        Assert.assertTrue(!userNotes.isEmpty())
        Assert.assertTrue(userNotes[0].user == user)
    }
}