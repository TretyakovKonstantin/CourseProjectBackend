package io.realworld.model

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonRootName
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import javax.persistence.*

@Entity
@JsonRootName("users")
@Table(name = "users")
data class User(var email: String = "",
                @JsonIgnore
                var password: String = "",
                var token: String = "",
                var username: String = "",
                var bio: String = "",
                var image: String = "",
                @ManyToMany(fetch = FetchType.EAGER)
                @Cascade(CascadeType.ALL)
                @JoinTable(
                        name = "group_to_user",
                        joinColumns = arrayOf(JoinColumn(name = "user_id", referencedColumnName = "id")),
                        inverseJoinColumns = arrayOf(JoinColumn(name = "group_id", referencedColumnName = "id"))
                )
                var groups: List<Group> = mutableListOf(),
                @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
                @Column(name="id")
                var id: Long = 0) {
    override fun toString(): String = "User($email, $username)"
}