import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { ScrollService } from './services/scroll.service';
import { TranslatePipe, TranslateService } from '@wawjs/ngx-translate';

@Component({
	selector: 'app-root',
	imports: [RouterLink, RouterLinkActive, RouterOutlet, TopbarComponent, TranslatePipe],
	template: `
		<app-topbar />

		<div class="pb-24">
			<router-outlet />
		</div>

		<nav
			aria-label="Bottom navigation"
			class="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--c-border)] bg-[var(--c-bg-secondary)]/95 px-2 py-2 backdrop-blur supports-[backdrop-filter]:bg-[var(--c-bg-secondary)]/88"
		>
			<div class="mx-auto grid max-w-[var(--container)] grid-cols-5 gap-1">
				@for (item of translatedNavItems(); track item.label) {
					@if (item.route) {
						<a
							class="flex min-w-0 flex-col items-center justify-center gap-1 rounded-[0.9rem] px-1 py-2 text-[11px] font-medium text-[var(--c-text-muted)] transition-colors duration-200 hover:bg-[var(--c-bg-primary)]"
							[routerLink]="item.route"
							[routerLinkActiveOptions]="{ exact: item.exact }"
							routerLinkActive="bg-[color:rgba(197,61,61,0.1)] text-[var(--c-secondary)]"
						>
							<span class="material-symbols-outlined text-[21px]" aria-hidden="true">
								{{ item.icon }}
							</span>
							<span class="truncate">{{ item.translatedLabel }}</span>
						</a>
					} @else {
						<button
							class="flex min-w-0 flex-col items-center justify-center gap-1 rounded-[0.9rem] px-1 py-2 text-[11px] font-medium text-[var(--c-text-muted)] transition-colors duration-200 hover:bg-[var(--c-bg-primary)]"
							type="button"
						>
							<span class="material-symbols-outlined text-[21px]" aria-hidden="true">
								{{ item.icon }}
							</span>
							<span class="truncate">{{ item.translatedLabel }}</span>
						</button>
					}
				}
			</div>
		</nav>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	private readonly _scrollService = inject(ScrollService);
	private readonly _translateService = inject(TranslateService);

	private readonly navItems = [
		{ label: 'Menu', icon: 'restaurant_menu', route: '/', exact: true },
		{ label: 'Gallery', icon: 'photo_library', route: '/gallery', exact: true },
		{ label: 'Contacts', icon: 'share', route: '/socials', exact: true },
		{ label: 'Favorites', icon: 'favorite', route: '/favorites', exact: true },
		{ label: 'Nav', icon: 'navigation', route: '/navigation', exact: true },
	];

	protected readonly translatedNavItems = computed(() => {
		return this.navItems.map((item) => ({
			...item,
			translatedLabel: this._translateService.translate(item.label)(),
		}));
	});

	constructor() {
		this._scrollService.initialize();
	}
}
