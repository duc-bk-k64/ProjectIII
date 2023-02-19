import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SubjectService } from 'src/app/app-management/service/subject.service';

@Component({
  selector: 'app-subject-management',
  templateUrl: './subject-management.component.html',
  styleUrls: ['./subject-management.component.scss'],
  providers: [
    SubjectService,
    ConfirmationService
  ]
})
export class SubjectManagementComponent implements OnInit {

  @ViewChild('table') table: Table | any;

  loading: boolean = true;
  listSubjects: any;
  clonedListSubjects: {[s: string]: any} = {};
  selectedSubject: any;
  showCreateDialog: boolean = false;

  newSubjectNote: string = '';
  newSubjectName: string = '';
  newSubjectCode: string = '';

  constructor(
    private _subjectService: SubjectService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ) { }

  async ngOnInit() {
    this.loading = true;
    try {
      await this._subjectService.getListSubjects().subscribe((response: any) => {
        this.listSubjects = response.content;
        this.loading = false;
      })
    } catch (error) {
      this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Đã xảy ra lỗi khi lấy danh sách môn học.' });
      this.loading = false;
    }
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.table!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  showCreateDialogFunc() {
    // this.listSubjects.unshift({});
    this.showCreateDialog = true;
  }

  onRowEditInit(subject: any) {
    this.clonedListSubjects[subject.id] = { ...subject };
  }

  async onRowEditSave(subject: any) {
    if (subject.subjectCode.length > 0 && subject.name.length > 0) {
      this.loading = true;
      await this._subjectService.updateSubject(subject.id, subject).subscribe((response: any) => {
        if (response?.id > 0) {
          delete this.clonedListSubjects[subject.id];
          this._messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Cập nhật môn học thành công.' });
        } else {
          this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Đã xảy ra lỗi khi cập nhật môn học.' });
        }
        this.loading = false;
      })
    }
    else {
      this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Không được để trống mã học phần và tên học phần' });
    }
  }

  onRowEditCancel(subject: any, index: number) {
    this.listSubjects[index] = this.clonedListSubjects[subject.id];
    delete this.clonedListSubjects[subject.id];
  }

  showDeleteDialogFunc(obj: any) {
    this._confirmationService.confirm({
      message: 'Bạn có chắc chắn xóa môn học này?',
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        // console.log(obj);
        this.loading = true;
        await this._subjectService.deleteSubject(obj.id).subscribe((response: any) => {
          if (response == "OK") {
            this.listSubjects = this.listSubjects.filter(function(e: any) {
              return e.subjectCode !== obj.subjectCode;
            });
            this._messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã xóa môn học thành công.' });
          } else {
            this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Đã xảy ra lỗi khi xóa môn học.' });
          }            
          this.loading = false;
        })
      }
    });
  }

  async insertSubject() {
    if (this.newSubjectCode.length > 0 && this.newSubjectName.length > 0) {
      this.loading = true;
      await this._subjectService.addSubject({
        name: this.newSubjectName,
        subjectCode: this.newSubjectCode,
        note: this.newSubjectNote,
        status: true
      }).subscribe((response : any) => {
        if (response?.id > 0) {
          this._messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã thêm môn học thành công.' });
          this.listSubjects.push(response);
          this.closeAddDialog();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Đã xảy ra lỗi khi thêm môn học.' });
        }
        this.loading = false;
      })
    } else {
      this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Cần nhập đầy đủ mã môn học và tên môn học.' });
    }
  }

  closeAddDialog() {
    this.newSubjectCode = '';
    this.newSubjectName = '';
    this.newSubjectNote = '';
    this.showCreateDialog = false;
  }
}
