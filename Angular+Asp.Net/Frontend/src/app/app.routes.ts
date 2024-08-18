import { Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FleetComponent } from './components/fleet/fleet.component';
import { ServicesComponent } from './components/services/services.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BookComponent } from './components/book/book.component';
import { ViewDetailsComponent } from './components/view-details/view-details.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { GuideManagementComponent } from './components/guide-management/guide-management.component';
import { CarManagementComponent } from './components/car-management/car-management.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ProfileManagementComponent } from './components/profile-management/profile-management.component';
import { BookingManagementComponent } from './components/booking-management/booking-management.component';
import { CarAvailabilityComponent } from './components/car-availability/car-availability.component';
import { GuideAvailabilityComponent } from './components/guide-availability/guide-availability.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
//import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { BillPageComponent } from './components/bill-page/bill-page.component';
import { PayPageComponent } from './components/pay-page/pay-page.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { PaymentSuccesComponent } from './components/payment-succes/payment-succes.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { PaymentFailureComponent } from './components/payment-failure/payment-failure.component';
import { GuideUpdateComponent } from './components/guide-update/guide-update.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';



CarAvailabilityComponent

export const routes: Routes = [

    {path:'about' , component:AboutUsComponent},
    {path:'home' , component:HomeComponent},
    {path:'contact' , component:ContactUsComponent},
    {path:'fleet' , component:FleetComponent},
    {path:'service' , component:ServicesComponent},
    {path:'signin' , component:SignInComponent},
    {path:'login' , component:LoginComponent},
    {path:'book' , component:BookComponent},
    {path:'details' , component:ViewDetailsComponent},
    {path:'adminhome' , component:AdminDashboardComponent},
    {path:'admin-dashboard' , component:AdminDashboardComponent},
    {path:'guide-management' , component:GuideManagementComponent},
    {path:'car-management' , component:CarManagementComponent},
    { path: 'profile-management', component: ProfileManagementComponent },
    { path: 'booking-management', component: BookingManagementComponent },
    { path: 'car-availability', component: CarAvailabilityComponent },
    { path: 'guide-availability', component: GuideAvailabilityComponent },
    { path: 'user-dashboard', component: UserDashboardComponent},
    { path: 'profile', component: ProfileComponent},
        { path: 'order-details', component: OrderDetailsComponent},
    { path: 'car-availability', component: CarAvailabilityComponent},
    { path: 'guide-availability', component: GuideAvailabilityComponent},
    { path: 'update', component: UpdateUserComponent},
    { path: 'bill', component: BillPageComponent},
    { path: 'pay', component: PayPageComponent},
    { path: 'bill', component: BillPageComponent},
    { path: 'confirmation', component: ConfirmationComponent},
    { path: 'payment', component: PaymentSuccesComponent},
    { path: 'order-details', component: OrderDetailsComponent },
    { path: 'bill', component: BillPageComponent },
    {path: 'payment-form', component: PaymentFormComponent },
    {path : 'payment-failure', component: PaymentFailureComponent },
    {path: 'guide-update' , component:GuideUpdateComponent},
    {path: 'car-update' , component: CarUpdateComponent},
    {path: 'user-management',component:UserManagementComponent}
       
      
      
];

