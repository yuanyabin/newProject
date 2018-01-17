import { UsersComponent } from './users/users.component';
import { UserformComponent } from './userform/userform.component';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PageRouteModule } from './page.routing.module';
import { PageComponent } from './page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LogOutService } from './page.service';

@NgModule({
    declarations: [
        UsersComponent,
        UserformComponent,
        PageComponent
    ],
    imports: [
        PageRouteModule,
        CommonModule,
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [LogOutService]
})

export class PageModule { }
