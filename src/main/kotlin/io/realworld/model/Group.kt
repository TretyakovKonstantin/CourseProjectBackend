package io.realworld.model

import com.fasterxml.jackson.annotation.JsonRootName
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import javax.persistence.*

@Entity
@Table(name = "groups")
@JsonRootName("group")
data class Group(var name: String = "",
                 @ManyToMany(fetch = FetchType.EAGER)
                 @Cascade(CascadeType.ALL)
                 @JoinTable(
                         name = "group_to_user",
                         joinColumns = arrayOf(JoinColumn(name = "group_id", referencedColumnName = "id")),
                         inverseJoinColumns = arrayOf(JoinColumn(name = "user_id", referencedColumnName = "id"))
                 )
                 var subjects: List<User> = mutableListOf(),
                 @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
                 var id: Long = 0)