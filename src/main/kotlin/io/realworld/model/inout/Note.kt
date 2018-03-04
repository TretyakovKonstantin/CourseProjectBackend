//package io.realworld.model.inout
//
//import com.fasterxml.jackson.annotation.JsonRootName
//import io.realworld.model.User
//
//@JsonRootName("note")
//data class Note(var id: Long? = null,
//                var title: String? = null,
//                var body: String? = null,
//                var user: Profile = Profile(username = "", bio = "", image = "", following = false)) {
//    companion object {
//        fun fromModel(model: io.realworld.model.Note, currentUser: User): Note {
//            return Note(
//                    id = model.id,
//                    title = model.title,
//                    body = model.body,
//                    user = Profile.fromUser(model.user, currentUser)
//            )
//        }
//    }
//}