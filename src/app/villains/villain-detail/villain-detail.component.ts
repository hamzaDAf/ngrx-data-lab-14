import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Villain } from '../../core/model';

@Component({
  selector: 'app-villain-detail',
  templateUrl: './villain-detail.component.html',
  styleUrls: ['./villain-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VillainDetailComponent implements OnChanges {
  @Input() villain: Villain = {
    id: null,
    name: '',
    saying: ''
  };
  @Output() unselect = new EventEmitter<string>();
  @Output() add = new EventEmitter<Villain>();
  @Output() update = new EventEmitter<Villain>();

  @ViewChild('name', { static: true }) nameElement!: ElementRef;

  addMode = false;

  // form = this.fb.group({
  //   id: [],
  //   name: ['', Validators.required],
  //   saying: ['']
  // });

  form = this.fb.group({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    saying: new FormControl('')
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    this.setFocus();
    if (this.villain && this.villain.id) {
      this.form.patchValue(this.villain);
      this.addMode = false;
    } else {
      this.form.reset();
      this.addMode = true;
    }
  }

  addVillain(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.add.emit({ ...this.villain, ...value });
    }
    this.close();
  }

  close() {
    this.unselect.emit();
  }

  saveVillain(form: FormGroup) {
    if (this.addMode) {
      this.addVillain(form);
    } else {
      this.updateVillain(form);
    }
  }

  setFocus() {
    this.nameElement.nativeElement.focus();
  }

  updateVillain(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.update.emit({ ...this.villain, ...value });
    }
    this.close();
  }
}
