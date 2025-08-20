import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    this.setupKeyboardListeners();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeGame();
      this.handleResize();
      window.addEventListener('resize', this.handleResize.bind(this));
    }, 100);
  }

  ngOnDestroy() {
    if (this.game.gameLoop) {
      clearTimeout(this.game.gameLoop);
    }
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  private handleResize() {
    if (!this.canvasRef?.nativeElement) return;
    
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement;
    
    if (container) {
      const containerWidth = container.clientWidth;
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Mobile responsive canvas sizing
        const maxWidth = Math.min(containerWidth - 20, 280);
        const aspectRatio = 200 / 300; // height / width
        
        canvas.style.width = maxWidth + 'px';
        canvas.style.height = (maxWidth * aspectRatio) + 'px';
        
        // Update canvas internal dimensions
        canvas.width = 300;
        canvas.height = 200;
      } else {
        // Desktop sizing
        canvas.style.width = '300px';
        canvas.style.height = '200px';
        canvas.width = 300;
        canvas.height = 200;
      }
      
      // Redraw game after resize
      if (this.ctx) {
        this.drawGame();
      }
    }
  }

  private initializeGame() {
    if (!this.canvasRef?.nativeElement) {
      console.error('Canvas element not found');
      return;
    }

    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    
    if (!context) {
      console.error('Could not get canvas context');
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

  private resetGame() {
    this.game.snake = [{ x: 150, y: 100 }];
    this.game.direction = { x: 0, y: 0 };
    this.game.score = 0;
    this.game.gameRunning = false;
    this.foodLeft = 5;
    this.gameStarted = false;
  }

  private generateFood() {
    if (!this.canvasRef?.nativeElement) return;

    const canvas = this.canvasRef.nativeElement;
    this.game.food = {
      x: Math.floor(Math.random() * this.tileCount) * this.gridSize,
      y: Math.floor(Math.random() * (canvas.height / this.gridSize)) * this.gridSize
    };
    
    // Make sure food doesn't spawn on snake
    for (let segment of this.game.snake) {
      if (segment.x === this.game.food.x && segment.y === this.game.food.y) {
        this.generateFood();
        return;
      }
    }
  }

  private drawGame() {
    if (!this.canvasRef?.nativeElement || !this.ctx) return;

    const canvas = this.canvasRef.nativeElement;
    
    // Clear canvas
    this.ctx.fillStyle = '#0d47a1';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    this.ctx.fillStyle = '#4caf50';
    for (let segment of this.game.snake) {
      this.ctx.fillRect(segment.x, segment.y, this.gridSize - 2, this.gridSize - 2);
    }
    
    // Draw food
    this.ctx.fillStyle = '#ff5722';
    this.ctx.fillRect(this.game.food.x, this.game.food.y, this.gridSize - 2, this.gridSize - 2);
    
    // Update food counter
    this.foodLeft = Math.max(0, 5 - this.game.score);
  }

  private gameLoop = () => {
    if (!this.game.gameRunning || !this.canvasRef?.nativeElement) return;
    
    // Move snake
    const head = {
      x: this.game.snake[0].x + this.game.direction.x,
      y: this.game.snake[0].y + this.game.direction.y
    };
    
    // Check wall collision
    const canvas = this.canvasRef.nativeElement;
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
      this.gameOver();
      return;
    }
    
    // Check self collision
    for (let segment of this.game.snake) {
      if (head.x === segment.x && head.y === segment.y) {
        this.gameOver();
        return;
      }
    }
    
    this.game.snake.unshift(head);
    
    // Check food collision
    if (head.x === this.game.food.x && head.y === this.game.food.y) {
      this.game.score++;
      this.generateFood();
      
      // Check win condition
      if (this.game.score >= 5) {
        this.gameWin();
        return;
      }
    } else {
      this.game.snake.pop();
    }
    
    this.drawGame();
    this.game.gameLoop = setTimeout(this.gameLoop, 150);
  }

  private gameOver() {
    if (!this.canvasRef?.nativeElement || !this.ctx) return;

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
  }

  private gameWin() {
    if (!this.canvasRef?.nativeElement || !this.ctx) return;

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
  }

  private setupKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
      if (!this.game.gameRunning) return;
      
      const key = e.key;
      
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
    });
  }

  startGame() {
    if (this.game.gameRunning) return;
    
    this.resetGame();
    this.generateFood();
    this.game.gameRunning = true;
    this.game.direction = { x: this.gridSize, y: 0 }; // Start moving right
    this.gameStarted = true;
    this.drawGame();
    this.gameLoop();
  }

  skipGame() {
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
  }

  openGithub() {
    if (this.gameCompleted) {
      window.open('https://github.com/your-username', '_blank');
    }
  }

  getFoodDots(): number[] {
    return Array(5).fill(0).map((_, i) => i);
  }
}
