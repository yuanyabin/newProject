import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';
import { UsersComponent } from './users/users.component';
import { UserformComponent } from './userform/userform.component';

const pageRoutes: Routes = [
    {
        path: '', component: PageComponent,
        children: [
            { path: 'users', component: UsersComponent },
            { path: 'users/:id', component: UserformComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(pageRoutes)],
    exports: [RouterModule]
})

export class PageRouteModule { }
