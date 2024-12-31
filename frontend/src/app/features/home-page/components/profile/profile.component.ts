import {Component} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../../core/store/root.reducer";
import {filter, Observable} from "rxjs";
import {Language, ProfileSmall, UserStateModel} from "../../../../core/models/user.model";
import {selectErrorMessage, selectUser, selectUserConnections} from "../../../../core/store/user/user.selectors";
import {CommonModule} from "@angular/common";
import {
  ConnectionsFetchAction,
  EditProfileFetchAction,
  InterestsFetchAction,
  SetUserPhotoFetchAction,
  UserDataFetchAction
} from "../../../../core/store/user/user.actions";
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserConnection, UserConnectionsType, UserConnectionUIModel} from "../../../../core/models/profile.model";
import {HttpService} from "../../../../core/services/http.service";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [CommonModule, ModalComponent, ReactiveFormsModule, FormsModule, TranslatePipe],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user$: Observable<UserStateModel | null>;
  connections: UserConnection[];
  error$: Observable<string>;

  isEditProfileModalVisible: boolean = false;
  isAddConnectionsModalOpen: boolean = false;
  previewUrl: string | ArrayBuffer | null = null;
  file: File;
  user: ProfileSmall;
  isLoading: boolean = false;

  editProfileForm: FormGroup;

  userConnectionsUI: UserConnectionUIModel[] = [
    {
      name: UserConnectionsType.INSTAGRAM,
      value: '',
      newValue: '',
    },
    {
      name: UserConnectionsType.LINKED_IN,
      value: '',
      newValue: '',
    },
    {
      name: UserConnectionsType.TELEGRAM,
      value: '',
      newValue: '',
    },
    {
      name: UserConnectionsType.FACEBOOK,
      value: '',
      newValue: '',
    },
    {
      name: UserConnectionsType.X,
      value: '',
      newValue: '',
    }
  ];

  protected readonly Language = Language;

  constructor(
    private store: Store<AppState>,
    private http: HttpService,
  ) {
    this.store.dispatch(new UserDataFetchAction());
    this.user$ = this.store.pipe(select(selectUser));
    this.store.pipe(select(selectUserConnections)).subscribe(connections => {
      this.connections = connections.connections;
      this.prepareConnections(connections.connections);
    })
    this.error$ = this.store.pipe(select(selectErrorMessage));

    this.user$.pipe(filter(user => user !== null)).subscribe(res => {
      if (res) {
        this.setUpEditProfileForm(res);
        this.user = {
          bio: res.bio,
          fullName: res.fullName,
          username: res.username,
          dateOfBirth: res.dateOfBirth,
          language: res.language,
          phoneNumber: res.phoneNumber
        };
        this.store.dispatch(new ConnectionsFetchAction(res.id));
        this.store.dispatch(new InterestsFetchAction(res.id));
      }
    });
  }

  setUpEditProfileForm(user: UserStateModel): void {
    const dateOfBirth = user.dateOfBirth.split('T')[0];

    this.editProfileForm = new FormGroup({
      image: new FormControl(),
      fullName: new FormControl(user.fullName, [Validators.required]),
      username: new FormControl(user.username, [Validators.required]),
      dateOfBirth: new FormControl(dateOfBirth, [Validators.required]),
      phoneNumber: new FormControl(user.phoneNumber, [Validators.required, Validators.pattern(/^\+380\d{9}$/)]),
      bio: new FormControl(user.bio),
      language: new FormControl(user.language, [Validators.required]),
    });
  }

  closeEditProfileModal() {
    this.isEditProfileModalVisible = false;
  }

  closeAddConnectionsModal() {
    this.isAddConnectionsModalOpen = false;
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = () => {
        const binaryString = reader.result as string;
        const base64String = btoa(binaryString); // Конвертуємо у Base64
        this.previewUrl = 'data:image/jpeg;base64,' + base64String; // Додаємо префікс для зображення
      };
      reader.readAsBinaryString(this.file);
    }
  }

  submitForm() {
    this.isLoading = true;
    if (JSON.stringify(this.prepareUpdatedData()) !== '{}') {
      const { language } = this.prepareUpdatedData();

      if(language) {
        localStorage.setItem('language', language);
      }

      this.store.dispatch(new EditProfileFetchAction(this.prepareUpdatedData()));
    }
    if (this.file) {
      this.store.dispatch(new SetUserPhotoFetchAction({image: this.file}))
    }
    setTimeout(() => {
      this.isEditProfileModalVisible = false;
    }, 2000)
  }

  get isAvailableToSave(): boolean {
    return JSON.stringify(this.prepareUpdatedData()) !== '{}' || !!this.file;
  }

  private prepareUpdatedData(): Partial<ProfileSmall> {
    const updatedData: Partial<ProfileSmall> = {};
    const formControls = this.editProfileForm.controls;

    (Object.keys(formControls) as Array<keyof ProfileSmall>).forEach(key => {
      // @ts-ignore
      if (key === 'image') {
        return;
      }

      let formValue = formControls[key].value;

      if (key === 'dateOfBirth') {
        formValue = new Date(formValue).toISOString();
      }

      if (formValue !== this.user[key]) {
        updatedData[key] = formValue;
      }
    });

    return updatedData;
  }

  prepareConnections(connections: UserConnection[]): void {
    connections.forEach((connection) => {
      this.userConnectionsUI.forEach((el, i) => {
        if (el.name === connection.type) {
          this.userConnectionsUI[i].value = connection.url;
        }
      })
    })
  }

  saveConnection(type: UserConnectionsType, url: string) {
    this.http.addConnections({type, url}).subscribe(connections => {
      this.connections = connections;
      this.prepareConnections(connections);
    });
  }
}
