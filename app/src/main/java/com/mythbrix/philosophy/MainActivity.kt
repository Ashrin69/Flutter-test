package com.mythbrix.philosophy

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.mythbrix.philosophy.data.Datasource
import com.mythbrix.philosophy.data.PhilosophySubject
import com.mythbrix.philosophy.ui.theme.PhilosophyTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PhilosophyTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val navController = rememberNavController()
                    NavHost(navController = navController, startDestination = "subjectList") {
                        composable("subjectList") {
                            SubjectList(subjects = Datasource().loadSubjects(), navController = navController)
                        }
                        composable(
                            "subjectDetail/{subjectCode}",
                            arguments = listOf(navArgument("subjectCode") { type = NavType.StringType })
                        ) { backStackEntry ->
                            val subjectCode = backStackEntry.arguments?.getString("subjectCode")
                            val subject = Datasource().loadSubjects().find { it.subjectCode == subjectCode }
                            if (subject != null) {
                                SubjectDetailScreen(subject = subject)
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun SubjectList(subjects: List<PhilosophySubject>, navController: NavController) {
    var searchQuery by remember { mutableStateOf("") }
    val filteredSubjects = if (searchQuery.isEmpty()) {
        subjects
    } else {
        subjects.filter { subject ->
            subject.subjectName.contains(searchQuery, ignoreCase = true) ||
            subject.partA.any { it.question.contains(searchQuery, ignoreCase = true) || it.answer?.contains(searchQuery, ignoreCase = true) == true } ||
            subject.partB.any { it.question.contains(searchQuery, ignoreCase = true) || it.answer?.contains(searchQuery, ignoreCase = true) == true } ||
            subject.partC.any { it.question.contains(searchQuery, ignoreCase = true) || it.answer?.contains(searchQuery, ignoreCase = true) == true }
        }
    }

    Column {
        TextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            label = { Text("Search") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp)
        )
        LazyColumn(modifier = Modifier.padding(8.dp)) {
            items(filteredSubjects) { subject ->
                SubjectCard(subject = subject, navController = navController)
            }
        }
    }
}

@Composable
fun SubjectCard(subject: PhilosophySubject, navController: NavController) {
    Card(
        modifier = Modifier
            .padding(8.dp)
            .clickable { navController.navigate("subjectDetail/${subject.subjectCode}") }
    ) {
        Text(
            text = subject.subjectName,
            modifier = Modifier.padding(16.dp),
            style = MaterialTheme.typography.headlineSmall
        )
    }
}
