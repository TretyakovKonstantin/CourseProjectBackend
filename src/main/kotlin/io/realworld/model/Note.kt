package io.realworld.model

import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import java.time.OffsetDateTime
import javax.persistence.*

@Entity
data class Note(var title: String = "",
                var body: String = "",
                @ManyToOne(fetch = FetchType.LAZY)
                @Cascade(CascadeType.ALL)
                @JoinColumn(name="user_id" )
                   var user: User = User(),
                @Id @GeneratedValue(strategy = GenerationType.IDENTITY )
                   var id: Long = 0)