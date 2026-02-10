// p5.js sketch in instance mode
// Minimal generative header - subtle particle system with flowing movement

const sketch = (p) => {
    let particles = [];
    const particleCount = 100;
    let noiseScale = 0.01;
    
    p.setup = () => {
        // Create canvas that fills the container
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight * 0.6);
        canvas.parent('p5-container');
        
        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: p.random(p.width),
                y: p.random(p.height),
                size: p.random(1, 3),
                speedX: p.random(-0.5, 0.5),
                speedY: p.random(-0.5, 0.5),
                alpha: p.random(50, 150)
            });
        }
    };
    
    p.draw = () => {
        // Subtle background with low opacity for trail effect
        p.background(255, 255, 255, 25);
        
        // Update and draw particles
        particles.forEach(particle => {
            // Use Perlin noise to influence movement
            let noiseVal = p.noise(
                particle.x * noiseScale, 
                particle.y * noiseScale, 
                p.frameCount * 0.001
            );
            
            // Apply noise-based force
            particle.speedX += p.map(noiseVal, 0, 1, -0.1, 0.1);
            particle.speedY += p.map(noiseVal, 0, 1, -0.1, 0.1);
            
            // Damping to prevent particles from getting too fast
            particle.speedX *= 0.98;
            particle.speedY *= 0.98;
            
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = p.width;
            if (particle.x > p.width) particle.x = 0;
            if (particle.y < 0) particle.y = p.height;
            if (particle.y > p.height) particle.y = 0;
            
            // Draw particle
            p.noStroke();
            p.fill(26, 26, 26, particle.alpha);
            p.circle(particle.x, particle.y, particle.size);
        });
        
        // Draw subtle connections between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let d = p.dist(
                    particles[i].x, particles[i].y,
                    particles[j].x, particles[j].y
                );
                
                // If particles are close enough, draw a line
                if (d < 100) {
                    let alpha = p.map(d, 0, 100, 40, 0);
                    p.stroke(26, 26, 26, alpha);
                    p.strokeWeight(0.5);
                    p.line(
                        particles[i].x, particles[i].y,
                        particles[j].x, particles[j].y
                    );
                }
            }
        }
    };
    
    // Responsive canvas resize
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight * 0.6);
    };
};

// Create p5 instance
new p5(sketch);
