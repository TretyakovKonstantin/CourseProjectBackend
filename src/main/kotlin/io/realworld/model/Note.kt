package io.realworld.model

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.annotation.JsonRootName
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import javax.persistence.*

@Entity
@JsonRootName("note")
data class Note(var title: String = "",
                var body: String = "",
                @ManyToOne(fetch = FetchType.LAZY)
                @Cascade(CascadeType.ALL)
                @JoinColumn(name="user_id" )
                   var user: User = User(),
                @Id @GeneratedValue(strategy = GenerationType.IDENTITY )
                   var id: Long = 0)