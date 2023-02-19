import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Answer, Question, SubjectDropdown } from 'src/app/app-management/api/question-management';
import { AnswerService } from 'src/app/app-management/service/answer.service';
import { QuestionService } from 'src/app/app-management/service/question.service';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent implements OnInit {

  @ViewChild('table') table: Table | any;

  loading: boolean = false;
  listQuestions: any;
  listQuestionsInit: any;
  selectedQuestion: any;
  subjects: SubjectDropdown[] = [];
  selectedSubject: SubjectDropdown = {};
  listAnswers: Answer[] = [];
  clonedListAnswers: { [s: number]: Answer } = {};
  isCreate: boolean = false;
  count: number = 0;

  // dialog variable
  showDialog: boolean = false;
  questionModel: Question = {};
  listAnswerModel: Answer[] = [];
  dialogTitle: string = '';
  questionTypes: any[] = [
    {
      key: 'SINGLE_SELECT',
      value: 'SINGLE_SELECT'
    },
    {
      key: 'MULTIPLE_SELECT',
      value: 'MULTIPLE_SELECT'
    },
    {
      key: 'FILL_IN_BLANK',
      value: 'FILL_IN_BLANK'
    }
  ];
  questionLevels: any[] = [
    {
      key: 'EASY',
      value: 'EASY'
    },
    {
      key: 'MEDIUM',
      value: 'MEDIUM'
    },
    {
      key: 'DIFFICULT',
      value: 'DIFFICULT'
    }
  ];

  constructor(
    private _questionService: QuestionService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _answerService: AnswerService
  ) { }

  async ngOnInit() {
    this.loading = true;
    try {
      await this._questionService.getListSubjects().subscribe((response: any) => {
        response.content.forEach((e: any) => {
          let tmp = {
            key: e.id,
            value: e.subjectCode + ' - ' + e.name
          };
          this.subjects.push(tmp);
        });
      })
    } catch (error) {
      this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Đã xảy ra lỗi khi lấy danh sách môn học.' });
    }

    try {
      await this._questionService.getListQuestions().subscribe((response: any) => {
        this.listQuestions = response.content;
        this.listQuestionsInit = response.content;
      })
    } catch (error) {
      this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Đã xảy ra lỗi khi lấy danh sách câu hỏi.' });
    }

    try {
      await this._answerService.getListAnswers().subscribe((response: any) => {
        response.content.forEach((e: any) => {
          e.questionId = e.question.id;
        })
        this.listAnswers = response.content;
        this.loading = false;
      });
    } catch (error) {
      this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Đã xảy ra lỗi khi lấy danh sách câu hỏi.' });
      this.loading = false;
    }
  }

  showCreateDialogFunc() {
    if (this.selectedSubject != null && this.selectedSubject?.key != null) {
      this.onResetData();
      this.showDialog = true;
      this.isCreate = true;
      this.dialogTitle = 'Thêm mới câu hỏi';
    } else {
      this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Bạn chưa chọn học phần.' });
      return;
    }
  }

  filterBySubjectId() {
    if (this.selectedSubject != null) {
      this.listQuestions = this.listQuestionsInit.filter((e: any) => e.subject.id == this.selectedSubject.key);
    } else {
      this.listQuestions = this.listQuestionsInit;
    }
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.table!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  showUpdateDialogFunc(obj: any) {
    this.onResetData();
    this.isCreate = false;
    this.questionModel = obj;
    this.dialogTitle = 'Cập nhật câu hỏi';

    if (this.selectedSubject == null || this.selectedSubject.key == null) {
      this.selectedSubject = this.subjects.filter((e: SubjectDropdown) => e.key == obj.subject.id)[0];
    }
    this.listAnswers.forEach(e => {
      if (e.questionId == this.questionModel.id) {
        this.listAnswerModel.push(e);
      }
    });
    this.showDialog = true;
  }

  // onTypeSelected() {
  //   if (this.questionModel.type?.toString == this.questionTypes[0].key) {
  //     this.questionModel.numberOfCorrectAnswer = 1;
  //   }
  // }

  // onNumberOfAnswerChange() {
  //   if (this.questionModel.type?.toString == this.questionTypes[2].key) {
  //     this.questionModel.numberOfCorrectAnswer = this.questionModel.numberOfAnswer;
  //   }
  // }

  addAnswer() {
    this.count--;
    let answerTmp: Answer = {id: this.count, questionId: this.questionModel?.id, isCorrect: false, note: ''};
    this.listAnswerModel.push(answerTmp);
  }

  onRowEditInit(answer: Answer) {
    this.clonedListAnswers[answer.id] = { ...answer };
  }

  async onRowEditSave(answer: Answer) {
    if (answer.content == null) {
      this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Không được để trống nội dung câu hỏi' });
    }
    if (answer.id > 0) {
      this.loading = true;
      await this._answerService.updateAnswer(answer.id, {
        content: answer.content,
        isCorrect: answer.isCorrect,
        note: answer.note
      }).subscribe((response: any) => {
        if (response?.id > 0) {
          this._messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Cập nhật câu trả lời thành công.' });
        } else {
          this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Đã xảy ra lỗi khi cập nhật câu trả lời.' });
          this.loading = false;
          return;
        }
      })
    }
    delete this.clonedListAnswers[answer.id];
    this.loading = false;
  }

  onRowEditCancel(subject: any, index: number) {
    this.listAnswerModel[index] = this.clonedListAnswers[subject.id];
    delete this.clonedListAnswers[subject.id];
  }

  showDeleteDialogFunc(obj: any, type: string) {
    if (type == 'question') {
      this._confirmationService.confirm({
        message: 'Bạn có chắc chắn xóa câu hỏi này?',
        header: 'Thông báo',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          this.loading = true;
          await this._questionService.deleteQuestion(obj.id).subscribe((response: any) => {
            if (response == "OK") {
              this.listQuestionsInit = this.listQuestionsInit.filter((e: any) => e.id != obj.id);
              this.listQuestions = this.listQuestionsInit;
              this._messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã xóa câu hỏi thành công.' });
            } else {
              this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Đã xảy ra lỗi khi xóa câu hỏi.' });
            }
            this.loading = false;
          })
        }
      });
    } else {
      if (obj.id <= 0) {
        this.listAnswerModel = this.listAnswerModel.filter(e => e.id != obj.id);
      } else {
        this._confirmationService.confirm({
          message: 'Bạn có chắc chắn xóa đáp án này?',
          header: 'Thông báo',
          icon: 'pi pi-exclamation-triangle',
          accept: async () => {
            this.loading = true;
            await this._answerService.deleteAnswer(obj.id).subscribe((response: any) => {
              if (response == "OK") {
                this.listAnswerModel = this.listAnswerModel.filter(e => e.id != obj.id);
                this.listAnswers = this.listAnswers.filter(e => e.id != obj.id);
                this._messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã xóa đáp án thành công.' });
              } else {
                this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Đã xảy ra lỗi khi xóa đáp án.' });
              }
              this.loading = false;
            })
          }
        });
      }
    }
  }

  async onSave() {
    if (!this.questionModel.content || !this.questionModel.type || !this.questionModel.level) {
      return;
    }
    
    let numberOfCorrectAnswerTmp = 0;
    this.listAnswerModel.forEach(e => {
      if (e.isCorrect) {
        numberOfCorrectAnswerTmp++;
      }
    });
    this.questionModel.numberOfCorrectAnswer = numberOfCorrectAnswerTmp;
    this.questionModel.numberOfAnswer = this.listAnswerModel.length;

    if (this.questionModel.numberOfCorrectAnswer && this.questionModel.numberOfCorrectAnswer <= 0) {
      this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Số lượng câu trả lời đúng phải lớn hơn 0' });
      return;
    } 

    if (this.questionModel.numberOfAnswer && this.questionModel.numberOfAnswer <= 0) {
      this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Số lượng câu trả lời phải lớn hơn 0' });
      return;
    } 

    if (this.questionModel.type == this.questionTypes[0].key
      && this.questionModel.numberOfCorrectAnswer && this.questionModel.numberOfCorrectAnswer != 1) {
      this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Với câu hỏi dạng SINGLE_SELECT chỉ được một đáp án đúng.' });
      return;
    }

    if (this.questionModel.type == this.questionTypes[2].key
      && this.questionModel.numberOfCorrectAnswer && this.questionModel.numberOfAnswer
      && this.questionModel.numberOfCorrectAnswer != this.questionModel.numberOfAnswer) {
      this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Với câu hỏi dạng điền thì tất cả đáp án đều phải là đáp án đúng.' });
      return;
    }

    if (this.isCreate) {
      this.questionModel.subjectId = this.selectedSubject.key;
      this.loading = true;
      await this._questionService.addQuestion({
        "content": this.questionModel.content,
        "images": [],
        "type": this.questionModel.type,
        "numberOfAnswer": this.questionModel.numberOfAnswer,
        "numberOfCorrectAnswer": this.questionModel.numberOfCorrectAnswer,
        "level": this.questionModel.level,
        "status": true,
        "note": this.questionModel.note,
        "subjectId": this.questionModel.subjectId,
        "answers": []
      }).subscribe((response: any) => {
        if (response?.id) {
          this.listAnswerModel.forEach(async e => {
            e.questionId = response.id;
            await this._answerService.addAnswer({
              "content": e.content,
              "images": [],
              "isCorrect": e.isCorrect,
              "status": true,
              "note": e.note,
              "questionId": e.questionId
            }).subscribe((res: any) => {
              if (res?.id > 0) {
                res.questionId = res.question.id;
                this.listAnswers.push(res);
              } else {
                this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Đã xảy ra lỗi khi tạo câu hỏi.' });
                this.loading = false;
                return;
              }
            });
          });
          this.listQuestionsInit.push(response);
          this.listQuestions = this.listQuestionsInit;
          this._messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã tạo câu hỏi thành công.' });
          this.loading = false;
          this.onCloseDialog();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Đã xảy ra lỗi khi tạo câu hỏi.' });
          this.loading = false;
        }
      });
    } else {
      this.loading = true;
      await this._questionService.updateQuestion(this.questionModel.id, {
        "content": this.questionModel.content,
        "type": this.questionModel.type,
        "numberOfAnswer": this.questionModel.numberOfAnswer,
        "numberOfCorrectAnswer": this.questionModel.numberOfCorrectAnswer,
        "level": this.questionModel.level,
        "note": this.questionModel.note,
      }).subscribe((response: any) => {
        if (response?.id) {
          this.listAnswerModel.forEach(async e => {
            if (e.id <= 0) {
              e.questionId = response.id;
              await this._answerService.addAnswer({
                "content": e.content,
                "images": [],
                "isCorrect": e.isCorrect,
                "status": true,
                "note": e.note,
                "questionId": e.questionId
              }).subscribe((res: any) => {
                if (res?.id > 0) {
                  res.questionId = res.question.id;
                  this.listAnswers.push(res);
                } else {
                  this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Đã xảy ra lỗi khi cập nhật câu hỏi.' });
                  this.loading = false;
                  return;
                }
              });
            }
          })
          this._messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã cập nhật câu hỏi thành công.' });
          this.loading = false;
          this.onCloseDialog();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Đã xảy ra lỗi khi cập nhật câu hỏi.' });
          this.loading = false;
        }
      });
    }
  }

  onCloseDialog() {
    this.onResetData();
    this.showDialog = false;
  }

  onResetData() {
    this.questionModel = {};
    this.listAnswerModel = [];
    this.clonedListAnswers = {};
  }
}
