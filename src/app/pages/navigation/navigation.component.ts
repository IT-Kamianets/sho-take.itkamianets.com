import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateDirective } from '@wawjs/ngx-translate';

@Component({
	imports: [RouterLink, TranslateDirective],
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
	protected readonly navItems = [
		{ label: 'Sales', description: 'Special offers and discounts', badge: '01', icon: 'sell', route: '/sales' },
		{ label: 'Reviews', description: 'What our customers say', badge: '02', icon: 'rate_review', route: '/reviews' },
		{ label: 'Events', description: 'News and upcoming events', badge: '03', icon: 'event', route: '/events' },
		{ label: 'Gallery', description: 'Photo gallery', badge: '04', icon: 'photo_library', route: '/gallery' },
		{ label: 'Contacts', description: 'Our social networks', badge: '05', icon: 'share', route: '/socials' },
		{ label: 'Favorites', description: 'Your favorite items', badge: '06', icon: 'favorite', route: '/favorites' },
	];
}
