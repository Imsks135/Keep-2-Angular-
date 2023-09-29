import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { AuthenticationService } from '../authentication.service';
import { Note } from '../note.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  notes: Note[] = [];
  newNote: Note = { id: 0, title: '', content: '' };
  isNotesExpanded: boolean = false;
  errMessage: string = '';

  constructor(
    private notesService: NotesService,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.notesService.getNotes().subscribe(
      (notes) => {
        this.notes = notes;
      },
      (error) => {
        console.log('Error fetching notes:', error);
        this.errMessage = 'Error fetching notes. Please try again later.';
      }
    );
  }

  addNote() {
    if (!this.newNote.title || !this.newNote.content) {
      this.errMessage = 'Both Title and Text fields are required.';
      return;
    }
    this.errMessage = '';
    this.notesService.addNote(this.newNote).subscribe(
      (note) => {
        this.notes.push(note);
        this.newNote = { id: 0, title: '', content: '' };
        this.errMessage = 'Note added successfully!';
      },
      (error) => {
        this.errMessage = 'Error adding note!';
      }
    );
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note.id).subscribe(
      () => {
        this.notes = this.notes.filter((n) => n.id !== note.id);
        this.errMessage = 'Note deleted successfully!';
      },
      (error) => {
        this.errMessage = 'Error deleting note!';
      }
    );
  }
}
