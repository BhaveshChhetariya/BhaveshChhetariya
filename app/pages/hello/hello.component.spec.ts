import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelloComponent } from './hello.component';

/**
 * Unit tests for HelloComponent
 * Tests basic functionality and error handling
 */
describe('HelloComponent', () => {
  let component: HelloComponent;
  let fixture: ComponentFixture<HelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize game state correctly', () => {
    expect(component.game.snake).toEqual([{ x: 150, y: 100 }]);
    expect(component.game.score).toBe(0);
    expect(component.game.gameRunning).toBeFalse();
    expect(component.foodLeft).toBe(5);
  });

  it('should handle error state', () => {
    expect(component.hasError).toBeFalse();
  });

  it('should return correct game state description', () => {
    expect(component.getGameStateDescription()).toBe('Snake game ready to start');
  });

  it('should generate food dots array', () => {
    const dots = component.getFoodDots();
    expect(dots).toEqual([0, 1, 2, 3, 4]);
  });

  it('should not start game when already running', () => {
    component.game.gameRunning = true;
    const initialState = { ...component.game };
    
    component.startGame();
    
    expect(component.game).toEqual(initialState);
  });

  it('should skip game and set completed state', () => {
    component.skipGame();
    expect(component.gameCompleted).toBeTrue();
  });

  it('should validate GitHub URL before opening', () => {
    spyOn(window, 'open');
    component.gameCompleted = true;
    
    component.openGithub();
    
    expect(window.open).toHaveBeenCalledWith(
      'https://github.com/bhavesh-username',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('should not open GitHub when game not completed', () => {
    spyOn(window, 'open');
    component.gameCompleted = false;
    
    component.openGithub();
    
    expect(window.open).not.toHaveBeenCalled();
  });
});
