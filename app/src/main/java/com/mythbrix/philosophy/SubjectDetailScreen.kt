package com.mythbrix.philosophy

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.mythbrix.philosophy.data.PhilosophySubject

@Composable
fun SubjectDetailScreen(subject: PhilosophySubject) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text(text = subject.subjectName, style = androidx.compose.material3.MaterialTheme.typography.headlineMedium)
        Text(text = "Part A", style = androidx.compose.material3.MaterialTheme.typography.titleLarge, modifier = Modifier.padding(top = 16.dp))
        subject.partA.forEach {
            SuggestionItem(suggestion = it)
        }
        Text(text = "Part B", style = androidx.compose.material3.MaterialTheme.typography.titleLarge, modifier = Modifier.padding(top = 16.dp))
        subject.partB.forEach {
            SuggestionItem(suggestion = it)
        }
        Text(text = "Part C", style = androidx.compose.material3.MaterialTheme.typography.titleLarge, modifier = Modifier.padding(top = 16.dp))
        subject.partC.forEach {
            SuggestionItem(suggestion = it)
        }
    }
}

@Composable
fun SuggestionItem(suggestion: com.mythbrix.philosophy.data.Suggestion) {
    Column(modifier = Modifier.padding(vertical = 8.dp)) {
        Text(text = suggestion.question, style = androidx.compose.material3.MaterialTheme.typography.titleMedium)
        suggestion.answer?.let {
            Text(text = it, style = androidx.compose.material3.MaterialTheme.typography.bodyMedium)
        }
    }
}