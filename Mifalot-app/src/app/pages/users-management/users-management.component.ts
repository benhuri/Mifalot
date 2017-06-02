import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { AF } from "../.././providers/af";

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit 
{
  private header = 
  { 
     title: "ניהול משתמשים", 
     subTitle: "שינוי וחסימת משתמשים פעילים",
     icon: "fa-users" 
  }

  // Flags
  private userSelected: boolean;
  private userConfirmed: boolean;
  private chooseTeams: boolean;

  // String
  private userType: string;

  // Array
  private selectedTeams;

  private user: any;
  private users: FirebaseListObservable<any[]>;
  private teams: FirebaseListObservable<any[]>;

  // =====================

  constructor(private afService: AF) 
  {
    this.userSelected = this.userConfirmed = this.chooseTeams = false;
    this.selectedTeams = [];
    this.users = this.afService.af.database.list('registeredUsers');
    this.teams = this.afService.af.database.list('teams');
  }

  // =====================

  showUserDetails(user)
  {
    this.user = user;
    this.userSelected = true;
  }

  // =====================
  // Changing user permission to 5 to block him 
  // Release all teams that he had owned

  blockUser()
  {

    this.users.update(this.user.$key, { permission: 5 }).then(()  => 
    {
      this.teams.subscribe((snapshots) => 
      {
        snapshots.forEach((snapshot) => 
        { // Coach
          if (this.user.permission == 3)
          {
            if (this.user.$key == snapshot.coachID)
              this.teams.update(snapshot.$key, {coachID: ''});
          }
          // Manager
          else if (this.user.permission == 2)
          {
            if (this.user.$key == snapshot.managerID)
              this.teams.update(snapshot.$key, {managerID: ''});
          }
        })
      })
      alert("המשתמש נחסם וכל הקבוצות שהיו תחתיו התפנו")
      this.userSelected = false;
    });
  }

  // =====================

  ngOnInit() { }

}
