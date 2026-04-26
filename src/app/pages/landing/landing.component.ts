import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MenuItemComponent } from '../../components/menu-item/menu-item.component';
import { LanguageService } from '../../feature/language/language.service';
import { buildMenuGroups } from '../../feature/menu/menu-by-language.data';
import { MenuGroup, MenuSection } from '../../feature/menu/menu.data';

@Component({
	imports: [MenuItemComponent],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
	private readonly _languageService = inject(LanguageService);
	private readonly _viewportScroller = inject(ViewportScroller);

	protected readonly groups = computed(() => buildMenuGroups(this._languageService.language()));
	protected readonly selectedGroupId = signal('appetizers');
	protected readonly selectedSectionId = signal<string | null>(null);

	protected readonly activeGroup = computed(
		() => this.groups().find((group) => group.id === this.selectedGroupId()) ?? this.groups()[0],
	);

	protected readonly allLabel = computed(() => {
		const lang = this._languageService.language();
		switch (lang) {
			case 'ua':
				return 'Всі';
			case 'en':
				return 'All';
			case 'pl':
				return 'Wszystkie';
			case 'de':
				return 'Alle';
			case 'fr':
				return 'Tous';
			default:
				return 'All';
		}
	});

	protected readonly availableSections = computed(() => this.activeGroup()?.sections ?? []);

	protected readonly filteredSections = computed(() => {
		const sections = this.availableSections();
		const sectionId = this.selectedSectionId();

		if (!sectionId) {
			return sections;
		}

		return sections.filter((section) => section.id === sectionId);
	});

	protected setGroup(groupId: string) {
		if (this.selectedGroupId() === groupId) {
			return;
		}

		this.selectedGroupId.set(groupId);
		this.selectedSectionId.set(null);
		this._viewportScroller.scrollToPosition([0, 0]);
	}

	protected setSection(sectionId: string | null) {
		this.selectedSectionId.set(sectionId);
		this._viewportScroller.scrollToPosition([0, 0]);
	}

	protected trackByGroup(_: number, group: MenuGroup) {
		return group.id;
	}

	protected trackBySection(_: number, section: MenuSection) {
		return section.id;
	}
}
