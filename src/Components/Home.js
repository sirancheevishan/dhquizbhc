import React from "react";
import quizeService from "../quizService";

class QuizGuidlines extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      questionpage: false,
    };
  }
  bindquestion = () => {
    this.setState({
      questionpage: true,
    });
  };
  render() {
    if (this.state.questionpage === true) {
      return <Quizquestions></Quizquestions>;
    } else {
      return (
        <div>
          <div id="dvguidelines">
            <div class="clsresspn">
              <span>Quiz Competition - 2020</span>
            </div>
            <ul>
              <li>Time limit - 30 minutes</li>
              <li>
                Once Time is done, the Quiz will automatically close and
                redirect to result page.{" "}
              </li>
              <li>
                Each Question carries two mark with NO NEGATIVE MARKS for
                unanswered/wrong answer.{" "}
              </li>
              <li>
                Make sure you have uninterrupted internet connection during the
                exam.
              </li>
              <li>
                Ensure uninterrupted power supply during exam. If possible you
                can use laptop to ensure the power supply
              </li>
              <li>
                Please use latest Google Chrome browser for taking examination.{" "}
              </li>
              <li>The Timer will begin once you click start </li>
            </ul>
          </div>
          <div className="txtcenter">
            <input
              type="button"
              className="btn-quiz"
              value="start"
              onClick={this.bindquestion}
            />
          </div>
        </div>
      );
    }
  }
}

class Quizquestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemid: "",
      question: [],
      resultpage: false,
      correctanswer: 0,
      answeredquestion: 0,
    };
  }

  questionfun = () => {
    quizeService().then((question) => {
      console.log(question);
      this.setState({
        question: question,
      });
      console.log(this.state.question);
    });
  };
  componentDidMount() {
    this.questionfun();
  }

  selecteAnswer = (event) => {
    debugger;
    for (
      let index = 0;
      index < event.currentTarget.parentNode.childNodes.length;
      index++
    ) {
      event.currentTarget.parentNode.childNodes[index].className = "";
    }
    event.currentTarget.className = "active";

    this.setState({
      itemid: event.currentTarget.dataset.itemid.toString(),
      answeredquestion: this.state.answeredquestion + 1,
    });
    const selectedAnswerid = event.currentTarget.dataset.itemid.toString();
    const selectedAnswer = event.currentTarget.textContent.toString();
    var ansflag = false;
    this.state.question.map(function (val, index) {
      if (
        selectedAnswerid === val.questionId.toString() &&
        val.correct === selectedAnswer
      ) {
        ansflag = true;
      }
    });
    if (ansflag === true) {
      this.setState({
        correctanswer: this.state.correctanswer + 1,
      });
    }
  };
  redirectedtoresult = () => {
    this.setState({ resultpage: true });
  };
  render() {
    if (this.state.resultpage === true) {
      return (
        <Resultpage
          score={this.state.correctanswer * 2}
          correctans={this.state.correctanswer}
          noofattempt={this.state.answeredquestion}
        ></Resultpage>
      );
    } else {
      return (
        <div>
          <div id="dvquesbody">
            {this.state.question.length > 0 &&
              this.state.question.map(
                ({ question, answers, correct, questionId }, index) => (
                  <div className="col-md-12 clsqus">
                    <span>{index + 1 + ". "} </span>
                    <span>{question} </span>
                    <div className="clsqusoption">
                      <ul>
                        {answers.length > 0 &&
                          answers.map((val, index) => (
                            <li
                              data-itemid={questionId}
                              className=""
                              onClick={this.selecteAnswer}
                            >
                              <label>{val}</label>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                )
              )}
          </div>
          <div class="txtcenter">
            <input
              type="button"
              class="btn-finish"
              value="Finish"
              onClick={this.redirectedtoresult}
            />
          </div>
        </div>
      );
    }
  }
}

class quizbody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: [],
    };
  }
  questionfun = () => {
    quizeService().then((question) => {
      console.log(question);
      this.setState({
        question: question,
      });
      console.log(this.state.question);
    });
  };
  componentDidMount() {
    this.questionfun();
  }
  render() {
    return (
      <div className="container">
        <div>
          <div className="col-md-2"></div>
          <div className="col-md-8 txtcenter">
            <img src="http://bhc.edu.in/img/banner16.png" />
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="container row con-centre">
          <div className="col-md-9">
            <div className="dvquiz">
              <QuizGuidlines></QuizGuidlines>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Resultpage extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      homepage: false,
    };
  }
  gotohome = () => {
    debugger;
    this.setState({
      homepage: true,
    });
  };
  render() {
    if (this.state.homepage === true) {
      return <QuizGuidlines></QuizGuidlines>;
    } else {
      return (
        <div>
          <div id="dvguidelines">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <div className="col-md-12 txtcenter">
                  <span className="clsresspn">
                    {this.props.correctans > 5
                      ? "Congradualations"
                      : "Oops...!"}
                  </span>
                </div>
                <div class="col-md-12 txtcenter m-t-1">
                  <span className="clsrescorespn">
                    You have scrored: <span>{this.props.score}</span>
                  </span>
                </div>
                <div class="col-md-12 txtcenter m-t-1">
                  <span className="clsrescorespn">
                    No of correct answer: <span>{this.props.correctans}</span>
                  </span>
                </div>
                <div class="col-md-12 txtcenter m-t-1">
                  <span className="clsrescorespn">
                    No of Attempt Questions:{" "}
                    <span>{this.props.noofattempt}</span>
                  </span>
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
          <div className="txtcenter">
            <input
              type="button"
              className="btn-quiz"
              onClick={this.gotohome}
              value="Home"
            />
          </div>
        </div>
      );
    }
  }
}

export default quizbody;
