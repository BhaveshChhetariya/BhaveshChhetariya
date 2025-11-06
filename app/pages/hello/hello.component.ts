import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Hello component featuring an interactive Snake game
 * Implements proper error handling and accessibility features
 */
@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('snakeCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private errorState = false;
  
  /** Game state object containing all game-related data */
  game = {
    snake: [{ x: 150, y: 100 }],
    direction: { x: 0, y: 0 },
    food: { x: 0, y: 0 },
    score: 0,
    gameRunning: false,
    gameLoop: null as any
  };
  
  private readonly gridSize = 10;
  private tileCount = 30;
  
  gameStarted = false;
  gameCompleted = false;
  foodLeft = 5;

  ngOnInit() {
    try {
      this.setupKeyboardListeners();
    } catch (error) {
      console.error('Error setting up keyboard listeners:', error);
      this.errorState = true;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      try {
        this.initializeGame();
        this.handleResize();
        window.addEventListener('resize', this.handleResize.bind(this));
      } catch (error) {
        console.error('Error initializing game:', error);
        this.errorState = true;
      }
    }, 100);
  }

  ngOnDestroy() {
    try {
      if (this.game.gameLoop) {
        clearTimeout(this.game.gameLoop);
      }
      window.removeEventListener('resize', this.handleResize.bind(this));
      document.removeEventListener('keydown', this.handleKeyPress);
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }

  /** Handles canvas resize while maintaining aspect ratio */
  private handleResize() {
    try {
      if (this.canvasRef?.nativeElement && this.ctx) {
        const canvas = this.canvasRef.nativeElement;
        const container = canvas.parentElement;
        if (container) {
          const containerWidth = container.clientWidth;
          const containerHeight = container.clientHeight;
          
          // Maintain aspect ratio
          const size = Math.min(containerWidth - 40, containerHeight - 40, 300);
          canvas.width = 300;
          canvas.height = 200;
          this.tileCount = canvas.width / this.gridSize;
        }
        
        if (this.ctx) {
          this.drawGame();
        }
      }
    } catch (error) {
      console.error('Error handling resize:', error);
    }
  }

  /** Initializes the game canvas and context with error handling */
  private initializeGame() {
    if (!this.canvasRef?.nativeElement) {
      console.error('Canvas element not found');
      this.errorState = true;
      return;
    }

    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    
    if (!context) {
      console.error('Could not get canvas context');
      this.errorState = true;
      return;
    }

    this.ctx = context;
    
    // Set initial canvas size
    canvas.width = 300;
    canvas.height = 200;
    this.tileCount = canvas.width / this.gridSize;
    
    this.resetGame();
    this.generateFood();
    this.drawGame();
  }

  /** Resets game state to initial values */
  private resetGame() {
    this.game.snake = [{ x: 150, y: 100 }];
    this.game.direction = { x: 0, y: 0 };
    this.game.score = 0;
    this.game.gameRunning = false;
    this.foodLeft = 5;
    this.gameStarted = false;
  }

  /** Generates food at random position avoiding snake body */
  private generateFood() {
    if (!this.canvasRef?.nativeElement) return;

    const canvas = this.canvasRef.nativeElement;
    let newFood: { x: number; y: number };
    let attempts = 0;
    
    do {
      newFood = {
        x: Math.floor(Math.random() * (canvas.width / this.gridSize)) * this.gridSize,
        y: Math.floor(Math.random() * (canvas.height / this.gridSize)) * this.gridSize
      };
      attempts++;
    } while (
      this.game.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y) && 
      attempts < 100
    );
    
    this.game.food = newFood;
  }

  /** Renders the game state on canvas */
  private drawGame() {
    if (!this.canvasRef?.nativeElement || !this.ctx) return;

    try {
      const canvas = this.canvasRef.nativeElement;
      
      // Clear canvas
      this.ctx.fillStyle = '#011627';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw snake
      this.ctx.fillStyle = '#4caf50';
      this.game.snake.forEach(segment => {
        this.ctx.fillRect(segment.x, segment.y, this.gridSize - 2, this.gridSize - 2);
      });
      
      // Draw food
      this.ctx.fillStyle = '#ff6b6b';
      this.ctx.fillRect(this.game.food.x, this.game.food.y, this.gridSize - 2, this.gridSize - 2);
    } catch (error) {
      console.error('Error drawing game:', error);
    }
  }

  /** Main game loop with collision detection */
  private gameLoop = () => {
    if (!this.game.gameRunning) return;

    try {
      // Move snake
      const head = { ...this.game.snake[0] };
      head.x += this.game.direction.x;
      head.y += this.game.direction.y;

      // Check wall collision
      if (!this.canvasRef?.nativeElement) return;
      const canvas = this.canvasRef.nativeElement;
      
      if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        this.gameOver();
        return;
      }

      // Check self collision
      if (this.game.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        this.gameOver();
        return;
      }

      this.game.snake.unshift(head);

      // Check food collision
      if (head.x === this.game.food.x && head.y === this.game.food.y) {
        this.game.score++;
        this.foodLeft--;
        
        if (this.foodLeft <= 0) {
          this.gameWin();
          return;
        }
        
        this.generateFood();
      } else {
        this.game.snake.pop();
      }
      
      this.drawGame();
      this.game.gameLoop = setTimeout(this.gameLoop, 150);
    } catch (error) {
      console.error('Error in game loop:', error);
      this.gameOver();
    }
  }

  /** Handles game over state */
  private gameOver() {
    if (!this.canvasRef?.nativeElement || !this.ctx) return;

    try {
      this.game.gameRunning = false;
      clearTimeout(this.game.gameLoop);
      
      const canvas = this.canvasRef.nativeElement;
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = '20px Fira Code';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
      this.ctx.fillText('Click start to try again', canvas.width / 2, canvas.height / 2 + 30);
      
      this.gameStarted = false;
    } catch (error) {
      console.error('Error handling game over:', error);
    }
  }

  /** Handles game win state */
  private gameWin() {
    if (!this.canvasRef?.nativeElement || !this.ctx) return;

    try {
      this.game.gameRunning = false;
      clearTimeout(this.game.gameLoop);
      this.gameCompleted = true;
      
      const canvas = this.canvasRef.nativeElement;
      this.ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      this.ctx.fillStyle = '#4caf50';
      this.ctx.font = '18px Fira Code';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Well done!', canvas.width / 2, canvas.height / 2);
      this.ctx.fillText('You completed the game!', canvas.width / 2, canvas.height / 2 + 25);
    } catch (error) {
      console.error('Error handling game win:', error);
    }
  }

  /** Handles keyboard input with validation */
  handleKeyPress = (e: KeyboardEvent) => {
    if (!this.game.gameRunning || !e.key) return;
    
    try {
      const key = e.key;
      
      // Input validation - only allow arrow keys
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        return;
      }
      
      // Prevent reverse direction
      if (key === 'ArrowUp' && this.game.direction.y === 0) {
        this.game.direction = { x: 0, y: -this.gridSize };
        e.preventDefault();
      } else if (key === 'ArrowDown' && this.game.direction.y === 0) {
        this.game.direction = { x: 0, y: this.gridSize };
        e.preventDefault();
      } else if (key === 'ArrowLeft' && this.game.direction.x === 0) {
        this.game.direction = { x: -this.gridSize, y: 0 };
        e.preventDefault();
      } else if (key === 'ArrowRight' && this.game.direction.x === 0) {
        this.game.direction = { x: this.gridSize, y: 0 };
        e.preventDefault();
      }
    } catch (error) {
      console.error('Error handling key press:', error);
    }
  }

  /** Sets up keyboard event listeners */
  private setupKeyboardListeners() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  /** Starts the game with validation */
  startGame() {
    if (this.game.gameRunning || this.errorState) return;
    
    try {
      this.resetGame();
      this.generateFood();
      this.game.gameRunning = true;
      this.game.direction = { x: this.gridSize, y: 0 }; // Start moving right
      this.gameStarted = true;
      this.drawGame();
      this.gameLoop();
    } catch (error) {
      console.error('Error starting game:', error);
      this.errorState = true;
    }
  }

  /** Skips the game and enables GitHub link */
  skipGame() {
    try {
      this.gameCompleted = true;
      
      if (!this.canvasRef?.nativeElement || !this.ctx) return;

      const canvas = this.canvasRef.nativeElement;
      this.ctx.fillStyle = '#0d47a1';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      this.ctx.fillStyle = '#90caf9';
      this.ctx.font = '16px Fira Code';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Game skipped!', canvas.width / 2, canvas.height / 2);
      this.ctx.fillText('GitHub link is now active', canvas.width / 2, canvas.height / 2 + 25);
    } catch (error) {
      console.error('Error skipping game:', error);
    }
  }

  /** Opens GitHub profile with validation */
  openGithub() {
    if (this.gameCompleted) {
      try {
        // URL validation
        const url = 'https://github.com/bhavesh-username';
        if (url.startsWith('https://github.com/')) {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      } catch (error) {
        console.error('Error opening GitHub:', error);
      }
    }
  }

  /** Returns array for food dots display */
  getFoodDots(): number[] {
    return Array(5).fill(0).map((_, i) => i);
  }

  /** Returns error state for template */
  get hasError(): boolean {
    return this.errorState;
  }

  /** Returns game state description for accessibility */
  getGameStateDescription(): string {
    if (this.errorState) return 'Game error occurred';
    if (!this.gameStarted) return 'Snake game ready to start';
    if (this.gameCompleted) return 'Game completed successfully';
    if (this.game.gameRunning) return `Snake game in progress. Score: ${this.game.score}. Food left: ${this.foodLeft}`;
    return 'Game over. Press start to play again';
  }
}
