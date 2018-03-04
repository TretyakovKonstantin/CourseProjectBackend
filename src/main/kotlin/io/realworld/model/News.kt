package io.realworld.model

import com.fasterxml.jackson.annotation.JsonRootName
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import javax.persistence.*

@Entity
@JsonRootName("news")
data class News(var title: String = "",
                var body: String = "",
                @ManyToOne(fetch = FetchType.LAZY)
                @Cascade(CascadeType.ALL)
                @JoinColumn(name = "group_id")
                var group: Group = Group(),
                @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
                var id: Long = 0)