document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splashScreen');
    const container = document.querySelector('.container');
    
    // Create Confetti Container
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);

    // Falling Flowers Effect
    const fireConfetti = () => {
        const colors = ['#d4af37', '#f4c2c2', '#ffb6c1', '#ffc0cb', '#ffffff']; // Added pink/flower colors
        const particleCount = 60;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            
            // Randomize shape (circle or petal-like)
            particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '50% 0 50% 50%'; // petal shape
            
            const size = Math.random() * 8 + 6; // 6-14px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.position = 'absolute';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Initial position (random across top of screen)
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `-20px`; // start above screen
            particle.style.opacity = (Math.random() * 0.5 + 0.5).toString();
            
            confettiContainer.appendChild(particle);
            
            // Physics for falling
            const tx = (Math.random() - 0.5) * 200; // random drift left/right
            const ty = window.innerHeight + 50; // fall to bottom
            const duration = 3000 + Math.random() * 4000; // fall slower
            
            particle.animate([
                { 
                    transform: `translate(0, 0) rotate(0deg)`,
                    opacity: 1
                },
                { 
                    transform: `translate(${tx}px, ${ty}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'linear',
                fill: 'forwards'
            });
            
            setTimeout(() => {
                if(particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, duration);
        }
    };

    // Show Card almost immediately
    setTimeout(() => {
        container.classList.add('show-card');
    }, 100);
    
    // Banner Video Logic & Ribbon
    const bannerVideo = document.getElementById('bannerVideo');
    const ribbonContainer = document.getElementById('ribbonContainer');

    if (bannerVideo) {
        // Ribbon Logic
        if (ribbonContainer) {
            const cutRibbon = () => {
                // Fire the flower/confetti effect
                fireConfetti();

                // Add the cut class to trigger CSS animations
                ribbonContainer.classList.add('cut');
                
                // After the ribbons slide away, fade out the container
                setTimeout(() => {
                    ribbonContainer.style.transition = "opacity 0.6s ease";
                    ribbonContainer.style.opacity = '0';
                    
                    setTimeout(() => {
                        ribbonContainer.style.display = 'none';
                        // Unblur and play video
                        bannerVideo.style.filter = 'blur(0px)';
                        bannerVideo.muted = false;
                        bannerVideo.play().catch(e => {
                            bannerVideo.muted = true;
                            bannerVideo.play();
                        });
                        
                        // Show couple photos after video ends
                        bannerVideo.addEventListener('ended', () => {
                            const couplePhotos = document.getElementById('couplePhotos');
                            const coupleImgs = document.querySelectorAll('.couple-img');
                            
                            if (couplePhotos && coupleImgs.length > 0) {
                                // Hide video
                                bannerVideo.style.display = 'none';
                                // Show photos container
                                couplePhotos.style.display = 'block';
                                
                                // Play background music for photos
                                const photoMusic = new Audio('bengali_wedding_music.mp3');
                                photoMusic.loop = true;
                                photoMusic.play().catch(e => console.log("Audio play failed:", e));
                                
                                // Cycle through images with crossfade
                                let currentImgIndex = 0;
                                setInterval(() => {
                                    coupleImgs[currentImgIndex].classList.remove('active');
                                    currentImgIndex = (currentImgIndex + 1) % coupleImgs.length;
                                    coupleImgs[currentImgIndex].classList.add('active');
                                }, 3000); // Change image every 3 seconds
                            }
                        });
                    }, 600);
                }, 800);
            };

            ribbonContainer.addEventListener('click', cutRibbon);
        }

        // Expand Video Logic
        const expandBtn = document.getElementById('expandVideoBtn');
        const unluckyContainer = document.getElementById('unluckyContainer');
        
        if (expandBtn && unluckyContainer) {
            unluckyVideo.addEventListener('ended', () => {
                unluckyContainer.classList.remove('expanded');
                expandBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>';
            });

            expandBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                unluckyContainer.classList.toggle('expanded');
                
                if (unluckyContainer.classList.contains('expanded')) {
                    expandBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>';
                } else {
                    expandBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>';
                }
            });
        }
    }
});
