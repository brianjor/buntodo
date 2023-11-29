import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TodoService } from './todo.service';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent, HttpClientModule],
			providers: [TodoService],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
