import 'zone.js/dist/zone';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './mcq-quiz.component.html',
  styleUrls: ['./mcq-quiz.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class McqQuizComponent implements OnInit {
  questions: any[] = [ { "id": "Q001", "level": 5, "subject": "General Knowledge", "topic": "Indian Politics", "category": "practical", "questionType": "MultipleChoice", "language": "en", "question": "What is Capital Of India?", "media": {"type": "Image", "value": "https://www.mapsofindia.com/maps/india/india-large-color-map.jpg"}, "options": [{ "type": "text", "value": "Delhi" }, { "type": "text", "value": "Mumbai" }, { "type": "text", "value": "Pune" }], "answer": { "option": 0, "value": "Delhi" }, "complexity": 1, "feedback": {"correct":"Congrats Your Answer is correct!","incorrect":"Sorry Your Answer is incorrect. Please try again!"}, "correctPoint": 10, "incorrectPoint": 0, "description": "<small><strong>Hint:</strong> It's D</small>", "date": "2019-12-25 18:06:31", "modified": "2020-03-28 19:03:45" }, { "id": "Q002", "level": 5, "subject": "General Knowledge", "topic": "Indian Politics", "category": "practical", "questionType": "MultipleChoice", "language": "en", "question": "What is Capital Of Maharashtra?", "media": {"type": "Image", "value": "https://www.mapsofindia.com/maps/maharashtra/maharashtra-map.jpg"}, "options": [{ "type": "text", "value": "Delhi" }, { "type": "text", "value": "Mumbai" }, { "type": "text", "value": "Pune" }], "answer": { "option": 1, "value": "Mumbai" }, "complexity": 1, "feedback": {"correct":"Congrats Your Answer is correct!","incorrect":"Sorry Your Answer is incorrect. Please try again!"}, "correctPoint": 10, "incorrectPoint": 0, "description": "<small><strong>Hint:</strong> It's M</small>", "date": "2019-12-25 18:06:31", "modified": "2020-03-28 19:03:45" } ];
  currentQuestion: any;
  selectedAnswer: any;
  showResults: boolean = false;
  quizResults: any[] = [];
  timer: number = 0; // The timer value in seconds
  timerInterval: any; // Timer interval reference
  totalDuration: number = 0;
  totalCorrectAnswers: number = 0; // Total correct answers
  totalIncorrectAnswers: number = 0; // Total incorrect answers
  totalObtainedPoints: number = 0; // Total obtained points

  constructor() {}

  ngOnInit() {
    this.loadQuestion(0); // Load the first question
    // Start the timer
    this.startTimer();
  }

  startTimer() {
    this.timer = 30; // Initialize the timer
    this.timerInterval = setInterval(() => {
      this.timer--; // Increment the timer by 1 second
      this.totalDuration++; // Increment total duration
    }, 1000); // Update the timer every second
  }

  loadQuestion(index: number) {
    this.currentQuestion = this.questions[index];
  }

  submitAnswer() {
    // Check if the selectedAnswer is correct
    const isCorrect = this.currentQuestion.answer.option === this.selectedAnswer;
    
    // Calculate and store obtainedPoints, duration, start, and end
    const questionResult = {
      givenAnswer: this.currentQuestion.options[this.selectedAnswer].value,
      obtainedPoints: isCorrect ? this.currentQuestion.correctPoint : this.currentQuestion.incorrectPoint,
      start: new Date(),
      end: new Date(),
      answer: isCorrect ? 'Correct' : 'Incorrect'
    };

    // Increment total correct answers when an answer is correct
    if (isCorrect) {
      this.totalCorrectAnswers++;
    } else {
      this.totalIncorrectAnswers++;
    }

    // Store the result for the current question
    this.quizResults.push({ [this.currentQuestion.id]: questionResult });
    
    // Move to the next question or show results if all questions are answered
    const nextIndex = this.questions.indexOf(this.currentQuestion) + 1;
    if (nextIndex < this.questions.length) {
      this.loadQuestion(nextIndex);
    } else {
      this.showResults = true;
    }

    // Stop the timer when all questions are answered
    if (this.questions.indexOf(this.currentQuestion) === this.questions.length - 1) {
      clearInterval(this.timerInterval);
    }
  }

  // Implement methods to retrieve question text, correct answers, and feedback
  getQuestionText(result: any): string {
    // Implement this method to return the question text for the result
    return this.questions.find(q => q.id === Object.keys(result)[0])?.question || 'Question not found';
  }

  getCorrectAnswer(result: any): string {
    // Implement this method to return the correct answer for the result
    return this.questions.find(q => q.id === Object.keys(result)[0])?.answer.value || 'Answer not found';
  }

  getFeedback(result: any): string {
    // Implement this method to return the feedback for the result
    let feedback = this.questions.find(q => q.id === Object.keys(result)[0])
    console.log(feedback)
    return feedback?.feedback[result[Object.keys(result)[0]].answer?.toLowerCase()] || '';;
  }
  getGivenAnswer(result: any) {
    return (Object.values(result)[0] as any)?.givenAnswer;
  }

  // Add this function to your component
formatTimer(seconds: number): string {
  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;
  const minutesStr: string = minutes < 10 ? `0${minutes}` : minutes.toString();
  const secondsStr: string = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds.toString();
  return `${minutesStr}:${secondsStr}`;
}

}

bootstrapApplication(McqQuizComponent);
