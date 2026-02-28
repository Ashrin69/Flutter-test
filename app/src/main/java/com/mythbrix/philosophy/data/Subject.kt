
package com.mythbrix.philosophy.data

data class Suggestion(
    val id: String,
    val question: String,
    val answer: String?
)

data class PhilosophySubject(
    val subjectCode: String,
    val subjectName: String,
    val partA: List<Suggestion>,
    val partB: List<Suggestion>,
    val partC: List<Suggestion>
)
