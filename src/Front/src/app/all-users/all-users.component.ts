import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';
import { UserInfo } from '../models/user-info';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent 
{
  users: UserInfo[] = [];  
  filteredUsers: UserInfo[] = [];
  sortOrder = "";
  selectedUserId: string | null = null;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void 
  {
    this.userService.getAllUsers().subscribe( users => {
        this.users = users;
    });

    
    this.activatedRoute.queryParams.subscribe(() => {
      this.userService.getAllUsers().subscribe( users => {
        this.users = users;
        this.filteredUsers = users;
      });
    });
  }

  showUserId(userId:string): void 
  {
    this.selectedUserId = userId;
    this.router.navigate(['/users/admin/all/' + userId]); 
  }

  search(event: Event): void
  {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();

    this.filteredUsers = this.users.filter(
      user => user.username.toLowerCase().includes(searchTerm))

    this.sortUsers(this.sortOrder);  
  }

  sortUsers(sortValue: string)
  {
    this.sortOrder = sortValue;
    if(this.sortOrder === "nameA-Z")
    {
      this.filteredUsers.sort((a, b) => a.username.localeCompare(b.username));
    }
    else if(this.sortOrder === "nameZ-A")
    {
      this.filteredUsers.sort((a, b) => b.username.localeCompare(a.username));
    }
    else if(this.sortOrder === "newest")
    {
      this.filteredUsers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    else if(this.sortOrder === "oldest")
    {
      this.filteredUsers.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
  }
}

