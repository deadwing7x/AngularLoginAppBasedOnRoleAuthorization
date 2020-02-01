import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import * as jQuery from 'jquery';
import { User } from 'src/app/_models';
import { UserService } from 'src/app/_services';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
    loading = false;
    users: User[] = [];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
        jQuery(document).ready(() => {
            let d = new Date();
            jQuery('#month').text(new Date().getMonth() + 1);
            jQuery('#date').text(new Date().getDate());
            jQuery('#year').text(new Date().getFullYear());
            let month = (d.getMonth() + 1).toString();
            let date = (d.getDate()).toString();
            let year = (d.getFullYear()).toString();
            let url: string;
            for (let i = 1; i <= 3; i++) {
                switch (i) {
                    case 1: url = 'http://numbersapi.com/' + month + '/trivia?notfound=floor&fragment';
                            jQuery.get(url, (data) => {
                            jQuery('#month-text').text('is ' + data);
                            });
                            break;
                    case 2: url = 'http://numbersapi.com/' + date + '/trivia?notfound=floor&fragment';
                            jQuery.get(url, (data) => {
                            jQuery('#date-text').text('is ' + data);
                            });
                            break;
                    case 3: url = 'http://numbersapi.com/' + year + '/trivia?';
                            jQuery.get(url, (data) => {
                            jQuery('#year-text').text(data);
                            });
                            break;
                }
            }
        });
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }
}
