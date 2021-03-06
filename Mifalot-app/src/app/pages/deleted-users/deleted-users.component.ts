import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { AF } from "../.././providers/af";
import { ShareService } from "../../providers/share-service";

@Component({
  templateUrl: './deleted-users.component.html',
  styleUrls: ['./deleted-users.component.css']
})
export class DeletedUsersComponent implements OnInit 
{
  private header = 
  { 
     title: "משתמשים העומדים להסרה", 
     subTitle: "מוצגים משתמשים העומדים להמחק מן המערכת",
     icon: "fa-user-times" 
  }

  // Flags
  private userSelected: boolean;
  private isLoading: boolean;

  private user: any;
  private users: FirebaseListObservable<any[]>;

  // For nav component
  private backButton;

  // Pointer to subscribe
  private usersSubsPtr;

  private currentUser;

  // =====================

  constructor(private afService: AF, private shareService: ShareService) 
  {
    this.userSelected = false;
    this.currentUser = this.afService.getUserDetails();
    this.getUsers();
  }

  // =====================
  // Get users from DB

  getUsers()
  {
    this.isLoading = true;

     this.users = this.afService.af.database.list('registeredUsers');
     this.usersSubsPtr = this.users.subscribe(() => {
       this.isLoading = false;
     })
  }

  // =====================

  showUserDetails(user)
  {
    this.user = user;
    this.userSelected = true;
    this.shareService.updateBackButton('back');
  }

  // =====================

  sendUserToConfirmation()
  {
    if (confirm("האם ברצונך לבטל את הסרתו של משתמש זה?"))
    {
      this.users.update(this.user.$key, { permission: 4 }).then( () => 
      {
        alert('שים לב: המשתמש' + ' ' + this.user.name + ' ' + this.user.lastName + ' ' + 'הועבר לרשימת הממתינים לאישור');
        this.resetAll();
      })
    }
  }

  // =====================

  resetAll()
  {
    this.getUsers();
    this.user = null;
    this.userSelected = false;
    this.shareService.updateBackButton('home');
  }

  // =====================
  
  unsubscribeAll()
  {
    if (this.usersSubsPtr)
      this.usersSubsPtr.unsubscribe();
  }

  // =====================
   navigate()
  {
    // Home page
    if (!this.userSelected)
    {
      this.unsubscribeAll();
      this.shareService.navigate('');
    }
    
    if (this.userSelected)
      this.resetAll();
  }

  // =====================

  ngOnInit() 
  {
    // Initialize button values
    this.backButton = this.shareService.getButton();
    this.shareService.updateBackButton('home');
  }

  // =====================

}
