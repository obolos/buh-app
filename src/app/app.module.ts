import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AdminSystemModule } from './admin-system/admin-system.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserService } from './user.service';
import { HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthService } from './auth.service';
import { AuthGardService } from './auth.gard.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AdminSystemModule,
    HttpClientModule,
    HttpModule    
  ],
  providers: [UserService, AuthService, AuthGardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
