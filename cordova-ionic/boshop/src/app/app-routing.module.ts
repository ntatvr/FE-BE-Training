import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
 	{ path: 'home', loadChildren: './component/home/home.module#HomePageModule' },
 	{ path: 'cart/:message', loadChildren: './component/cart/cart.module#CartPageModule' }
];
@NgModule({
	imports: [
	RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
