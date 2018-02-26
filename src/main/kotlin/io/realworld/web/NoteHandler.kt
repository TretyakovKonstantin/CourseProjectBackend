package io.realworld.web

import com.github.slugify.Slugify
import io.realworld.exception.ForbiddenRequestException
import io.realworld.exception.InvalidRequest
import io.realworld.exception.NotFoundException
import io.realworld.jwt.ApiKeySecured
import io.realworld.model.*
import io.realworld.model.inout.NewArticle
import io.realworld.model.inout.NewComment
import io.realworld.model.inout.UpdateArticle
import io.realworld.repository.*
import io.realworld.repository.specification.ArticlesSpecifications
import io.realworld.repository.specification.NotesSpecifications
import io.realworld.service.UserService
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.validation.Errors
import org.springframework.validation.FieldError
import org.springframework.web.bind.annotation.*
import java.time.OffsetDateTime
import java.util.*
import javax.validation.Valid

@RestController
class NoteHandler(val repository: NoteRepository,
                  val userService: UserService,
                  val userRepository: UserRepository) {

    @ApiKeySecured(mandatory = false)
    @GetMapping("/api/notes")
    fun articles(): Any {
        val notes = repository.findAll(NotesSpecifications.userNotes(
                userService.currentUser()
        )).toList()

        return NotesView(notes, userService.currentUser())
    }

//    @ApiKeySecured
//    @GetMapping("/api/articles/feed")
//    fun feed(@RequestParam(defaultValue = "20") limit: Int,
//             @RequestParam(defaultValue = "0") offset: Int): Any {
//        val currentUser = userService.currentUser()
//        val articles = repository.findByAuthorIdInOrderByCreatedAtDesc(currentUser.follows.map { it.id },
//                PageRequest.of(offset, limit))
//        return articlesView(articles, currentUser)
//    }
//
//    @ApiKeySecured(mandatory = false)
//    @GetMapping("/api/articles/{slug}")
//    fun article(@PathVariable slug: String): Any {
//        repository.findBySlug(slug)?.let {
//            return articleView(it, userService.currentUser())
//        }
//        throw NotFoundException()
//    }
//
//    @ApiKeySecured
//    @PostMapping("/api/articles")
//    fun newArticle(@Valid @RequestBody newArticle: NewArticle, errors: Errors): Any {
//        InvalidRequest.check(errors)
//
//        var slug = Slugify().slugify(newArticle.title!!)
//
//        if (repository.existsBySlug(slug)) {
//            slug += "-" + UUID.randomUUID().toString().substring(0, 8)
//        }
//
//        val currentUser = userService.currentUser()
//
//        // search for tags
//        val tagList = newArticle.tagList.map {
//            tagRepository.findByName(it) ?: tagRepository.save(Tag(name = it))
//        }
//
//        val article = Article(slug = slug,
//                author = currentUser, title = newArticle.title!!, description = newArticle.description!!,
//                body = newArticle.body!!, tagList = tagList.toMutableList())
//
//        return articleView(repository.save(article), currentUser)
//    }
//
//    @ApiKeySecured
//    @PutMapping("/api/articles/{slug}")
//    fun updateArticle(@PathVariable slug: String, @RequestBody article: UpdateArticle): Any {
//        repository.findBySlug(slug)?.let {
//            val currentUser = userService.currentUser()
//            if (it.author.id != currentUser.id)
//                throw ForbiddenRequestException()
//
//            // check for errors
//            val errors = org.springframework.validation.BindException(this, "")
//            if (article.title == "")
//                errors.addError(FieldError("", "title", "can't be empty"))
//            if (article.description == "")
//                errors.addError(FieldError("", "description", "can't be empty"))
//            if (article.body == "")
//                errors.addError(FieldError("", "body", "can't be empty"))
//            InvalidRequest.check(errors)
//
//            var slug: String = it.slug
//            article.title?.let { newTitle ->
//                if (newTitle != it.title) {
//                    // we don't want conflicting slugs
//                    slug = Slugify().slugify(article.title!!)
//                    if (repository.existsBySlug(slug)) {
//                        slug += "-" + UUID.randomUUID().toString().substring(0, 8)
//                    }
//                }
//            }
//
//            // search for tags
//            val tagList = article.tagList?.map {
//                tagRepository.findByName(it) ?: tagRepository.save(Tag(name = it))
//            }
//
//            val updated = it.copy(title = article.title ?: it.title,
//                    description = article.description ?: it.description,
//                    body = article.body ?: it.body,
//                    slug = slug,
//                    updatedAt = OffsetDateTime.now(),
//                    tagList = if (tagList == null || tagList.isEmpty()) it.tagList
//                    else tagList.toMutableList())
//
//            return articleView(repository.save(updated), currentUser)
//        }
//
//        throw NotFoundException()
//    }
//
//    @ApiKeySecured
//    @ResponseStatus(HttpStatus.OK)
//    @DeleteMapping("/api/articles/{slug}")
//    fun deleteArticle(@PathVariable slug: String) {
//        repository.findBySlug(slug)?.let {
//            if (it.author.id != userService.currentUser().id)
//                throw ForbiddenRequestException()
//
//            commentRepository.deleteAll(commentRepository.findByArticle(it))
//            return repository.delete(it)
//        }
//        throw NotFoundException()
//    }
//
//    @ApiKeySecured(mandatory = false)
//    @GetMapping("/api/articles/{slug}/comments")
//    fun articleComments(@PathVariable slug: String): Any {
//        repository.findBySlug(slug)?.let {
//            val currentUser = userService.currentUser()
//            return commentsView(commentRepository.findByArticleOrderByCreatedAtDesc(it), currentUser)
//        }
//        throw NotFoundException()
//    }
//
//    @ApiKeySecured
//    @PostMapping("/api/articles/{slug}/comments")
//    fun addComment(@PathVariable slug: String, @Valid @RequestBody comment: NewComment, errors: Errors): Any {
//        InvalidRequest.check(errors)
//
//        repository.findBySlug(slug)?.let {
//            val currentUser = userService.currentUser()
//            val newComment = Comment(body = comment.body!!, article = it, author = currentUser)
//            return commentView(commentRepository.save(newComment), currentUser)
//        }
//        throw NotFoundException()
//    }
//
//    @ApiKeySecured
//    @ResponseStatus(HttpStatus.OK)
//    @DeleteMapping("/api/articles/{slug}/comments/{id}")
//    fun deleteComment(@PathVariable slug: String, @PathVariable id: Long) {
//        repository.findBySlug(slug)?.let {
//            val currentUser = userService.currentUser()
//            val comment = commentRepository.findById(id).orElseThrow({ NotFoundException() })
//            if (comment.article.id != it.id)
//                throw ForbiddenRequestException()
//            if (comment.author.id != currentUser.id)
//                throw ForbiddenRequestException()
//
//            return commentRepository.delete(comment)
//        }
//        throw NotFoundException()
//    }
//
//    @ApiKeySecured
//    @PostMapping("/api/articles/{slug}/favorite")
//    fun favoriteArticle(@PathVariable slug: String): Any {
//        repository.findBySlug(slug)?.let {
//            val currentUser = userService.currentUser()
//            if (!it.favorited.contains(currentUser)) {
//                it.favorited.add(currentUser)
//                return articleView(repository.save(it), currentUser)
//            }
//            return articleView(it, currentUser)
//        }
//        throw NotFoundException()
//    }
//
//    @ApiKeySecured
//    @DeleteMapping("/api/articles/{slug}/favorite")
//    fun unfavoriteArticle(@PathVariable slug: String): Any {
//        repository.findBySlug(slug)?.let {
//            val currentUser = userService.currentUser()
//            if (it.favorited.contains(currentUser)) {
//                it.favorited.remove(currentUser)
//                return articleView(repository.save(it), currentUser)
//            }
//            return articleView(it, currentUser)
//        }
//        throw NotFoundException()
//    }

    // helpers

    fun NotesView(notes: List<Note>, currentUser: User)
    = mapOf("notes" to notes.map { })

    fun articleView(article: Article, currentUser: User)
            = mapOf("article" to io.realworld.model.inout.Article.fromModel(article, currentUser))

    fun articlesView(articles: List<Article>, currentUser: User)
            = mapOf("articles" to articles.map { io.realworld.model.inout.Article.fromModel(it, userService.currentUser()) },
            "articlesCount" to articles.size)

    fun commentView(comment: Comment, currentUser: User)
            = mapOf("comment" to io.realworld.model.inout.Comment.fromModel(comment, currentUser))

    fun commentsView(comments: List<Comment>, currentUser: User)
            = mapOf("comments" to comments.map { io.realworld.model.inout.Comment.fromModel(it, currentUser) })
}