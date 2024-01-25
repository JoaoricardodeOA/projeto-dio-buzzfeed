import { Component, OnInit } from '@angular/core';
import  quiz_questions from "../../..//assets/data/quiz_questions.json"

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{
playerChoose(value:string) {
  this.answers.push(value)
  this.nextStep()
}
nextStep(){
  this.questionIndex++
  if(this.questionIndex<this.questionMaxIndex){
    this.questionSelected = this.questions[this.questionIndex]
  }else{
    this.finished = true
    this.answerSelected = quiz_questions.results[this.checkResult(this.answers) as keyof typeof quiz_questions.results]
  }
}
 checkResult(answers:string[]){
 const result = answers.reduce((previous, current, i, arr)=>{
    if(arr.filter(item=>item === previous).length >
      arr.filter(item=>item === current).length ){
        return previous
    }else{
      return current
    }
  })
  return result
}
  title:string="Título"
  questions:any
  questionSelected:any
  answers:string[] = []
  answerSelected = ''
  questionIndex:number = 0
  questionMaxIndex:number = 0
  finished:boolean = false 
  ngOnInit(): void {
    if(quiz_questions){
      this.finished = false
      this.title = quiz_questions.title

      this.questions = quiz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionMaxIndex = this.questions.length
    }
  }

}
